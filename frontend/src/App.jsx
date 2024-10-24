import React from 'react'
import { RouterProvider } from "react-router-dom"
import { Provider } from 'react-redux'

import { router } from './Routes/Route'
import appStore from './utils/appStore'
function App() {
  return (
    <div>
   <Provider store={appStore}><RouterProvider router={router}></RouterProvider></Provider> 
    </div>
  )
}

export default App