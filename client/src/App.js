//my imports
import Register from "./Pages/register.jsx";
import Login from "./Pages/login.jsx";
import Home from "./Pages/home.jsx";
import LogoBar from "./Components/logoBar.jsx";
import MainPage from './Pages/mainPage.jsx';
import SearchFacility from './Pages/searchFacility.jsx';

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
