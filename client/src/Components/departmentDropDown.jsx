import { useQuery, useQueryClient } from 'react-query';
import requestServer from '../axios';


const DepartmentDropdown = () => {

    const queryClient = useQueryClient();
    
    const departmentQuery = useQuery({
        queryKey : ["departments"],
        retry: false,
        queryFn: () => {return requestServer.get("/auth/departments")}
    })
    
    return(
        <div>
            <select>
                {useQuery.data.map(department => (
                    <option>department</option>


                ))}
            </select>
        </div>
    )
}


export default DepartmentDropdown;