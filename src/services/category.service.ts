import { CategoryInterface } from "../interfaces/Category/category.interface";
import { ResponseInterface } from "../interfaces/response.interface";
import { BaseService } from "./base.service";

class CategoryService extends BaseService {

    async listAll(): Promise<CategoryInterface[]> {
        const response = await this.api.get<ResponseInterface>(
            `/category/listAllCategories`
        );
        return this.extractData<CategoryInterface[]>(response);
    }

    async findById(categoryID: number): Promise<CategoryInterface> {
        const response = await this.api.get<ResponseInterface>(
            `/category/findById/?categoryID=${categoryID}`
        );
        return this.extractData<CategoryInterface>(response);
    }
}

const categoryService = new CategoryService();
export default categoryService;