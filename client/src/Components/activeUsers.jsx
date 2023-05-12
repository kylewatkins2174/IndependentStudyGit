import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useContext, useEffect } from 'react';
import { AuthContext } from "../Contexts/authContext";
import requestServer from "../axios";
import './map.scss'
import CloseIcon from '@mui/icons-material/Close';
import FeedIcon from '@mui/icons-material/Feed';

export const ActiveUsers = (props) => {   
    const {userValues} = useContext(AuthContext)
    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.invalidateQueries("users")
    }, [props.departmentId])

    const moreInfoClick = (e) => {
        console.log("more info");
    }
 
    const userQuery = useQuery({ 
    queryKey: ["users", props.departmentId],
    retry: false,
    queryFn: () => {return requestServer.post("/admin/activeUsers", {"departmentId" : props.departmentId}).then(res => res.data)},
    })

    const revokeUser = useMutation({
        mutationFn: (userId) => {return requestServer.post('/admin/revoke', {"userId": userId})},
        onSuccess: () => {
            queryClient.invalidateQueries(["requests"]);
            queryClient.invalidateQueries(["users"]);
        }
    })

    if(userQuery.isError) return <h1>an error occurred, please contact your system admin</h1>
    if(userQuery.isLoading) return <h1>Loading...</h1>
    if(userQuery.data === null)
    {
        return (
            <div>
                <p className='message'>No Active Users</p>
                <hr className='row-break'/>
            </div>
        );

    }
    else{
        return(
            <div>
                <hr className='row-break'/>
    
                {userQuery.data.map(user => (
                    <div>
    
                        <div key={user.userId} className='row-container'>
                            <div className='left-row'>
                                <span>{user.lastname}</span>, <span>{user.firstname}</span>|<span>{user.username}</span> : <span>{user.departmentName}</span>
                            </div>
    
                            <div className='right-row'>
                                <button title="More Information" className="row-button" key="moreinfobutton" onClick={moreInfoClick}><FeedIcon className='icon'/></button>
                                {userValues.userId === user.verifierId ? (
                                    <button title="Revoke User Access" className="row-button" key="giveaccessbutton" index={user.userId} onClick={() => revokeUser.mutate(user.userId)}><CloseIcon className="icon"/></button>
                                ) : (
                                    null
                                )}
                            </div>
                        </div>
                        <hr className='row-break'/>
                    </div>
                ))}
            </div>
        )
    }

}