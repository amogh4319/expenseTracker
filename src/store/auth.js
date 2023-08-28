import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'auth',
    initialState:{
        token:'',
        isAuthenticated:false,
        isEmailVerified:false,
    },
    reducers:{
        logIn(state,action){
            state.token=action.payload
            state.isAuthenticated=true;
           

        },
        logOut(state){
            state.token='';
            state.isAuthenticated=false;
        },
        setEmailVerified(state){
            state.isEmailVerified=false
        }
    }
})
export const authActions=authSlice.actions;
export default authSlice.reducer;