import { useQuery, useQueryClient } from 'react-query';
import requestServer from '../axios';
import { useRef } from 'react';


const DepartmentDropdown = (props) => {

    const queryClient = useQueryClient();

    const handleOptionChange = (e) => {
        props.onChange(e)
    }
    
    const departmentQuery = useQuery({
        queryKey : ["department"],
        retry: false,
        queryFn: () => {return requestServer.post("/auth/departments").then(res => res.data)}
    })

    if(departmentQuery.isError){
        return("error")
    }

    if(departmentQuery.isLoading){
        return ("loading")
    }
    
    console.log(departmentQuery.data);

    return(
        <div>
            <select name="departmentId" onChange={handleOptionChange}>
                {departmentQuery.data.map(data => (
                        <option key={data.departmentId} value={data.departmentId}>{data.departmentName}</option>
                    ))}
            </select>
        </div>
    )
}


export default DepartmentDropdown;