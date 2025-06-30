import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name: "cart",
 initialState:{
    cartItems:[],
    totalQuantity:0,
    totalPrice:0,
},
reducers:{
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
    removeFromCart:(state,action)=>{
        const existingItem=state.cartItems.find(item => item._id === action.payload);
        if(existingItem){
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
            state.totalQuantity -= existingItem.quantity;
            state.totalPrice -= existingItem.price * existingItem.quantity;
        }
    },
    clearCart:(state)=>{
        state.cartItems = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
    },
    incrementQuantity:(state,action)=>{
        const existingItem = state.cartItems.find(item => item._id === action.payload);
        if (existingItem) {
            existingItem.quantity += 1;
            state.totalQuantity += 1;
            state.totalPrice += existingItem.price;
        }
    },
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
    setCartItems:(state,action)=>{
        state.cartItems = action.payload;
        state.totalQuantity = action.payload.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = action.payload.reduce((total, item) => total + item.price * item.quantity, 0);
    },





}




})
export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
