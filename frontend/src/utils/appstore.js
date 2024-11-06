import {  configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice"
import chatReducer from "./chatSlice"
import notificationReducer from "./notificationSlice"


const appStore=configureStore({
    reducer:{
user:userReducer,
chat:chatReducer,
notification:notificationReducer
    }
})


export default appStore