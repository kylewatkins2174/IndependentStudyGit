import "./chemicalView.scss";
import {useState, useEffect, useContext} from "react";
import {FacilityContext} from "../Contexts/facilityContext"
import axios from "axios";

const ChemicalView = () => {

    const {fId} = useContext(FacilityContext);

    const [chems, setChems] = useState([])
    const [keyword, setKeyword] = useState("")
    const [inputs, setInputs] = useState({
        "keyword":""
    });


    const handleChange = (e) => {
        setInputs((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setKeyword((keyword)=> inputs.keyword);
    }

    useEffect(() => {
        
        const jsonLoad = {fId, keyword};
        axios.post('http://localhost:8800/api/facility/chemicals', jsonLoad)
        .then(function (response) {
            setChems(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [keyword, fId]
    )

    return(
        <div className="chemical-list">
            <div className="topBar">
                <h3>Chemicals</h3>
                <div className="chemicalViewSearch">
                    <form onSubmit={handleSubmit}>
                    <input type="text" name="keyword" placeholder="Search for chemicals..." onChange={handleChange}/>
                    </form>
                </div>
            </div>
            <table>
                {chems.map(chem => {
                    return(
                        <tbody key={chem.chId}>
                            <tr>
                                <td className="leftRow">Chemical Name:</td><td>{chem.chName}</td>
                            </tr>
                            <tr>
                                <td className="leftRow">Extremely Hazardous Substance?</td><td>{chem.EHS}</td>
                            </tr>
                            <tr>
                                <td className="leftRow">CAS Number: </td><td>{chem.CAS}</td>
                            </tr>
                            <tr>
                                <td className="leftRow">Max Amount: </td><td>{chem.max_Amt}</td>
                            </tr>
                            <tr>
                                <td className="leftRow">Percent Full:</td><td>{chem.percent}</td>
                            </tr>
                            <tr>
                                <td className="leftRow">Location:</td><td>{chem.loc}</td>
                            </tr>
                            <tr>
                                <td className="leftRow">Location Type:</td><td>{chem.loc_type}</td>
                            </tr>
                            <tr>
                                <td className="leftRow">Location Pressure:</td><td>{chem.loc_pressure}</td>
                            </tr>
                            <tr>
                                <td className="leftRow">Location Temperature:</td><td>{chem.loc_temp}</td>
                            </tr>
                            <br/>
                        </tbody>
                    )
                })}
            </table>
        </div>
    )
}

export default ChemicalView;