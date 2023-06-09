import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import {AuthContext} from "../Contexts/authContext"; 


const Login = () => {

    const {login} = useContext(AuthContext);

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        "username" : "",
        "password" : ""
    })

    const [err, setErr] = useState(null);

    const handleChange = (e) => {
        setInputs((prev) => {
            return{...prev, [e.target.name] : e.target.value}
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await login(inputs).then(
                navigate("/home")
            );
        }catch(err){
            setErr(err.response.data);
        }

    }

    return(
        <div className="LoginContainer">

            <div className="LoginBottom">
                <div className="LoginForm">
                <h1 className="LoginTitleHeading">Login</h1>
                    <hr className="LoginTitleHr"/>
                    <form onSubmit={handleSubmit}>

                        <span>Username:</span><br/>
                        <input type="text" placeholder="Enter username..." className="LoginFormInput" onChange={handleChange} name="username"></input>
                        <hr className="LoginHr"/>

                        <span>Password:</span><br/>
                        <input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*?[!@#$%&]).{8,}" placeholder="Enter password..." className="LoginFormInput" onChange={handleChange} name="password"></input>
                        <hr className="LoginHr"/>

                    <button className="SubmitButton">Submit</button>
                    
                    </form>
                    <p className="ErrorMessage">{err && err}</p>

                    <hr className="LoginHr"/>

                    <p>Not a user yet? Register <span><a href="/register" className="register-link">here</a></span>!</p>

                    <hr className="LoginHr"/>
                    <hr className="LoginHr"/>
                    <hr className="LoginHr"/>
                    <hr className="LoginHr"/>
                    <br/>
                </div>
            </div>
        </div>
    );
}

export default Login;
