import { useQuery, useQueryClient } from 'react-query';
import requestServer from '../axios';


const DepartmentDropdown = () => {

    const queryClient = useQueryClient();
    
    const departmentQuery = useQuery({
        queryKey : ["departments"],
        retry: false,
        queryFn: () => {return requestServer.get("/auth/departments")}
    })
    
    console.log(departmentQuery.data);

    return(
        <div>
            <select>
                {departmentQuery.data.map(department => (
                    <option value={department.departmentId}>{department.departmentName}</option>
                ))}
            </select>
        </div>
    )
}


export default DepartmentDropdown;