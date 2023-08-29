import { createSlice } from "@reduxjs/toolkit";

const themeSlice=createSlice({
    name:'theme',
    initialState:{
        isActivate:false,
        isDarkTheme:JSON.parse(localStorage.getItem("darkMode:"))||false,
    },
    reducers:{
        darkTheme(state){
            state.isActivate=true;
        },
        lightTheme(state){
            state.isActivate=false;
        },
        toggleDarkTheme(state){
            state.isDarkTheme=!state.isDarkTheme;
            localStorage.setItem("darkMode",JSON.stringify(state.isDarkTheme));
        }
    }
})
export const themeActions=themeSlice.actions;
export default themeSlice.reducer;