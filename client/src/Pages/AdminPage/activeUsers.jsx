import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useContext } from 'react';
import { AuthContext } from "../../Contexts/authContext";
import requestServer from "../../axios";


export const ActiveUsers = (error) => {   
    const { userValues } = useContext(AuthContext);

    const queryClient = useQueryClient();

    const moreInfoClick = (e) => {
        console.log("more info");
    }
 
    const userQuery = useQuery({ 
    queryKey: ["users"],
    retry: false,
    queryFn: () => {return requestServer.post("/admin/activeUsers", {"depId" : userValues.depId}).then(res => res.data)},
    })

    const revokeUser = useMutation({
        mutationFn: (userId) => {return requestServer.post('/admin/revoke', {"userId": userId})},
        onSuccess: () => {
            queryClient.invalidateQueries(["requests"]);
            queryClient.invalidateQueries(["users"]);
        }
    })

    if(userQuery.isLoading) return <h1>Loading...</h1>

    if(userQuery.isError) {
        if (error.status === 404){
            return <p>{JSON.stringify("No active requests found")}</p>
        }
        else{
            return <p>No active requests found</p>
        }
    }

    return(
        <div>
            {userQuery.data.map(user => (
                <div key={user.userId}>
                    <span>{user.userId}</span>|<span>{user.lastName}</span>|<span>{user.firstName}</span>
                    <button key="moreinfobutton" className="more-info-button" onClick={moreInfoClick}>more information</button>
                    <button key="giveaccessbutton" index={user.userId} onClick={() => revokeUser.mutate(user.userId)}>Revoke Access</button>
                </div>
            ))}
        </div>
    )
}