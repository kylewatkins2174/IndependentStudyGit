import "./facilityPage.scss";
import {Link} from "react-router-dom";
import FacTable from "../Components/facTable";
import {FacilityContext} from "../Contexts/facilityContext"
import {useContext, useEffect, useState} from "react"
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FacilityPage = () => {

    const {fId, facility} = useContext(FacilityContext);

    const [rows, setRows] = useState([])

    useEffect(() => {

const jsonLoad = {fId};
axios.post('http://localhost:8800/api/facility/chemicals', jsonLoad)
.then(function (response) {
    setRows(response.data)
})
.catch(function (error) {
console.log(error);
})
}, [fId])

    return (
        <div className="facPage">
            <div className="header">
                <Link to="/search"><span className="back"><ArrowBackIcon/></span></Link>
                <span className="title">Chemicals stored in {facility.name}: </span>
            </div>
            <hr />
            <FacTable chemicalData={rows}/>
        </div>
    )
}

export default FacilityPage