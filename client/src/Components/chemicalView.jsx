import "./chemicalView.scss";
import {useState, useEffect, useContext} from "react";
import {FacilityContext} from "../Contexts/facilityContext"
import axios from "axios";
import ChemicalItem from "./chemicalItem";

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
                {chems.map(chem => {
                    return(
                        <div key={chem.chId} className="chem">
                            <ChemicalItem data={chem} />
                        </div>
                    )
                })}
        </div>
    )
}

export default ChemicalView;