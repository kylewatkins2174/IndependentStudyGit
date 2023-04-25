//my imports
import Register from "./Pages/register.jsx";
import Login from "./Pages/login.jsx";
import LogoBar from "./Components/logoBar";
import MainPage from './Pages/mainPage.jsx';
import SearchFacility from './Pages/searchFacility.jsx';
import AdminPage from './Pages/AdminPage/adminPage.jsx';

//via react
import {
  createBrowserRouter,
  RouterProvider,
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
    },
    {
      path: "/home",
      element: (
        <MainPage/>
      )
    },
    {
      path: "/search",
      element: (
        <SearchFacility/>
      )
    },
    {
      path: "/adminPage",
      element: (
        <AdminPage/>
      )
    },
  ])
  
  return (
    <div>
      <LogoBar/>
      <RouterProvider router = {router}/>
    </div>
  )
}


export default App;
