//react imports
import { Navigate } from "react-router-dom";
//my imports
import Register from "./Pages/register.jsx";
import Login from "./Pages/login.jsx";
import SearchFacility from './Pages/searchFacility.jsx';
import AdminPage from './Pages/adminPage.jsx';
import UserPage from './Pages/userPage.jsx'
import { AuthContext } from "./Contexts/authContext.js";

//via react
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { useContext, useState } from "react";

function App() {
  const {userValues, getUser} = useContext(AuthContext)
  const [refresh, setRefresh] = useState(true)

  const ProtectedRoute = ({children}) => {
    if(userValues === undefined){ //if app has no user records
      if(refresh){ //if app has attempted info retrieval
        getUser()
        setRefresh(false)
      }
      return(<Navigate to="/login"/>)//if user is not logged in
    }

    return children;
  }

  const ForwardRoute = ({children}) => {
    if(userValues !== undefined){ //user is logged in
      return(<Navigate to="/home"/>)
    }

    if(refresh){ //if user is logged in but needs information loaded
      getUser() 
    }

    return children //if user is completely logged out
  }

  const VerifiedRoute = ({children}) => {
    if(userValues === undefined){ //if app has not loaded user information
      return <Navigate to="/home"/>
    }

    if(userValues.verified === 0){ //if user is not verified
      return <Navigate to="/home"/>
    }

    return children;
  }
  
  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <ForwardRoute>
          <Login/>
        </ForwardRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <ForwardRoute>
          <Register/>
        </ForwardRoute>
      )
    },
    {
      path: "/home",
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
