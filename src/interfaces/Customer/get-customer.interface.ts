export interface GetCustomerInterface {
    customerID: number;
    customerName: string;
    customerEmail: string;
    role: RoleCustomerInterface;
}

export interface RoleCustomerInterface {
    roleID: number;
    roleName: string;
}
