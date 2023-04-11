//my imports
import Register from "./Pages/register.jsx";
import Login from "./Pages/login.jsx";
import Home from "./Pages/home.jsx";
import LogoBar from "./Components/logoBar";
import MainPage from './Pages/mainPage.jsx';
import SearchFacility from './Pages/searchFacility.jsx';
import FacilityPage from "./Pages/facilityPage.jsx";

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
      path: "/facility",
      element: (
        <FacilityPage />
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
