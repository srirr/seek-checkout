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

export type ProductId = 'classic' | 'standout' | 'premium';
