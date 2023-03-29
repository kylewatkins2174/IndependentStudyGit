import "./Register.scss";
import { useState } from "react";
import queryServer from "../axios.js"

const Register = () => {

    const [inputs, setInputs] = useState({
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

        queryServer.post("/auth/login")
        
    }


    return(
        
        <div className="RegisterContainer">


            <div className="RegisterBottom">
                <div className="RegisterForm">
                <h1 className="RegisterTitleHeading">Register</h1>
                    <hr className="RegisterTitleHr"/>
                    <form>

                        <input onChange={handleChange}type="text" placeholder="email" className="RegisterFormInput"></input>
                        <hr className="RegisterHr"/>

                        <input onChange={handleChange}type="text" placeholder="firstname" className="RegisterFormInput"></input>
                        <hr className="RegisterHr"/>
                        
                        <input onChange={handleChange}type="text" placeholder="lastname" className="RegisterFormInput"></input>
                        <hr className="RegisterHr"/>

                        <input onChange={handleChange}type="text" placeholder="password" className="RegisterFormInput"></input>
                        <hr className="RegisterHr"/>

                        <input placeholder="re-enter password" className="RegisterFormInput"></input>
                        <hr className="RegisterHr"/>


                    </form>
                    <hr className="RegisterHr"/>
                    <hr className="RegisterHr"/>
                    <hr className="RegisterHr"/>
                    <hr className="RegisterHr"/>



                    <button onClick={handleSubmit} className="SubmitButton">Submit</button>
                </div>
            </div>
        </div>

    );
}

export default Register;