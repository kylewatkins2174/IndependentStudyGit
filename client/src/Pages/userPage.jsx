import { useContext, useEffect, useState } from 'react';
import { UserBar } from '../Components/userBar.jsx'
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

        axios.post('http://localhost:8800/api/auth/departments', jsonLoad)
        .then(function (response) {
            setDepartments(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [userValues])



    const handleChange = (e) => {
        e.preventDefault()
        console.log("department change")
    }

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
                        <DepartmentDropDown onChange={handleChange}/>
                        <br/>
                        <label>Approver from Department:</label>
                        <input disbled="true" type="text" placeholder="John Smith..."></input>
                        <br/>
                        <button disabled={false} onClick={console.log("click")}>Submit Request</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserPage;