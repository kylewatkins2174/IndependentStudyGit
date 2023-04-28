import { useContext } from 'react';
import { UserInfo } from '../Components/userInfo';
import { UserBar } from '../Components/userBar.jsx'
import { ActiveRequests } from "../Components/activeRequests.jsx";
import { ActiveUsers } from "../Components/activeUsers.jsx"
import "./adminPage.scss"
import { AuthContext } from '../Contexts/authContext';


const UserPage = () => {
    const {userValues} = useContext(AuthContext)

    return(
        <div className='admin-container'>

            <UserBar/>

            <h1 className="main-title">User Page</h1>

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

export default UserPage;


