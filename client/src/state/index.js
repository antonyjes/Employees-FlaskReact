import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    companies: [],
    employees: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setCompanies: (state, action) => {
            state.companies = action.payload.companies;
        },
        setEmployees: (state, action) => {
            state.employees = action.payload.employees;
        }
    }
});

export const {setLogin, setLogout, setCompanies, setEmployees} = authSlice.actions;
export default authSlice.reducer;