import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../Contexts/authContext"
import './userBar.scss'

export const UserBar = () => {
    const navigate = useNavigate();

    const {userValues} = useContext(AuthContext)

    return(
        <div className="infobar">
            <span><a href="/userpage">{userValues.userName}</a></span>
            <span><a href="/search">View Map</a></span>
            {userValues.isAdmin && <span><a href="/adminpage">AdminPage</a></span>}
        </div>
    )
}