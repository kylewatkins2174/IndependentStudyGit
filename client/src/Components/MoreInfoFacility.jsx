import "./moreInfoFacility.scss";
import {ContactContext} from "../Contexts/contactContext";
import {FacilityContext} from "../Contexts/facilityContext";
import {useContext} from "react";
import {useState, useEffect} from "react";
import axios from "axios";

const MoreInfoFacility = () => {                        // A Functional Component to display the information about a selected 
                                                        // facility. After receiving the information from Contact and 
                                                        // FacilityContext, it generates a table with the information about 
                                                        // the Facility and the contacts related to said facility.
                                                        //
                                                        //
    const {contact, updateContact} = useContext(ContactContext);// Pulls contact from ContactContext and facility from
    const {facility, fId} = useContext(FacilityContext);// FacilityContext to create the table below. Also pulls 
                                                        // setInvisible from MapContext to close the window.
                                                        //

    const [keyword, setKeyword] = useState("");
    const [inputs, setInputs] = useState({
        "keyword":""
    });

    const handleChange = (e) => {
        setInputs((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        })
    };

    const submitSearch = (e) => {
        e.preventDefault();
        setKeyword((keyword)=> inputs.keyword);
    }

    useEffect(() => {
        const jsonLoad = {fId, keyword};
        axios.post('http://localhost:8800/api/facility/search/contacts', jsonLoad)
        .then(function (response) {
            updateContact(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [keyword, fId]
    )
    
    return(
        <div className="moreInfo">
            <div className="topBar">
            <h3>Facility</h3>
            <div className="moreInfoSearch">
            <form name="submit" onSubmit={submitSearch}>
            <input type="text" name="keyword" placeholder="Search for contacts..." onChange={handleChange}/>
            </form>
            </div>
            </div>
            <table>
            <tbody>
                {/* Generates the first <tbody> with the information about the Facility. */}
            <tr>
                <td className="leftRow">Facility ID:</td><td>{facility.fId}</td>
            </tr>
            <tr>
                <td className="leftRow">Facility </td><td>{facility.name}</td>
            </tr>
            <tr>
                <td className="leftRow">Facility Address:</td><td>{facility.address}, {facility.city}, {facility.state} {facility.zip}</td>
            </tr>
            <tr>
                <td className="leftRow">Max Occupancy:</td><td>{facility.occ}</td>
            </tr>
            </tbody>
            <p>Contacts:</p>
            {contact.map(c => {
                const mailto = `mailto:${c.cEmail};`
                return( // Generates the second <tbody>, focused on the facility contacts. Each facility could have more
                        // than one contact, which is the purpose for the mapping. Most may only have one, however.
                    <tbody key={c.cId} className="end">
                    <tr>
                        <td className="leftRow">Contact Name:</td><td>{c.firstName} {c.lastName}</td>
                    </tr>
                    <tr>
                        <td className="leftRow">Contact Title:</td><td>{c.title}</td>
                    </tr>
                    <tr>
                        <td className="leftRow">Contact Address:</td><td>{c.cMailAddr}, {c.cMailCity}, {c.cMailState} {c.cMailZip}</td>
                    </tr>
                    <tr>
                        <td className="leftRow">Contact Type:</td><td>{c.cType}</td>
                    </tr>
                    <tr>
                        <td className="leftRow">Contact Phone:</td><td>{c.phoneNum}</td>
                    </tr>
                    <tr>
                        <td className="leftRow">Contact eMail:</td><td><a href={mailto}>{c.cEmail}</a></td>
                    </tr>
                    <br/>
                    </tbody>
                )
            })}
        </table>
    </div>
    )
}

export default MoreInfoFacility;