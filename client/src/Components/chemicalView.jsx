import "./chemicalView.scss";
import {useState, useEffect, useContext} from "react";
import {FacilityContext} from "../Contexts/facilityContext"
import axios from "axios";

const ChemicalView = () => {

    const {fId} = useContext(FacilityContext);

    const [chems, setChems] = useState([]);
    const [keyword, setKeyword] = useState("");
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
                    const href=`https://phmsa.dot.gov/erg/material?materialName=${chem.chName}&materialUn=${chem.materialUn}`
                    return(
                        <tbody key={chem.chId}>
                            <tr>
                                <td className="leftRow">Chemical:</td><td>{chem.chName}</td>
                            </tr>
                            <tr>
                                <td className="leftRow">Extremely Hazardous Substance?</td><td>{chem.EHS}</td>
                            </tr>
                            <tr>
                                <td className="leftRow">Properties:</td><td></td>
                            </tr>
                            {chem.chronic ? <tr>
                                <td className="propRow"></td><td>Chronic</td>
                            </tr> : null}
                            {chem.fire ? <tr>
                                <td className="propRow"></td><td>Fire</td>
                            </tr> : null}
                            {chem.gas ? <tr>
                                <td className="propRow"></td><td>Gas</td>
                            </tr> : null}
                            {chem.liquid ? <tr>
                                <td className="propRow"></td><td>Liquid</td>
                            </tr> : null}
                            {chem.mixture ? <tr>
                                <td className="propRow"></td><td>Mixture</td>
                            </tr> : null}
                            {chem.pressure ? <tr>
                                <td className="propRow"></td><td>Pressure</td>
                            </tr> : null}
                            {chem.pure ? <tr>
                                <td className="propRow"></td><td>Pure</td>
                            </tr> : null}
                            {chem.reactive ? <tr>
                                <td className="propRow"></td><td>Reactive</td>
                            </tr> : null}
                            {chem.solid ? <tr>
                                <td className="propRow"></td><td>Solid</td>
                            </tr> : null}
                            {chem.explosive ? <tr>
                                <td className="propRow"></td><td>Explosive</td>
                            </tr> : null}
                            {chem.flammable ? <tr>
                                <td className="propRow"></td><td>Flammable</td>
                            </tr> : null}
                            {chem.oxidizer ? <tr>
                                <td className="propRow"></td><td>Oxidizer</td>
                            </tr> : null}
                            {chem.self_reactive ? <tr>
                                <td className="propRow"></td><td>Self Reactive</td>
                            </tr> : null}
                            {chem.pyrophoric_liquid ? <tr>
                                <td className="propRow"></td><td>Pyrophoric Liquid</td>
                            </tr> : null}
                            {chem.pyrophoric_gas ? <tr>
                                <td className="propRow"></td><td>Pyrophoric Gas</td>
                            </tr> : null}
                            {chem.self_heating ? <tr>
                                <td className="propRow"></td><td>Self Heating</td>
                            </tr> : null}
                            {chem.organic_peroxide ? <tr>
                                <td className="propRow"></td><td>Organic Peroxide</td>
                            </tr> : null}
                            {chem.corrosive_to_metal ? <tr>
                                <td className="propRow"></td><td>Corrosive to Metal</td>
                            </tr> : null}
                            {chem.gas_under_pressure ? <tr>
                                <td className="propRow"></td><td>Gas Under Pressure</td>
                            </tr> : null}
                            {chem.flammable_gas ? <tr>
                                <td className="propRow"></td><td>Flammable Gas</td>
                            </tr> : null}
                            {chem.acute_toxicity ? <tr>
                                <td className="propRow"></td><td>Acute Toxicity</td>
                            </tr> : null}
                            {chem.mutagen ? <tr>
                                <td className="propRow"></td><td>Mutagen</td>
                            </tr> : null}
                            {chem.carcinogen ? <tr>
                                <td className="propRow"></td><td>Carcinogen</td>
                            </tr> : null}
                            <tr>
                                <td></td><td>&nbsp;</td>
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
                            <tr>
                                <td className="propRow">ERG:</td><td className="propRow"><a href={href} target="_blank" rel="noreferrer">{chem.materialUn}</a></td>
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