import React from 'react';
import { IPricingRule, IProduct } from '../app.types';
import { calculateTotal } from './checkout.utils';
class Checkout {
  pricingRules: IPricingRule[];
  items: IProduct[] = [];

  constructor(pricingRules: IPricingRule[]) {
    this.pricingRules = pricingRules;
  }

  public add = (product: IProduct): void => {
    this.items.push(product);
  };

  public total = (): string => {
    return calculateTotal(this.items, this.pricingRules);
  };
}

export { Checkout };
