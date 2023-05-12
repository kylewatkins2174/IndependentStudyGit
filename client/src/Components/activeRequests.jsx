import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useContext, useEffect } from 'react';
import { AuthContext } from "../Contexts/authContext";
import requestServer from "../axios";
import './map.scss';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FeedIcon from '@mui/icons-material/Feed';
import CloseIcon from '@mui/icons-material/Close';

export const ActiveRequests = (props) => {   
    const { userValues } = useContext(AuthContext);

    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.invalidateQueries("requests")
    }, [props.departmentId])

    const moreInfoClick = (e) => {
        console.log("more info");
    }
 
    const userQuery = useQuery({
    queryKey: ["requests", props.departmentId],
    retry: false,
    queryFn: () => {return requestServer.post("/admin/requests", {"departmentId" : props.departmentId, "userId" : userValues.userId}).then(res => res.data)},
    })

    const denyUser = useMutation({
        mutationFn: (userId) => {return requestServer.post('/admin/deny', {"userId": userId})},
        onSuccess: () => queryClient.invalidateQueries(["requests"])
    })

    const acceptUser = useMutation({
        mutationFn: (userId) => {return requestServer.post('/admin/accept', {"userId": userId, "departmentId": props.departmentId, "verifierId" : userValues.userId})},
        onSuccess: () => {
            queryClient.invalidateQueries(["requests"])
            queryClient.invalidateQueries(["users"])
        }
    })

    if(userQuery.isLoading) return <h1>Loading...</h1>
    if(userQuery.data === null)
    {
        return <p className='message'>No Active Requests</p>
    }

    if(userQuery.isError) {
        return <p>No active requests found</p>
    }

    return(
        <div>
            <hr className='row-break'/>
            {userQuery.data.map(user => (
                <div>
                    <div key={user.userId} className='row-container'>
                        <div className='left-row'>
                            <span>{user.lastname}</span>, <span>{user.firstname}</span>: <span>{user.departmentName}</span>
                        </div>
                        

                        <div className='right-row'>
                            <button className='row-button' title="User Information" onClick={moreInfoClick}><FeedIcon className="icon"/></button>
                            <button className='row-button' title="Accept User" onClick={() => acceptUser.mutate(user.userId)}><CheckBoxIcon className="icon"/></button>
                            <button className='row-button' title="Remove User" onClick={() => denyUser.mutate(user.userId)}><CloseIcon className="icon"/></button>
                        </div>
                    </div>
                    <hr className='row-break'/>
                </div>
            ))}
        </div>
    )
}