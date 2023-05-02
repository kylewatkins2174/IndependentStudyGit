import IHSLogo from "../Assets/IHS_transparent.png";
import "./logoBar.scss";
import { UserBar } from "./userBar";

const LogoBar = () => {

    return(
        <div className="LogoContainer">
            <img src={IHSLogo} alt="logo" className=""/>
        </div>

    )
}

export default LogoBar;
