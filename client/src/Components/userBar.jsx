import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../Contexts/authContext"
import './userBar.scss'

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
            <span><a href="/userpage">{userValues.username}</a></span>
            <span><a href="/search">View Map</a></span>
            <AdminLink/>
        </div>
    )
}