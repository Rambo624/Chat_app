import { createBrowserRouter,RouterProvider,} from "react-router-dom";
import Login from "../Pages/Login";
import Chatpage from "../Pages/Chatpage";
import RootLayout from "../Layouts/RootLayout";





export const router=createBrowserRouter([
    {
        path:"/",
        element:<RootLayout/>,
        children:[
            {
                path:"/",
                element:<Login/>
            },
            {
                path:"/home",
                element:<Chatpage/>
            }
        ]
    },
   
])