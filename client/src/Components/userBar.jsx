import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../Contexts/authContext"
import './userBar.scss'
import {Link} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import MapIcon from '@mui/icons-material/Map';

export const UserBar = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext)

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

    const handleLogout = async () => {
        logout().then(navigate("/login"))
    }

    return(
        <div className="infobar">
            <span><a href="/userpage">{userValues.username}</a></span>
            <span><a href="/home">View Map</a></span>
            <span><button onClick={handleLogout}>Logout</button></span>
            <AdminLink/>
        </div>
    )
}