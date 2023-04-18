import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import HomeIcon from '@mui/icons-material/Home';
import "./searchFacility.scss";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import MapContainer from '../Components/googleMaps';
import {Link} from "react-router-dom";
import MoreInfoFacility from '../Components/moreInfoFacility';
import ChemicalView from "../Components/chemicalView";
import NotVisible from "../Components/notVisible";
import {MapContext} from "../Contexts/showMapContext"

const SearchFacility = () => {                  // The main star of the app. The ability to search, select, and view
                                                // information about a facility that stores hazardous chemicals in
                                                // Harris County. This page uses three main components:
                                                //    -- a searchBar component, which allows for the user to search for a facility.
                                                //    -- a MapContainer component, defined in /components/GoogleMaps.jsx.
                                                //    -- a MoreInfoFacility component, defined in /components/MoreInfoFacility.jsx
                                                //
    const {visibility} = useContext(MapContext);
                                                //
    const [inputs, setInputs] = useState({      // This useState is used in order to send data to the server in the useEffect
                                                // defined below.
        "keyword":""                            //
    });                                         //
                                                //
                                                // 
    const handleChange = (e) => {               // A handleChange function to take the input from the search and send to the server.
        setInputs((prev) => {                   // Gathers the inputs as they are being formed, not the full thing.
            return {...prev, [e.target.name]: e.target.value}
        })                                      //
    };                                          //
                                                //
                                                //
    const [keyword, setKeyword] = useState(""); // Another useState, this time to gather and store the word used to search. Only
                                                // gathers the full keyword to send in a SQL query.
                                                //
    const searchClick = () => {                 // A function to take the fully formed input by the user and store as the keyword.
        setKeyword((keyword) => inputs.keyword);//
    }                                           //
                                                //
    const [rows, setRows] = useState([]);       // The final useState in this part of the page. Rows is an array, and used to store
                                                // multiple results fro the SQL query/API request as shown in the useEffect below.
                                                //
    useEffect(() => {                           // useEffect which reloads every time a new keyword is formed by the searchClick
        const jsonLoad = {keyword};             // function above. Takes in the {keyword} as a JSON and sends to the server with Axios.
                                                // As long as no error occurs, it will call setRows and assign the rows [] to all the
                                                // data pulled from the server.
        axios.post('http://localhost:8800/api/facility/search', jsonLoad)
        .then(function (response) {             // 
            setRows(response.data);             // 
        })                                      //
        .catch(function (error) {               //
            console.log(error);                 //
        })                                      //
    }, [keyword]                                //
                                                //
    );                                          //
                                                //
    return (                                    // the rendering of SearchFacility.
        <div className="search">
                <div className="searchBar">
                    <Link to="/home" >
                        <button><HomeIcon /></button>
                    </Link>
                    <input type="text" name="keyword" placeholder="Search for facility..." onChange={handleChange}/>
                    <button onClick={searchClick}><SearchOutlinedIcon/></button>
                </div>
            <div className="contents">
                <div className="chemicals">
                    {visibility ? <ChemicalView/> : null}
                </div>

                <div className="map">
                    <MapContainer markers={rows} />
                </div>
                
                <div className="contact-info">
                    {visibility ? <MoreInfoFacility/> : <NotVisible/> }
                </div>
            </div>
        </div>
    )
};

export default SearchFacility