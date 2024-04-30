import { BaseService } from "./base.service";
import { ResponseInterface } from "../interfaces/response.interface";
import { CreateProductListInterface, GetProductListInterface } from "../interfaces/ProductList/productList.interface";

class ProductListService extends BaseService {

    async listAll(): Promise<GetProductListInterface[]> {
        const response = await this.api.get<ResponseInterface>(
            `/productList/listAllListByCustomer`
        );
        return this.extractData<GetProductListInterface[]>(response);
    }
}

const productListService = new ProductListService();
export default productListService;