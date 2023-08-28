import { createSlice } from "@reduxjs/toolkit";

const expenseSlice=createSlice({
    name:'expense',
    initialState:[],
    reducers:{
        addItem(state,action){
            const item=action.payload;
            const existingItem = state.find((existingItem) => existingItem.id === item.id);

            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                state.push(item);
            }


        },
        removeItem(state,action){
            const id=action.payload;
            const existingItemIndex = state.findIndex((existingItem) => existingItem.id === id);

            if (existingItemIndex !== -1) {
                const existingItem = state[existingItemIndex];
                if (existingItem.quantity === 1) {
                    state.splice(existingItemIndex, 1);
                } else {
                    existingItem.quantity -= 1;
                }
            }


        }
    }
})
export const expenseActions=expenseSlice.actions; 
export default expenseSlice.reducer;