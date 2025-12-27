
import { createSlice } from "@reduxjs/toolkit";

const searchSlice=createSlice({
    name:"search",
    initialState:{
    result:[],
},
reducers:{
    SetSearchResults:(state,action)=>{
        state.result=action.payload;
    },
     ClearSearchResults:(state,action)=>{
        state.result=[];
    }, 
},
});
export const {SetSearchResults,ClearSearchResults}=searchSlice.actions
export default searchSlice.reducer