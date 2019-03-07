import { IPricingRule, IProduct, ProductId } from '../app.types';
import products from '../products.json';
import { applyPricingRules } from '../pricing/pricing.utils';

/**
 * Calculates the gross total.
 *
 * @param items - The product items.
 */
export const calculateGrossTotal = (items: IProduct[]): number => {
  const initialValue = 0;
  const reducer = (accumulator: number, product: IProduct) => accumulator + product.price;
  const total = items.reduce(reducer, initialValue);
  return total;
};

/**
 * Calculates net total after applying discount
 *
 * @param items - The product items.
 * @param pricingRules - The pricing rules.
 */
export const calculateTotal = (items: IProduct[], pricingRules: IPricingRule[]) => {
  const grossTotal = calculateGrossTotal(items);
  const discount = applyPricingRules(pricingRules, items);
  const netTotal = (grossTotal - discount).toFixed(2);
  return netTotal;
};

/**
 * Returns the product for a given product id
 *
 * @param productId - Product id.
 */
export const getProduct = (productId: ProductId): IProduct | undefined => {
  return products.find(product => product.id === productId);
};
