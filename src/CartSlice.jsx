import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Add a new item to the cart
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.name === newItem.name,
      );

      if (existingItem) {
        // If the item already exists in the cart, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If the item does not exist, add it to the cart with a quantity of 1
        state.items.push({ ...newItem, quantity: 1 });
      }
    },

    // Remove an item from the cart
    removeItem: (state, action) => {
      const itemName = action.payload;
      state.items = state.items.filter((item) => item.name !== itemName);
    },

    // Update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);

      if (itemToUpdate) {
        // Update the item's quantity
        itemToUpdate.quantity = quantity;

        // If the quantity is 0 or less, remove the item from the cart
        if (itemToUpdate.quantity <= 0) {
          state.items = state.items.filter((item) => item.name !== name);
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
