import "./chemicalView.scss";
import {useState, useEffect, useContext} from "react";
import {FacilityContext} from "../Contexts/facilityContext"
import axios from "axios";

const ChemicalView = () => {                                    // This is the ChemicalView functional component. In order to display the chemicals
                                                                // for different companies, this component has several state variables, context variables,
                                                                // a useEffect, and a couple functions to handle searching from within the values provided.
                                                                //
    const {fId} = useContext(FacilityContext);                  // This is the only context variable for this component, the fId from the Facility Context.
                                                                // It is used to gather the chemicals at a certain facility using a database query. 
                                                                // 
                                                                // Here, three state variables are declared: Chems, Keyword, and Inputs.
    const [chems, setChems] = useState([]);                     // Chems is an array variable used to store the information from the server about the chemicals.
    const [keyword, setKeyword] = useState("");                 // Keyword is used in the handleSubmit function to store the value used to query information from the server.
    const [inputs, setInputs] = useState({                      // Inputs is an object that gets updated to include every change that happens in the <input> in real time.
        "keyword":""                                            //
    });                                                         //
                                                                //
                                                                //
    const handleChange = (e) => {                               // handleChange() is a function to keep the Inputs up to date
        setInputs((prev) => {                                   // on any new changes made. Called in the <input>'s onChange,
            return {...prev, [e.target.name]: e.target.value}   // it gathers the inputs in real time and forms a string based on them.
        })                                                      //
    }                                                           //
                                                                //
    const handleSubmit = (e) => {                               // handleSubmit() is a function used on the <form>'s onSubmit.
        e.preventDefault();                                     // It first prevents the form from re-rendering the page, and then
        setKeyword((keyword)=> inputs.keyword);                 // takes Inputs and sets Keyword to that final value.
    }                                                           //
                                                                //
    useEffect(() => {                                           // This useEffect gathers the fId context variable and the keyword 
                                                                // state variable and sets jsonLoad to the values in them. jsonLoad is 
        const jsonLoad = {fId, keyword};                        // then sent to the server with axios. If there is no error, the response
        axios.post('http://localhost:8800/api/facility/chemicals', jsonLoad)// data is stored in the chems state array variable to be used
        .then(function (response) {                             // in rendering the function below. Otherwise, it catches the error. The
            setChems(response.data);                            // useEffect waits for changes from the Keyword and fId variables, hence
        })                                                      // the Dependency Array at the bottom.
        .catch(function (error) {                               //
            console.log(error);                                 //
        })                                                      //
    }, [keyword, fId]                                           //
    )                                                           //
                                                                //
    return(                                                     // Here is where the ChemicalView gets rendered. In it, you will find:
                                                                // 
                                                                // 1. The top search bar, where the user can search for chemicals within the
                                                                //    list already rendered.
                                                                //
                                                                // 2. The Chemicals table, which renders for every chemical found at the facility.
                                                                //    This shows the chemical name, determines if it is an Extremely Hazardous
                                                                //    Substance (EHS), the properties of the chemical, CAS number, max amount for
                                                                //    the facility, the percentage full, and the location information.
        <div className="chemical-list">
            {/* 1 */}
            <div className="topBar">
                <h3>Chemicals</h3>
                <div className="chemicalViewSearch">
                    <form onSubmit={handleSubmit}>
                    <input type="text" name="keyword" placeholder="Search for chemicals..." onChange={handleChange}/>
                    </form>
                </div>
            </div>
            {/* 2 */}
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