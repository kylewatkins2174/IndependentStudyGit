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
                    <form>

                        <input onChange={handleChange} type="text" placeholder="email" className="RegisterFormInput" autoComplete="true" name="email"></input>
                        <hr className="RegisterHr"/>

                        <input onChange={handleChange} type="text" placeholder="firstname" className="RegisterFormInput" autoComplete="true" name="firstname"></input>
                        <hr className="RegisterHr"/>
                        
                        <input onChange={handleChange} type="text" placeholder="lastname" className="RegisterFormInput" autoComplete="true" name="lastname"></input>
                        <hr className="RegisterHr"/>

                        <DepartmentDropdown/>
                        <hr className="RegisterHr"/>

                        <input onChange={handleChange} type="text" placeholder="username" className="RegisterFormInput" autoComplete="true" name="username"/>
                        <hr className="RegisterHr"/>

                        <input onChange={handleChange} type="text" placeholder="password" className="RegisterFormInput" autoComplete="true" name="password"></input>
                        <hr className="RegisterHr"/>


                    </form>
                    <hr className="RegisterHr"/>
                    <hr className="RegisterHr"/>
                    <hr className="RegisterHr"/>
                    <hr className="RegisterHr"/>



                    <button onClick={handleSubmit} className="SubmitButton">Submit</button>
                    {err && err.response.data}
                </div>
            </div>
        </div>
    );
}

export default Register;
