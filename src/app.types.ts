export interface IPricingRule {
  price?: number;
  productId: ProductId;
  qtyRequired?: number;
  qtyPaid?: number;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
}

export type IAppState = {
  value: string;
  total: string;
};

export type ProductId = 'classic' | 'standout' | 'premium';
