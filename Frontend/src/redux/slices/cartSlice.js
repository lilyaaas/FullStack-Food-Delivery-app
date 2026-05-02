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
    // 1. Add item to cart (or increase quantity if identical customization exists)
    addToCart: (state, action) => {
      const newItem = action.payload;

      if (state.cartItems.length > 0) {
        const currentRestaurantId = state.cartItems[0].restaurant_id;
        if (currentRestaurantId !== newItem.restaurant_id) {
          state.cartItems = [];
          state.totalAmount = 0;
          state.totalQuantity = 0;
        }
      }

      // Generate a unique ID based on the exact customizations
      const uniqueString = `${newItem.id}-${newItem.selectedSide}-${JSON.stringify(newItem.addons || {})}-${newItem.specialInstructions || ""}`;
      const cartItemId = btoa(uniqueString);

      const existingItem = state.cartItems.find(
        (item) => item.cartItemId === cartItemId,
      );

      state.totalAmount += newItem.finalPrice * newItem.quantity;
      state.totalQuantity += newItem.quantity;

      if (!existingItem) {
        state.cartItems.push({
          cartItemId: cartItemId,
          id: newItem.id,
          restaurant_id: newItem.restaurant_id,
          name: newItem.name,
          image: newItem.image,
          price: newItem.finalPrice,
          basePrice: newItem.price,
          quantity: newItem.quantity,
          description: newItem.description,
          selectedSide: newItem.selectedSide,
          selectedSideName: newItem.selectedSideName,
          addons: newItem.addons,
          selectedAddonNames: newItem.selectedAddonNames,
          specialInstructions: newItem.specialInstructions,
        });
      } else {
        existingItem.quantity += newItem.quantity;
      }
    },

    // 2. Remove entire item completely (Trash button)
    removeItem: (state, action) => {
      const cartItemId = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.cartItemId === cartItemId,
      );

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;

        state.cartItems = state.cartItems.filter(
          (item) => item.cartItemId !== cartItemId,
        );
        if (state.cartItems.length === 0) state.totalAmount = 0;
      }
    },

    // 3. Increment a single item's quantity (+ button)
    incrementQuantity: (state, action) => {
      const cartItemId = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.cartItemId === cartItemId,
      );

      if (existingItem) {
        existingItem.quantity++;
        state.totalQuantity++;
        state.totalAmount += existingItem.price;
      }
    },

    // 4. Decrement a single item's quantity (- button)
    decrementQuantity: (state, action) => {
      const cartItemId = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.cartItemId === cartItemId,
      );

      if (existingItem) {
        state.totalQuantity--;
        state.totalAmount -= existingItem.price;
        if (existingItem.quantity === 1) {
          state.cartItems = state.cartItems.filter(
            (item) => item.cartItemId !== cartItemId,
          );
          if (state.cartItems.length === 0) state.totalAmount = 0;
        } else {
          existingItem.quantity--;
        }
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
