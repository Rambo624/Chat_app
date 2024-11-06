import { createSlice } from "@reduxjs/toolkit";


const notificationSlice=createSlice({
name:"notification",
initialState:[],
reducers:{
    addMessage:(state,action)=>{
        return action.payload
    },
    removeMessage:(state,action)=>{
        return null
    }

},

})

export default notificationSlice.reducer

export const {addMessage,removeMessage}=notificationSlice.actions



