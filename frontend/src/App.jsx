import React from 'react'
import { RouterProvider } from "react-router-dom"
import { Provider } from 'react-redux'
import { Provider as ChakraProvider } from "./Components/ui/provider"
import { router } from './Routes/Route'
import appStore from './utils/appStore'
function App() {
  return (
    <div>
      <ChakraProvider>
      <Provider store={appStore}><RouterProvider router={router}></RouterProvider></Provider> 
      </ChakraProvider>
  
    </div>
  )
}

export default App