import { useContext } from "react"
import { useQuery } from "react-query"
import requestServer from "../../axios"
import { AuthContext } from "../../Contexts/authContext"
import "./pendingRequests.scss"

const PendingRequests = () => {
    const { userValues } = useContext(AuthContext)

    const departmentQuery = useQuery({
        queryKey: ["pendingRequests"],
        retry: false,
        queryFn: () => {return requestServer.post("/user/pending", {"userId" : userValues.userId}).then(res => res.data)}
    })

    if(departmentQuery.isError){
        return <p>error</p>
    }

    if(departmentQuery.isLoading){
        return <p>loading</p>
    }

    if(departmentQuery.data === undefined){
        return <p>No currently pending requests</p>
    }


    return(
        <div className="pending-container">
            <div className="pending-list">
                <h1>Pending Requests</h1>
                {departmentQuery.data.map(data => (
                    <div ley={data.departmentId}>
                        <p className="pending-entry" key={data.departmentName}>{data.departmentName}</p>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default PendingRequests;