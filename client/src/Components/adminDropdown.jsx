import { useQuery, useQueryClient } from "react-query";
import requestServer from "../axios";
import { useEffect } from "react";

const AdminDropdown = (props) => {
    const client = useQueryClient();

    useEffect(() => {
        client.invalidateQueries('admin')
    }, [props.departmentId])

    const handleChange = (e) => {
        props.onChange(e)
    }

    const adminQuery = useQuery({
        queryKey: ["admin", props.departmentId],
        retry: false,
        queryFn : () => {return requestServer.post("/user/departmentAdmin", {"departmentId" : props.departmentId}).then(res => res.data)}
    })

    if(adminQuery.isError){
        console.log(adminQuery.error)
        return(<p>error</p>)
    }

    if(adminQuery.isLoading){
        return(<p>loading</p>)
    }
    
    return(
        <div>
            <select name="adminId" onChange={handleChange}>
                {adminQuery.data.map(data => (
                    <option key={data.name} value={data.userId}>{data.name}</option>
                ))}
            </select>
        </div>
    )
}

export default AdminDropdown;