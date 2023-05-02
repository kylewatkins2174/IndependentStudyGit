import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useContext } from 'react';
import { AuthContext } from "../Contexts/authContext";
import requestServer from "../axios";
import './map.scss';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FeedIcon from '@mui/icons-material/Feed';
import CloseIcon from '@mui/icons-material/Close';

export const ActiveRequests = (error) => {   
    const { userValues } = useContext(AuthContext);


    const queryClient = useQueryClient();

    const moreInfoClick = (e) => {
        console.log("more info");
    }
 
    const userQuery = useQuery({
    queryKey: ["requests"],
    retry: false,
    queryFn: () => {return requestServer.post("/admin/requests", {"depId" : userValues.depId}).then(res => res.data)},
    })

    const denyUser = useMutation({
        mutationFn: (userId) => {return requestServer.post('/admin/deny', {"userId": userId})},
        onSuccess: () => queryClient.invalidateQueries(["requests"])
    })

    const acceptUser = useMutation({
        mutationFn: (userId) => {return requestServer.post('/admin/accept', {"userId": userId})},
        onSuccess: () => {
            queryClient.invalidateQueries(["requests"])
            queryClient.invalidateQueries(["users"])
        }
    })

    if(userQuery.isLoading) return <h1>Loading...</h1>
    if(userQuery.data.length === 0)
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
                            <span>{user.lastName}</span>, <span>{user.firstName}</span>
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