import "./mainPage.scss";
import {Link} from "react-router-dom";

const MainPage = () => {

    return(
        <div className="main">
            <img src="https://ihsonline.org/portals/0/Images/HTML%20Images/IHS_transparent.png" alt="Institute for Homeland Security"/>
            <span>Welcome to the IHS Tier II App</span>
            <Link to="/search">
            <button>Lets begin!</button>
            </Link>
        </div>
    )
}

export default MainPage
