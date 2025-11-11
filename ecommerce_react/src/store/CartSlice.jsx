import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  try {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error parsing cart from localStorage:", error);
    return [];
  }
};

const initialState = {
  cart: getInitialCart()
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    decreaseQty: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload);
      if (item) {
        if (item.qty > 1) {
          item.qty -= 1;
        } else {
          state.cart = state.cart.filter((i) => i.id !== action.payload);
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.cart.find(item => item.id === product.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.cart.push({ ...product, qty: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }
  }
});

export const { addToCart, removeFromCart, clearCart, decreaseQty} = cartSlice.actions;
export default cartSlice.reducer;

