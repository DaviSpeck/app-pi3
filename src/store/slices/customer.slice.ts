import { createSlice } from "@reduxjs/toolkit";
import { clearRedux } from "../actions";
import { customerInitialState } from "../initialState/customer";

const customerSlice = createSlice({
    name: 'customer',
    initialState: customerInitialState,
    reducers: {
        changeCustomerID(state, action) {
            state.customerID = action.payload;
        },
        changeCustomerEmail(state, action) {
            state.customerEmail = action.payload;
        },
        changeCustomerName(state, action) {
            state.customerName = action.payload;
        },
        changeRoleID(state, action) {
            state.role.roleID = action.payload;
        },
        changeRoleName(state, action) {
            state.role.roleName = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(clearRedux, (state) => {
            state.customerID = customerInitialState.customerID
            state.customerEmail = customerInitialState.customerEmail
            state.customerName = customerInitialState.customerName
            state.role.roleID = customerInitialState.role.roleID
            state.role.roleName = customerInitialState.role.roleName
        })
    },
});

export const { changeCustomerID, changeCustomerEmail, changeCustomerName, changeRoleID, changeRoleName } = customerSlice.actions;
export const customerReducer = customerSlice.reducer;