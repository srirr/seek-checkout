import { ProductId, IPricingRule, IProduct } from '../app.types';
import axil from './pricing-rules/axil-coffee-roasters.json';
import myer from './pricing-rules/myer.json';
import secondBite from './pricing-rules/second-bite.json';
import { getProduct } from '../checkout/checkout.utils';

export const getPricingRules = (value: string): IPricingRule[] => {
  switch (value) {
    case 'axilCoffeeRoasters':
      return axil as IPricingRule[];
    case 'secondBite':
      return secondBite as IPricingRule[];
    case 'myer':
      return myer as IPricingRule[];
    default:
      return [];
  }
};

/**
 * Returns the discount amount running through the pricing rule
 * Fixed price discount, (eg. 3 for 2) on a given product item array.
 *
 * @param rules - The pricing rules.
 * @param items - The product items.
 */
export const applyPricingRules = (rules: IPricingRule[], items: IProduct[]) => {
  let discount = 0;
  rules.map(rule => {
    const itemQuantity = items.filter(item => item.id === rule.productId).length;
    const product = getProduct(rule.productId);
    if (product) {
      // Eg: 3 for 2 discount
      if (rule.qtyRequired && rule.qtyPaid && itemQuantity >= rule.qtyRequired) {
        const numberOfDiscount = Math.floor(itemQuantity / rule.qtyRequired);

        const discountQuantity = numberOfDiscount * (rule.qtyRequired - rule.qtyPaid);
        discount += discountQuantity * product.price;
      } else if (rule.price) {
        // fixed price discount
        discount += itemQuantity * (product.price - rule.price);
      }
    }
  });
  return discount;
};
