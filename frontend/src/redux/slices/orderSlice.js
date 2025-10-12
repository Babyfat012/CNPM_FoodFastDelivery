import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    orders: [],
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        
    }
});
export const { addOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;