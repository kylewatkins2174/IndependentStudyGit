import { useContext, useEffect, useState } from 'react';
import { UserBar } from '../Components/userBar.jsx'
import "./userPage.scss"
import { AuthContext } from '../Contexts/authContext';
import DepartmentDropDown from "../Components/departmentDropDown";
import AdminDropdown from '../Components/adminDropdown.jsx'
import axios from "axios";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MemberDepartments from '../Components/memberDepartments.jsx';


const UserPage = () => {
    const {userValues} = useContext(AuthContext)
    const [departmentId, setDepartmentId] = useState(0)

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

        setDepartmentId(e.target.value)
    }

    return(
        <div className="user-page">
            <UserBar/>

            <div className="profile">
                <h1><AccountCircleIcon fontSize="22px"/> {userValues.firstName} {userValues.lastName}</h1>
            </div>

            <h1>Request Access to Another Department</h1>

            <div className='request-form'>
                <div className='form-container'>
                    <form>
                        <DepartmentDropDown onChange={handleChange}/>
                        <br/>
                        <label>Approver from Department:</label>
                        <AdminDropdown departmentId={departmentId}/>
                        <br/>
                        <button disabled={false}>Submit Request</button>
                    </form>
                </div>
            </div>
        <MemberDepartments/>

        </div>
    )
}

export default UserPage;