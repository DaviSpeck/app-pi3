import { ICustomerInitialState } from "../types/customer";

export const customerInitialState: ICustomerInitialState = {
    customerID: 0,
    customerName: '',
    customerEmail: '',
    role: {
        roleID: 0,
        roleName: ''
    }
}