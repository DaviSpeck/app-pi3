import { CategoryInterface } from "../Category/category.interface";

export interface GetProductInterface {
    productID: number;
    productName: string;
    category: CategoryInterface;
    productPrice: number;
    productQuantity: number;
    productImage: any;
}
