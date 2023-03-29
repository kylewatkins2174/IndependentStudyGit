import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import LogoBar from "./Components/LogoBar";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom"

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <Login/>
      ),
    },
    {
      path: "/register",
      element: (
        <Register/>
      )
    }
  ])
  
  return (
    <div>
      <LogoBar/>
      <RouterProvider router = {router}/>
    </div>
  )
}


export default App;
