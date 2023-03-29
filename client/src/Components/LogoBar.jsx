import IHSLogo from "../Assets/IHS_transparent.png";
import "./LogoBar.scss";



const LogoBar = () => {

    return(
        <div className="LogoContainer">
            <img src={IHSLogo} className=""/>
        </div>
    )
}

export default LogoBar;