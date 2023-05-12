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
import { createBrowserRouter, RouterProvider } from "react-router-dom"
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
    console.log(JSON.stringify(userValues))
    return children;
  }

  const ForwardRoute = ({children}) => {
    console.log("user values: " + JSON.stringify(userValues))
    if(userValues !== undefined){ //user is logged in
      return(<Navigate to="/home"/>)
    }
    if(refresh){ //if user is logged in but needs information loaded
      getUser() 
    }
    return children //if user is completely logged out
  }
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ForwardRoute>
          <Login/>
        </ForwardRoute>
      ),
    },
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
      <RouterProvider router = {router}/>
    </div>
  )
}

export default App;