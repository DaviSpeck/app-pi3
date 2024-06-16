import { RoleCustomerInterface } from "../../interfaces/Customer/get-customer.interface";

export interface ICustomerInitialState {
    customerID: number;
    customerName: string;
    customerEmail: string;
    role: RoleCustomerInterface;
}