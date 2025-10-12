import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    activeRestaurant: null
    };

const activeRestaurantSlice = createSlice({ 
    name: 'activeRestaurant',
    initialState,
    reducers: {
        setActiveRestaurant: (state, action) => {
            state.activeRestaurant = action.payload;
        },
        clearActiveRestaurant: (state) => {
            state.activeRestaurant = null;
        }
    }
});
export const { setActiveRestaurant, clearActiveRestaurant } = activeRestaurantSlice.actions;
export default activeRestaurantSlice.reducer;