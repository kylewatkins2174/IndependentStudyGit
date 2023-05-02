import { useContext } from 'react';
import { UserInfo } from '../Components/userInfo';
import { UserBar } from '../Components/userBar.jsx'
import { ActiveRequests } from "../Components/activeRequests.jsx";
import { ActiveUsers } from "../Components/activeUsers.jsx"
import "./userPage.scss"
import { AuthContext } from '../Contexts/authContext';


const UserPage = () => {
    const {userValues} = useContext(AuthContext)

    return(
        <div>

            <UserBar/>
            <h1>Create a request</h1>

            <div className='request-form'>
                <div className='form-container'>
                    <form>
                        <label>enter something</label>
                        <input></input>
                        <br/>
                        <label>enter something</label>
                        <input></input>
                        <br/>
                        <label>enter something</label>
                        <input></input>
                        <br/>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default UserPage;


