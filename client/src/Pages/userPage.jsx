import { useContext, useEffect, useState } from 'react';
import { UserInfo } from '../Components/userInfo';
import { UserBar } from '../Components/userBar.jsx'
import { ActiveRequests } from "../Components/activeRequests.jsx";
import { ActiveUsers } from "../Components/activeUsers.jsx"
import "./userPage.scss"
import { AuthContext } from '../Contexts/authContext';
import DepartmentDropDown from "../Components/departmentDropDown";
import axios from "axios";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const UserPage = () => {
    const {userValues} = useContext(AuthContext)

    const [departments, setDepartments] = useState([])

    useEffect(()=>{

        const userId = userValues.userId;
        const jsonLoad = {userId};

        axios.post('http://localhost:8800/api/auth/get-departments', jsonLoad)
        .then(function (response) {
            setDepartments(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [userValues])

    return(
        <div className="user-page">
            <UserBar/>

            <div className="profile">
                <h1><AccountCircleIcon fontSize="22px"/> {userValues.firstName} {userValues.lastName}</h1>
                <hr/>
                <h1>Current Departments:</h1>
                <ul>
                    {departments.map((dep) => {
                        return(
                            <li key={dep.departmentId}>{dep.departmentName}</li>
                        )
                    })}
                </ul>
            </div>

            <h1>Request Access to Another Department</h1>

            <div className='request-form'>
                <div className='form-container'>
                    <form>
                        <label>Current department:</label>
                        <input type="text" placeholder="Current department..."></input>
                        <br/>
                        <label>Department requested:</label>
                        <input type="text" placeholder="Department..."></input>
                        <br/>
                        <label>Approver from Department:</label>
                        <input type="text" placeholder="John Smith..."></input>
                        <br/>
                        <button>Submit Request</button>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default UserPage;


