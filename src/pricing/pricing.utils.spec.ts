import { getPricingRules, applyPricingRules } from './pricing.utils';
import axil from '../pricing/pricing-rules/axil-coffee-roasters.json';
import myer from '../pricing/pricing-rules/myer.json';
import secondBite from '../pricing/pricing-rules/second-bite.json';
import { IPricingRule, IProduct } from '../app.types';
import { getProduct } from '../checkout/checkout.utils';

describe('Pricing utils', () => {
  const classicProduct = getProduct('classic')!;
  const standoutProduct = getProduct('standout')!;
  const premiumProduct = getProduct('premium')!;

  it('should get pricing rules', () => {
    expect(getPricingRules('myer')).toEqual(myer);
    expect(getPricingRules('axilCoffeeRoasters')).toEqual(axil);
    expect(getPricingRules('secondBite')).toEqual(secondBite);
  });

  it('Default customer: should not apply pricing rule when none exist', () => {
    const pricingRules: IPricingRule[] = [] as IPricingRule[];

    const items: IProduct[] = [classicProduct, standoutProduct, premiumProduct];
    const discount = applyPricingRules(pricingRules, items);

    expect(discount).toEqual(0.0);
  });

  it('should apply pricing rule, fixed price and return discount', () => {
    const pricingRules: IPricingRule[] = axil as IPricingRule[];

    const items: IProduct[] = [standoutProduct, standoutProduct, standoutProduct, premiumProduct];
    const discount = applyPricingRules(pricingRules, items);

    expect(discount).toEqual(69);
  });

  it('should apply pricing rule, quantity discount and return discount', () => {
    const pricingRules: IPricingRule[] = secondBite as IPricingRule[];

    // 7 classic product added, expecting to have 3 for 2 discount applied two times as there are totally 7 products of Classic type added. (2*269 = 539.98)

    const items: IProduct[] = [
      classicProduct,
      classicProduct,
      classicProduct,
      classicProduct,
      classicProduct,
      classicProduct,
      classicProduct,
      premiumProduct
    ];
    const discount = applyPricingRules(pricingRules, items);

    expect(discount).toEqual(539.98);
  });
});
