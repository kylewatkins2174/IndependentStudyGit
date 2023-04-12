import "./register.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import queryServer from "../axios.js";

const Register = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        "email" : "",
        "firstname" : "",
        "lastname" : "",
        "department" : "",
        "username" : "",
        "password" : ""
    });

    const [err, setErr] = useState(null)

    const handleChange = (e) => {
        setInputs((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        queryServer.post("/auth/register", inputs).then(response => {
            console.log(response);
            navigate("/login");
        }).catch(err => {
            setErr(err);
        })
    }

    return(
        <div className="RegisterContainer">
            <div className="RegisterBottom">
                <div className="RegisterForm">
                <h1 className="RegisterTitleHeading">Register</h1>
                    <hr className="RegisterTitleHr"/>
                    <form onSubmit={handleSubmit}>

                        <span>Enter email:</span><br/>
                        <input onChange={handleChange} type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" placeholder="(Ex. example@gmail.com)" className="RegisterFormInput" autoComplete="true" name="email"></input>
                        <hr className="RegisterHr"/>

                        <span>Enter your first name:</span><br/>
                        <input onChange={handleChange} type="text" placeholder="(Ex. John)" className="RegisterFormInput" autoComplete="true" name="firstname"></input>
                        <hr className="RegisterHr"/>
                        
                        <span>Enter your last name:</span><br/>
                        <input onChange={handleChange} type="text" placeholder="(Ex. Smith)" className="RegisterFormInput" autoComplete="true" name="lastname"></input>
                        <hr className="RegisterHr"/>
                        
                        <span>Enter your department:</span><br/>
                        <input onChange={handleChange} type="text" placeholder="Enter department..." className="RegisterFormInput" autoComplete="true" name="department"/>
                        <hr className="RegisterHr"/>

                        <span>Enter your username:</span><br/>
                        <input onChange={handleChange} type="text" placeholder="Enter username..." className="RegisterFormInput" autoComplete="true" name="username"/>
                        <hr className="RegisterHr"/>

                        <span>Enter your password:</span><br/>
                        <input onChange={handleChange} type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*?[!@#$%&]).{8,}" placeholder="Enter password..." className="RegisterFormInput" autoComplete="true" name="password"></input>
                        <br/><span className="tip">Must be 8 characters in length, and include one capital letter,<br/> one number, and one special character (!@#$%&)</span>
                        <hr className="RegisterHr"/>

                    <button className="SubmitButton">Submit</button>
                    {err && err.response} 

                    </form>
                    <hr className="RegisterHr"/>
                    <hr className="RegisterHr"/>
                    <hr className="RegisterHr"/>
                    <hr className="RegisterHr"/>
                </div>
            </div>
        </div>
    );
}

export default Register;