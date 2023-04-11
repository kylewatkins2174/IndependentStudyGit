import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import HomeIcon from '@mui/icons-material/Home';
import "./searchFacility.scss";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import MapContainer from '../Components/googleMaps';
import {Link} from "react-router-dom";
import Header from "../Components/header";
import {MapContext} from "../Contexts/showMapContext";
import MoreInfoFacility from '../Components/moreInfoFacility';

const SearchFacility = () => {

    const {visibility} = useContext(MapContext);

    const [inputs, setInputs] = useState({
        "keyword":""
    });

    const handleChange = (e) => {
        setInputs((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        })
    };

    const [keyword, setKeyword] = useState("");

    const searchClick = () => {
        setKeyword((keyword) => inputs.keyword);
        console.log(keyword);
    }

    const [rows, setRows] = useState([]);

    useEffect(() => {
        const jsonLoad = {keyword};
        axios.post('http://localhost:8800/api/facility/search', jsonLoad)
        .then(function (response) {
            console.log(response.data);
            setRows(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            //always executed
        })
    }, [keyword]

    );

    return (
        <div>
        <div className="searchFacility">
        <Header />
            <div className="searchBar">
                <Link to="/" >
                    <button>
                <HomeIcon />
                </button>
                </Link>
                <input type="text" name="keyword" placeholder="Search for facility..." onChange={handleChange}/>
                <button onClick={searchClick}><SearchOutlinedIcon/></button>
            </div>
        </div>
        <div className="map">
            <MapContainer markers={rows} />
        </div>
        {visibility ? <MoreInfoFacility/> : null}
        </div>
    )
};

export default SearchFacility

//<div className="rows">
//{rows.map(row => {
//    return(
//    <div className="row" key={row.fId}>
//        <span>{row.fName}</span>, <span>{row.fAddr}</span>, <span>{row.fCity}</span>, <span>{row.fState}</span>, <span>{row.fZip}</span>
//    </div>
//    )
//})}
//</div>
//
//