import { useContext } from 'react';
import { UserInfo } from '../userInfo';
import { ActiveRequests } from "./activeRequests.jsx";
import { ActiveUsers } from "./activeUsers.jsx"
import "./adminPage.scss"
import { AuthContext } from '../../Contexts/authContext';


const AdminPage = () => {
    const {userValues} = useContext(AuthContext)

    return(
        <div>
            <div className="infobar">
                <span>{userValues.userName}</span>|
                <span>{`Department Admin page`}</span>
            </div>

            <h1>admin page</h1>

            <div className="row-container">
                <div className="requests">
                    <h1>Access Requests</h1>
                    <ActiveRequests/>
                </div>

                <div className="users">
                    <h1>Active Users</h1>
                    <ActiveUsers/>
                </div>
            </div>

        </div>
    )
}

export default AdminPage;

