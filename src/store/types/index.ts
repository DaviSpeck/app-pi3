import { IAppInitialState } from "./app";
import { ICustomerInitialState } from "./customer";

export interface IStore {
    app: IAppInitialState,
    customer: ICustomerInitialState
}