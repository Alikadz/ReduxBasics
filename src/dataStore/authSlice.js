import { createSlice } from "@reduxjs/toolkit";

const initialIsAuth = ({
    isAuthed: false
});

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialIsAuth,
    reducers: {
        login(state) {
            state.isAuthed = true;
        },
        logout(state) {
            state.isAuthed = false;
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;