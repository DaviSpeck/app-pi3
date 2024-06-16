export interface CreateProductListInterface {
    productListPurchaseDate: string,
    productListTitle: string,
    customerID: number
}

export interface GetProductListInterface {
    productListID: number,
    productListPurchaseDate: Date,
    productListTitle: string,
    customerID: number,
    products: ProductListArr[]
}