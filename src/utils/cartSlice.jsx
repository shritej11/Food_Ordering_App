import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    reducers: {  
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) => item.card.info.id === newItem.card.info.id
            );
        
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...newItem, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            const idToRemove = action.payload;
            const index = state.items.findIndex(
                (item) => item.card.info.id === idToRemove
            );
            if (index !== -1) {
                state.items.splice(index, 1);
            }
        },
        clearCart: (state, ) => {
            state.items.length = 0;
        },
        incrementQty: (state, action) => {
            const item = state.items.find(
                (item) => item.card.info.id === action.payload
            );
            if (item) item.quantity += 1;
        },
        decrementQty: (state, action) => {
            const item = state.items.find(
                (item) => item.card.info.id === action.payload
            );
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                // Optional: Remove item if quantity becomes 0
                state.items = state.items.filter(
                    (item) => item.card.info.id !== action.payload
                );
            }
        },
    },
});

export const {addItem, removeItem, clearCart, incrementQty, decrementQty} = cartSlice.actions;

export default cartSlice.reducer;