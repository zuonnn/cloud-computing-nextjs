import { IBrand } from "./brand";
import { ICategory } from "./category";

export interface IProduct {
    _id?: string;
    name: string;
    type: string;
    price: number;
    category: ICategory;
    brand: IBrand;
}