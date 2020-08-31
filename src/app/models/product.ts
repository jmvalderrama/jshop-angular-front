export interface IProduct {
  _id: string;
  title: string;
  description?: string;
  price: number;
  available: number;
  file: string;
  quantity?: number;
}
