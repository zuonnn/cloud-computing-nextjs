import { IProduct } from "./product";

export interface IOrderDetail {
  product: IProduct;
  quantity: number;
  totalPrice: number;
}

export interface IOrder {
  _id?: string;
  orderDetails: IOrderDetail[];
  orderTotalPrice: number;
  createdAt: string;
  updatedAt: string;
}
