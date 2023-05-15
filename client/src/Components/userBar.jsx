import { useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../Contexts/authContext"
import './userBar.scss';
import IHSLogo from "../Assets/IHS_transparent.png";
import LogoutIcon from '@mui/icons-material/Logout';
import MapIcon from '@mui/icons-material/Map';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';

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

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return(
        <div className="infobar">
        <img src={IHSLogo}/>
            <Link to="/userPage">
                <button><PersonIcon/> {userValues.username}</button>
            </Link>
            <Link to="/adminPage" alt="Institute for Homeland Security">
                <span><button><PersonAddIcon/> Manage Department</button></span>
            </Link>
            <Link to="/home">
                <span><button><MapIcon/> View Map</button></span>
            </Link>
            <span><button onClick={handleLogout}><LogoutIcon/> Logout</button></span>
            <AdminLink/>
        </div>
    )
}