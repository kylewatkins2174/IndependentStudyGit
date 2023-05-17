import { useContext, useEffect, useState } from 'react';
import { UserBar } from '../Components/userBar.jsx'
import "./userPage.scss"
import { AuthContext } from '../Contexts/authContext';
import DepartmentDropDown from "../Components/departmentDropDown";
import AdminDropdown from '../Components/adminDropdown.jsx'
import MemberDepartments from '../Components/UserPage/memberDepartments.jsx';
import PendingRequests from '../Components/UserPage/pendingRequests.jsx'
import requestServer from '../axios.js';
import { useQueryClient } from 'react-query';

const UserPage = () => {

    const client = useQueryClient();
    const {userValues} = useContext(AuthContext)
    const [departmentId, setDepartmentId] = useState(0)
    const [inputs, setInputs] = useState({
        "userId" : userValues.userId,
        "departmentId" : null,
        "adminId" : 1
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

    const setAdminId = (id) => {
        setInputs((prev) => {
            return {...prev, ["adminId"] : id}
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const request = {
            "userId" : userValues.userId,
            "departmentId" : inputs.departmentId,
            "adminId" : inputs.adminId
        };

        await requestServer.post("/user/createRequest", request)
        client.invalidateQueries("pendingRequests");
    }
    
    return(
        <div className='page-container'>
            <UserBar/>

            <div className="user-page">

                <div className='left-column'>
                    <div className='left-top'>
                        <MemberDepartments/>
                    </div>
                    <div className='left-bottom'>
                        <PendingRequests/>
                    </div>
                </div>

                <div className='right-column'>
                    <div className='request-form'>
                        <h1>Request Access to Another Department</h1>
                        <div className='form-container'>
                            <form>
                                <DepartmentDropDown name="departmentDropdown" onChange={handleChange}/>
                                <br/>
                                <label>Approver from Department:</label>
                                <AdminDropdown name="adminDropdown" setAdminId={setAdminId} departmentId={departmentId}/>
                                <br/>
                                <button onClick={handleSubmit}>Submit Request</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPage;