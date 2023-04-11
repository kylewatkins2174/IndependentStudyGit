import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import queryServer from "../axios.js"
import {AuthContext} from "../Contexts/AuthContext"; 


const Login = () => {

    const {updateUser, updateAuthorization} = useContext(AuthContext);

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

        }
        catch(err){
            setErr(err.response.data);
        }



        queryServer.post("/auth/login", inputs).then(response => {
            console.log(response);
            updateUser()
            navigate("/home");
        }).catch(err => {
            setErr(err);
        })
    }

    return(
        <div className="LoginContainer">

            <div className="LoginBottom">
                <div className="LoginForm">
                <h1 className="LoginTitleHeading">Login</h1>
                    <hr className="LoginTitleHr"/>
                    <form>

                        <input type="text" placeholder="username" className="LoginFormInput" onChange={handleChange} name="username"></input>
                        <hr className="LoginHr"/>

                        <input type="password" placeholder="password" className="LoginFormInput" onChange={handleChange} name="password"></input>
                        <hr className="LoginHr"/>

                    </form>





                    <hr className="LoginHr"/>
                    <hr className="LoginHr"/>
                    <hr className="LoginHr"/>
                    <hr className="LoginHr"/>
                    <button onClick={handleSubmit} className="SubmitButton">Submit</button>
                    <br/>
                    <p className="ErrorMessage">{err && err.response.data}</p>
                </div>
            </div>

        </div>

    );
}

export default Login;