import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: []
};

// sample data 
// {
//     _id,
//     user id
//     title,
//      price,
// quantity
// }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find(item => item._id === action.payload._id && item.userId == action.payload.userId);
      if (!item) {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(item => item._id === action.payload._id && item.userId == action.payload.userId);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(item => item._id === action.payload._id && item.userId == action.payload.userId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id && item.userId == action.payload.userId);
      }
    },
    removeFromCart: (state,action) => {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id && item.userId == action.payload.userId);

    },
    clearCart: (state,action) => {
      state.cartItems = state.cartItems.filter(item => item.userId !== action.payload.userId);
    }

  }
});

export const { addToCart, incrementQuantity, decrementQuantity,removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
