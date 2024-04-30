import { GetCustomerInterface } from "../interfaces/Customer/get-customer.interface";
import { RequestCustomerInterface } from "../interfaces/Customer/request-customer.interface";
import { RequestUpdatePasswordCustomerInterface } from "../interfaces/Customer/request-update-password-customer.interface";
import { ResponseInterface } from "../interfaces/response.interface";
import { BaseService } from "./base.service";

class CustomerService extends BaseService {

    async listAll(): Promise<GetCustomerInterface[]> {
        const response = await this.api.get<ResponseInterface>(
            '/customer/listAllCustomers'
        );
        return this.extractData<GetCustomerInterface[]>(response);
    }

    async findByID(customerID: string): Promise<GetCustomerInterface> {
        const response = await this.api.get<ResponseInterface>(
            `/customer/findById/${customerID}`
        );
        return this.extractData<GetCustomerInterface>(response);
    }

    async findByEmail(customerEmail: string): Promise<GetCustomerInterface> {
        const response = await this.api.get<ResponseInterface>(
            `/customer/findByEmail/${customerEmail}`
        );
        return this.extractData<GetCustomerInterface>(response);
    }

    async login(customerEmail: string, customerPassword: string): Promise<GetCustomerInterface> {
        const response = await this.api.get<ResponseInterface>(
            `/customer/login?customerEmail=${customerEmail}&customerPassword=${customerPassword}`
        );
        return this.extractData<GetCustomerInterface>(response);
    }

    async create(req: RequestCustomerInterface): Promise<RequestCustomerInterface> {
        const response = await this.api.post<ResponseInterface>(
            '/customer/create',
            req
        );
        return this.extractData<RequestCustomerInterface>(response);
    }

    async update(customerID: string, req: RequestCustomerInterface): Promise<RequestCustomerInterface> {
        const response = await this.api.put<ResponseInterface>(
            `/customer/update/${customerID}`,
            req
        );
        return this.extractData<RequestCustomerInterface>(response);
    }

    async updatePassword(req: RequestUpdatePasswordCustomerInterface): Promise<RequestCustomerInterface> {
        const response = await this.api.put<ResponseInterface>(
            `/customer/updatePassword?customerID=${req.customerID}&customerPassword=${req.customerPassword}`,
            req
        );
        return this.extractData<RequestCustomerInterface>(response);
    }

    async delete(customerID: string): Promise<GetCustomerInterface> {
        const response = await this.api.delete<ResponseInterface>(
            `/customer/delete/${customerID}`
        );
        return this.extractData<GetCustomerInterface>(response);
    }

}

const customerService = new CustomerService();
export default customerService;