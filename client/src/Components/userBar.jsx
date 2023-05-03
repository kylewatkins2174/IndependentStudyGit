import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../Contexts/authContext"
import './userBar.scss'
import {Link} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import MapIcon from '@mui/icons-material/Map';

export const UserBar = () => {
    const navigate = useNavigate();

    const {userValues} = useContext(AuthContext)

    const AdminLink = () => {
        if(userValues.isAdmin)
        {
            return (
                <span><a href="/adminpage">AdminPage</a></span>
            )
        }
        else return null
    }

    return(
        <div className="infobar">
            <Link to="/userPage"><span><PersonIcon /> {userValues.username}</span></Link>
            <Link to="/search"><span><MapIcon /> View Map</span></Link>
            <AdminLink/>
        </div>
    )
}