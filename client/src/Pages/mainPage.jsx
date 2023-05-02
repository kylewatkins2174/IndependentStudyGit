import "./mainPage.scss";
import {Link} from "react-router-dom";
import {AuthContext} from "../Contexts/authContext";
import {useContext} from "react";

const MainPage = () => {

    const {userValues, authorized} = useContext(AuthContext);

    return(
        <div className="main">
            <span>Welcome, {userValues.userName}, to the IHS Tier II App!</span>
            <Link to="/search">
            <button>View Map</button>
            </Link>
            {authorized ? <button>Manage Accounts</button> : null}
        </div>
    )
}

export default MainPage
