//react imports
import { Navigate } from "react-router-dom";
//my imports
import Register from "./Pages/register.jsx";
import Login from "./Pages/login.jsx";
import MainPage from './Pages/mainPage.jsx';
import SearchFacility from './Pages/searchFacility.jsx';
import AdminPage from './Pages/adminPage.jsx';
import UserPage from './Pages/userPage.jsx'
import { AuthContext } from "./Contexts/authContext.js";

//via react
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { useContext } from "react";

function App() {

  const {userValues} = useContext(AuthContext)

  const ProtectedRoute = ({children}) => {
    if(userValues === null){
      return <Navigate to="/login"/>
    }

    return children;
  }
  
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
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <MainPage/>          
        </ProtectedRoute>

      )
    },
    {
      path: "/search",
      element: (
        <ProtectedRoute>
          <SearchFacility/>
        </ProtectedRoute>

      )
    },
    {
      path: "/adminPage",
      element: (
        <ProtectedRoute>
          <AdminPage/>
        </ProtectedRoute>

      )
    },
    {
      path: "/userpage",
      element: (
        <ProtectedRoute>
          <UserPage/>
        </ProtectedRoute>

      )
    },
  ])
  
  return (
    <div>
      {/* <LogoBar/> */}
      <RouterProvider router = {router}/>
    </div>
  )
}


export default App;
