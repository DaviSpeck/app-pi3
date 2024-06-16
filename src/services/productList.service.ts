import { BaseService } from "./base.service";
import { ResponseInterface } from "../interfaces/response.interface";
import { CreateProductListInterface, GetProductListInterface } from "../interfaces/ProductList/product-list.interface";
import { ResponseCreateProductList } from "../interfaces/ProductList/response-create-product-list.interface";

class ProductListService extends BaseService {

    async listAllByCustomerID(customerID: number): Promise<GetProductListInterface[]> {
        const response = await this.api.get<ResponseInterface>(
            `/productList/listAllListByCustomer?customerID=${customerID}`
        );
        return this.extractData<GetProductListInterface[]>(response);
    }

    async deleteListByProductListID(productListID: number): Promise<any> {
        const response = await this.api.delete<ResponseInterface>(
            `/productList/delete?productListID=${productListID}`
        );
        return this.extractData<any>(response);
    }

    async create(req: CreateProductListInterface): Promise<ResponseCreateProductList> {
        const response = await this.api.post<ResponseInterface>(
            '/productList/create',
            req
        );
        return this.extractData<ResponseCreateProductList>(response);
    }

    async addMultipleProducts(productListID: number, req: ProductListArr[]): Promise<any> {
        const response = await this.api.put<ResponseInterface>(
            `/productList/addMultipleProducts?productListID=${productListID}`,
            req
        );
        console.log(response)
        return this.extractData<any>(response);
    }
}

const productListService = new ProductListService();
export default productListService;