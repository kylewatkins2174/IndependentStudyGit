import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../Contexts/authContext";
import requestServer from "../../axios";
import "./memberDepartments.scss"

const MemberDepartments = () => {
    const { userValues } = useContext(AuthContext)

    const departmentQuery = useQuery({
        queryKey: ["verifiedDepartments"],
        retry: false,
        queryFn: () => {return requestServer.post("/user/departments", {"userId" : userValues.userId}).then(res => res.data)}
    })

    if(departmentQuery.isError){
        return <p>error</p>
    }
    if(departmentQuery.isLoading){
        return <p>loading</p>
    }
    if(departmentQuery.data === undefined){
        return <p>is empty</p>
    }
    
    
    return(
        <div className="member-department-container">
            <div className="department-list">
            <h1>Your member departments</h1>
                {departmentQuery.data.map(data => (
                    <div key={data.departmentName}>
                        <p className="department-entry" key={data.departmentName}>{data.departmentName}</p>                    
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MemberDepartments;