import { useContext } from "react"
import { AuthContext } from "../Contexts/authContext"
import './userBar.scss'

const UserBar = () => {
    const {userValues} = useContext(AuthContext)

    return(
        <div className="infobar">
            <span>{userValues.userName}</span>
        </div>
    )
}

export default UserBar;