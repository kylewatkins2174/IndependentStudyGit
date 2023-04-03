import requestServer from "../axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';


const Home = () => {
    const navigate = useNavigate();
    const [err,setErr] = useState(null);

    useEffect(() => {
        requestServer.get('/home')
        .then(function (response) {
            
        })
        .catch(function (error) {
            console.log(error);
            navigate('../login');
        })
    })



    const handleLogout = (e) => {
        requestServer.get("/auth/logout").then((response) => {
            //success
            navigate("../login");
        })
        .catch(error => {
            setErr(error);
        });
    }

    return(
        <div>
            <h1>You're at /Home!!!</h1>
            <button onClick={handleLogout}>Logout</button>

            {err && err.response.data}
        </div>
    )
}

export default Home