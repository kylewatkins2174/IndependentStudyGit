import "./register.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import queryServer from "../axios.js";
import DepartmentDropdown from "../Components/departmentDropDown";

const Register = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        "email" : "",
        "firstname" : "",
        "lastname" : "",
        "departmentid" : "1",
        "username" : "",
        "password" : ""
    });

    const [err, setErr] = useState(null)

    const handleChange = (e) => {
        setInputs((prev) => {
            console.log(JSON.stringify(prev))

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

                        <span>Enter email <span style={{color:"red"}}>*</span>:</span><br/>
                        <input onChange={handleChange} type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" placeholder="(Ex. example@gmail.com)" className="RegisterFormInput" autoComplete="true" name="email" required></input>
                        <hr className="RegisterHr"/>

                        <span>Enter your first name <span style={{color:"red"}}>*</span>:</span><br/>
                        <input onChange={handleChange} type="text" placeholder="(Ex. John)" className="RegisterFormInput" autoComplete="true" name="firstname" required />
                        <hr className="RegisterHr"/>
                        
                        <span>Enter your last name <span style={{color:"red"}}>*</span>:</span><br/>
                        <input onChange={handleChange} type="text" placeholder="(Ex. Smith)" className="RegisterFormInput" autoComplete="true" name="lastname" required />
                        <hr className="RegisterHr"/>

                        <select>
                            <option name="Department1">Department 1</option>
                        </select>
                        <hr className="RegisterHr"/>

                        <span>Enter your username <span style={{color:"red"}}>*</span>:</span><br/>
                        <input onChange={handleChange} type="text" placeholder="Enter username..." className="RegisterFormInput" autoComplete="true" name="username" required />
                        <hr className="RegisterHr"/>

                        <span>Enter your password <span style={{color:"red"}}>*</span>:</span><br/>
                        <input onChange={handleChange} type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*?[!@#$%&]).{8,}" placeholder="Enter password..." className="RegisterFormInput" autoComplete="true" name="password" required />
                        <br/><br/><span className="tip">Must be 8 characters in length, and include one capital letter,<br/> one number, and one special character (!@#$%&).<br/>Fields with a <span style={{color:"red"}}>*</span> are required.</span>
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
