import { BaseService } from "./base.service";
import { ResponseInterface } from "../interfaces/response.interface";
import { BestPath } from "../interfaces/ProductList/best-path.interface";

class SupermarketService extends BaseService {

    async getBestPathByProductListID(productListID: number): Promise<BestPath[]> {
        const response = await this.api.get<ResponseInterface>(
            `/supermarket/bestpath?productListID=${productListID}`
        );
        return this.extractData<BestPath[]>(response);
    }

}

const supermarketService = new SupermarketService();
export default supermarketService;