import { useState } from 'react';
import { UserBar } from '../Components/userBar.jsx'
import { ActiveRequests } from "../Components/activeRequests.jsx";
import { ActiveUsers } from "../Components/activeUsers.jsx"
import "./adminPage.scss"
import AdminDepartmentDropdown from '../Components/adminDepartmentDropdown.jsx';


const AdminPage = () => {
    const [departmentId, setDepartmentId] = useState()

    const handleChange = (e) => {
        if(e.target.name === "departmentId"){
            setDepartmentId(e.target.value)
            console.log(departmentId)
        }
    }

    return(
        <div className='admin-container'>
            <UserBar/>
            <h1 className="main-title">Department Page</h1>

            <AdminDepartmentDropdown onChange={handleChange}/>

            <div className="container">
                <h1 className='title'>Access Requests</h1>
                <div className="map-container">
                    <ActiveRequests departmentId={departmentId}/>
                </div>

                <h1 className='title'>Active Users</h1>
                <div className="map-container">
                <ActiveUsers departmentId={departmentId}/>
                </div>
            </div>
        </div>
    )
}

export default AdminPage;