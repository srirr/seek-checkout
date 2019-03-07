import { Checkout } from './Checkout';
import { getPricingRules } from '../pricing/pricing.utils';
import { IProduct } from '../app.types';
import * as utils from './checkout.utils';

describe('Checkout', () => {
  it('should construct checkout object', () => {
    const checkout = new Checkout(getPricingRules('myer'));

    expect(checkout.pricingRules).toEqual(getPricingRules('myer'));
  });
  it('should add items to checkout object', () => {
    const checkout = new Checkout(getPricingRules('myer'));
    const product: IProduct = { id: 'classic', price: 299.99, name: 'classic', description: 'classic description' };
    checkout.add(product);

    expect(checkout.items.length).toEqual(1);
    expect(checkout.items[0]).toEqual(product);
  });

  it('should calculate total', () => {
    const checkout = new Checkout(getPricingRules('myer'));
    const product: IProduct = { id: 'classic', price: 299.99, name: 'classic', description: 'classic description' };
    checkout.add(product);

    const calculateTotalSpy = jest.spyOn(utils, 'calculateTotal');
    checkout.total();

    expect(calculateTotalSpy).toHaveBeenCalled();
  });
});
