import "./Register.scss";
import IHSLogo from "../Assets/IHS_transparent.png";


const Register = () => {


    return(
        
        <div className="RegisterContainer">


            <div className="RegisterBottom">
                <div className="RegisterForm">
                <h1 className="RegisterTitleHeading">Register</h1>
                    <hr className="RegisterTitleHr"/>
                    <form>

                        <input type="text" placeholder="email" className="RegisterFormInput"></input>
                        <hr className="RegisterHr"/>

                        <input type="text" placeholder="firstname" className="RegisterFormInput"></input>
                        <hr className="RegisterHr"/>
                        
                        <input type="text" placeholder="lastname" className="RegisterFormInput"></input>
                        <hr className="RegisterHr"/>

                        <input type="text" placeholder="password" className="RegisterFormInput"></input>
                        <hr className="RegisterHr"/>

                        <input type="text" placeholder="re-enter password" className="RegisterFormInput"></input>
                        <hr className="RegisterHr"/>


                    </form>
                    <hr className="RegisterHr"/>
                    <hr className="RegisterHr"/>
                    <hr className="RegisterHr"/>
                    <hr className="RegisterHr"/>



                    <button className="SubmitButton">Submit</button>
                </div>
            </div>
        </div>

    );
}

export default Register;