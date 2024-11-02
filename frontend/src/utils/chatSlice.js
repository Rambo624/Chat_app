import { createSlice } from "@reduxjs/toolkit";


const chatSlice=createSlice({
name:"chat",
initialState:null,
reducers:{
    addChat:(state,action)=>{
        return action.payload
    },
    removeChat:(state,action)=>{
        return null
    }

},

})

export default chatSlice.reducer

export const {addChat,removeChat}=chatSlice.actions



