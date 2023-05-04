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

  const VerifiedRoute = ({children}) => {

    console.log(userValues.verified)

    if(userValues.verified === 0){
      return <Navigate to="/home"/>
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
        <VerifiedRoute>
          <SearchFacility/>
        </VerifiedRoute>
        </ProtectedRoute>

      )
    },
    {
      path: "/adminPage",
      element: (
        <ProtectedRoute>
        <VerifiedRoute>
          <AdminPage/>
        </VerifiedRoute>
        </ProtectedRoute>
      )
    },
    {
      path: "/userpage",
      element: (
        <ProtectedRoute>
        <VerifiedRoute>
          <UserPage/>
        </VerifiedRoute>
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
