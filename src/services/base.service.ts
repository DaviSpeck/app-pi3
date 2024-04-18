import axios from "axios";

export abstract class BaseService {
    
    protected api = axios.create({
        baseURL: import.meta.env.VITE_API,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })

    protected extractData<T>(response: any): T {
        return response.data || {}
    }
}