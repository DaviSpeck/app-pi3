import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./slices/app.slice";
import { customerReducer } from "./slices/customer.slice";

export const store = configureStore({
    reducer: {
        app: appReducer,
        customer: customerReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
