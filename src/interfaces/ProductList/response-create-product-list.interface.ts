import { GetCustomerInterface } from "../Customer/get-customer.interface"

export interface ResponseCreateProductList {
    productListID: 6,
    productListPurchaseDate: "2024-06-15T00:00:00.000+00:00",
    productListTitle: "Teste",
    customer: GetCustomerInterface
    products: any
}