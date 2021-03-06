import { calculateGrossTotal, getProduct, calculateTotal } from './checkout.utils';
import { getPricingRules } from '../pricing/pricing.utils';

describe('Checkout utils', () => {
  const classicProduct = getProduct('classic')!;
  const standoutProduct = getProduct('standout')!;
  const premiumProduct = getProduct('premium')!;

  describe('Initial implementation', () => {
    it('calculateGrossTotal, should calculate the total amount without discount', () => {
      expect(calculateGrossTotal([])).toEqual(0.0);
      expect(calculateGrossTotal([classicProduct, standoutProduct, premiumProduct])).toEqual(987.97);
    });

    //Scenario:1 No discounts for default customer

    it('calculateTotal, should calculate net total after applying discount', () => {
      expect(calculateTotal([classicProduct, standoutProduct, premiumProduct], getPricingRules('default'))).toEqual(
        '987.97'
      );
    });

    //Scenario:2 SecondBite: 3 for 2 discount

    it('calculateTotal, should calculate net total after applying discount', () => {
      expect(
        calculateTotal([classicProduct, classicProduct, classicProduct, premiumProduct], getPricingRules('secondBite'))
      ).toEqual('934.97');
    });

    //Scenario:3 Axil Coffee Roasters fixed price discount
    it('calculateTotal, should calculate net total after applying discount', () => {
      expect(
        calculateTotal(
          [standoutProduct, standoutProduct, standoutProduct, premiumProduct],
          getPricingRules('axilCoffeeRoasters')
        )
      ).toEqual('1294.96');
    });
  });

  describe('Jora: Pricing rules', () => {
    //Scenario:4 Jora Price discount when quantity condition met.
    it('calculateTotal, should calculate net total after applying discount', () => {
      expect(
        calculateTotal([premiumProduct, premiumProduct, premiumProduct, premiumProduct], getPricingRules('jora'))
      ).toEqual('1519.96');
    });
  });

  describe('Myer: Pricing rules', () => {
    //Scenario:4 Myer Price discount when quantity condition met.
    it('calculateTotal, should calculate net total after applying discount', () => {
      expect(
        calculateTotal(
          [standoutProduct, standoutProduct, standoutProduct, standoutProduct, standoutProduct],
          getPricingRules('myer')
        )
      ).toEqual('1291.96');
    });

    it('calculateTotal, should calculate net total after applying discount', () => {
      expect(calculateTotal([premiumProduct], getPricingRules('myer'))).toEqual('389.99');
    });

    it('calculateTotal, should calculate net total after applying discount', () => {
      expect(calculateTotal([classicProduct, classicProduct, classicProduct], getPricingRules('myer'))).toEqual(
        '749.97'
      );
    });
  });
});
