import { useQuery } from 'react-query';
import { useContext } from 'react';
import requestServer from '../axios';
import { AuthContext } from '../Contexts/authContext';

const AdminDepartmentDropdown = (props) => {
    const { userValues } = useContext(AuthContext)

    const handleOptionChange = (e) => {
        props.onChange(e)
    }

    const departmentQuery = useQuery({
        queryKey : ["adminDepartment"],
        retry: false,
        queryFn: () => {return requestServer.post("/admin/departments", {"userId" : userValues.userId}).then(res => res.data)}
    })

    if(departmentQuery.isError){
        console.log(departmentQuery.error)
        return("error")
    }

    if(departmentQuery.isLoading){
        return ("loading")
    }

    if(!departmentQuery.isLoading){
        return(
            <div>
                <select name="departmentId" onChange={handleOptionChange}>
                    <option>select a department</option>
                {departmentQuery.data.map(data => (
                        <option key={data.departmentId} value={data.departmentId}>{data.departmentName}</option>
                    ))}
                </select>
            </div>
        )
    }
}

export default AdminDepartmentDropdown