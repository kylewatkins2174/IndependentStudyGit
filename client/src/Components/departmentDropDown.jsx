import { useQuery } from 'react-query';
import requestServer from '../axios';

const DepartmentDropdown = (props) => {

    const handleOptionChange = (e) => {
        props.onChange(e)
    }
    
    const departmentQuery = useQuery({
        queryKey : ["department"],
        retry: false,
        queryFn: () => {return requestServer.post("/auth/departments").then(res => res.data)}
    })

    if(departmentQuery.isError){
        return(departmentQuery.error)
    }


    if(departmentQuery.isLoading){
        return ("loading")
    }
    
    if(!departmentQuery.isLoading)
    {
        return(
            <div>
                <select name="departmentId" onChange={handleOptionChange}>
                    <option value='0'>Select a department</option>
                    {departmentQuery.data.map(data => (
                            <option key={data.departmentId} value={data.departmentId}>{data.departmentName}</option>
                        ))}
                </select>
            </div>
        )
    }
}


export default DepartmentDropdown;