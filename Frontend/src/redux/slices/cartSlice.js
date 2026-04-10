import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 1. Add item to cart (or increase quantity if it already exists)
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);

      state.totalAmount += newItem.price;

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          name: newItem.name,
          image: newItem.image,
          price: newItem.price,
          description: newItem.description,
          quantity: 1,
        });
        state.totalQuantity++;
      } else {
        existingItem.quantity++;
      }
    },

    // 2. Remove entire item completely (Trash button)
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity--;
        state.totalAmount -= existingItem.price * existingItem.quantity;

        // Filter it out of the array
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      }
    },

    // 3. Increment a single item's quantity (+ button)
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
        state.totalAmount += existingItem.price;
      }
    },

    // 4. Decrement a single item's quantity (- button)
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          // If quantity is 1, decrementing should remove the item entirely
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
          state.totalQuantity--;
        } else {
          existingItem.quantity--;
        }
        state.totalAmount -= existingItem.price;
      }
    },

    // 5. Clear the entire cart (Used after a successful checkout)
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addToCart,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
