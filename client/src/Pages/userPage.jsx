import { useContext, useEffect, useState } from 'react';
import { UserBar } from '../Components/userBar.jsx'
import "./userPage.scss"
import { AuthContext } from '../Contexts/authContext';
import DepartmentDropDown from "../Components/departmentDropDown";
import AdminDropdown from '../Components/adminDropdown.jsx'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MemberDepartments from '../Components/memberDepartments.jsx';
import requestServer from '../axios.js';


const UserPage = () => {
    const {userValues} = useContext(AuthContext)
    const [departmentId, setDepartmentId] = useState(0)
    const [inputs, setInputs] = useState({
        "departmentId" : null,
        "adminId" : null
    })

    useEffect(()=>{
    }, [userValues])

    const handleChange = (e) => {
        e.preventDefault()

        if(e.target.name === "departmentId"){
            setDepartmentId(e.target.value)
        }

        setInputs((prev) => {
            return {...prev, [e.target.name] : e.target.value}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(JSON.stringify(inputs))

        const request = {
            "userId" : userValues.userId,
            "departmentId" : inputs.departmentId,
            "verifierId" : inputs.adminId
        };

        requestServer.post("/user/createRequest", request)
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
                        <DepartmentDropDown name="departmentDropdown" onChange={handleChange}/>
                        <br/>
                        <label>Approver from Department:</label>
                        <AdminDropdown name="adminDropdown" onChange={handleChange} departmentId={departmentId}/>
                        <br/>
                        <button onClick={handleSubmit}>Submit Request</button>
                    </form>
                </div>
            </div>
            <MemberDepartments/>
        </div>
    )
}

export default UserPage;