import { useContext } from 'react';
import { UserInfo } from '../userInfo';
import { ActiveRequests } from "./activeRequests.jsx";
import { ActiveUsers } from "./activeUsers.jsx"
import "./adminPage.scss"
import { AuthContext } from '../../Contexts/authContext';


const AdminPage = () => {
    const {userValues} = useContext(AuthContext)

    return(

        <div className='admin-container'>

            <div className="infobar">
                <span>{userValues.userName}</span>
                <span>{`Department Admin Page`}</span>
            </div>

            <h1 className="main-title">Admin Page</h1>

            <div className="container">
                <h1 className='title'>Access Requests</h1>
                <div className="map-container">
                    <ActiveRequests/>
                </div>

                <h1 className='title'>Active Users</h1>
                <div className="map-container">
                    <ActiveUsers/>
                </div>
            </div>

        </div>
    )
}

export default AdminPage;


