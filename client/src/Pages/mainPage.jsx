import "./mainPage.scss";
import {Link} from "react-router-dom";
import {AuthContext} from "../Contexts/authContext";
import {useContext} from "react";

const MainPage = () => {

    const {userValues, authorized} = useContext(AuthContext);

    const ViewMapButton = () =>{
        if(userValues.verified){
            return(
                <Link to="/search">
                <button>View Map</button>
                </Link>
            )
        }
        else{
            return(<h1>Your Account has not yet been verified, please contact your district admin to view department facilities</h1>)
        }
    }

    return(
        <div className="main">
            <span>Welcome, {userValues.username}, to the IHS Tier II App!</span>
            <ViewMapButton/>
        </div>
    )
}

export default MainPage
