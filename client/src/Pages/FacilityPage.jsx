import "./FacilityPage.scss";
import {Link} from "react-router-dom";
import MoreInfoFacility from "../components/MoreInfoFacility";

const FacilityPage = () => {

    return (
        <div>Hello!
        <Link to="/search"><button>Return to previous page</button></Link>
        <div>
            <MoreInfoFacility />
        </div>
        </div>
    )
}

export default FacilityPage