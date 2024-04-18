import { GetProductInterface } from "../interfaces/Product/get-product.interface";
import { ResponseInterface } from "../interfaces/response.interface";
import { BaseService } from "./base.service";

class ProductService extends BaseService {

    async listAll(): Promise<GetProductInterface[]> {
        const response = await this.api.get<ResponseInterface>(
            `/product/listAllProducts`
        );
        return this.extractData<GetProductInterface[]>(response);
    }

    async findByID(productID: string): Promise<GetProductInterface> {
        const response = await this.api.get<ResponseInterface>(
            `/product/findById/${productID}`
        );
        return this.extractData<GetProductInterface>(response);
    }

    async listAllByCategory(categoryID: string): Promise<GetProductInterface[]> {
        const response = await this.api.get<ResponseInterface>(
            `/product/listAllByCategory${categoryID}`
        );
        return this.extractData<GetProductInterface[]>(response);
    }

}

const productService = new ProductService();
export default productService;