import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    cartItems:[],
    totalQuantity:0,
    totalPrice:0,
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    // we define reducers here 
reducers:{
    // add to cart
    addToCart:(state,action)=>{
        const existingItem = state.cartItems.find(item => item._id === action.payload._id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            state.cartItems.push({ ...action.payload, quantity: 1 });
        }
        state.totalQuantity += 1;
        state.totalPrice += action.payload.price;
    },

    // remove from the cart
    removeFromCart:(state,action)=>{
        const existingItem=state.cartItems.find(item => item._id === action.payload);
        if(existingItem){
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
            state.totalQuantity -= existingItem.quantity;
            state.totalPrice -= existingItem.price * existingItem.quantity;
        }
    },

    // clear the cart
    clearCart:(state)=>{
        state.cartItems = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
    },

    // increment quantity
    incrementQuantity:(state,action)=>{
        const existingItem = state.cartItems.find(item => item._id === action.payload);
        if (existingItem) {
            existingItem.quantity += 1;
            state.totalQuantity += 1;
            state.totalPrice += existingItem.price;
        }
    },

    // DECREMENT QUANTITY

    decrementQuantity:(state,action)=>{
        const existingItem = state.cartItems.find(item => item._id === action.payload);
        if (existingItem && existingItem.quantity > 1) {
            existingItem.quantity -= 1;
            state.totalQuantity -= 1;
            state.totalPrice -= existingItem.price;
        } else if (existingItem && existingItem.quantity === 1) {
            cartSlice.caseReducers.removeFromCart(state,action);
        }
    },

    //set cart items (for example, when loading from persistent storage)
    setCartItems:(state,action)=>{
        state.cartItems = action.payload;
        state.totalQuantity = action.payload.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = action.payload.reduce((total, item) => total + item.price * item.quantity, 0);
    },

}


})
export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
