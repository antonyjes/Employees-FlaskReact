import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    users: [],
    teams: [],
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
        setUsers: (state, action) => {
            state.users = action.payload.users;
        },
        setTeams: (state, action) => {
            state.teams = action.payload.teams;
        }
    }
});

export const {setLogin, setLogout, setUsers, setTeams} = authSlice.actions;
export default authSlice.reducer;