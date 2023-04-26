import "./moreInfoFacility.scss";
import {ContactContext} from "../Contexts/contactContext";
import {FacilityContext} from "../Contexts/facilityContext";
import {useContext, useState, useEffect} from "react";
import axios from "axios";

const MoreInfoFacility = () => {                                    // A Functional Component to display the information about a selected 
                                                                    // facility. After receiving the information from Contact and 
                                                                    // FacilityContext, it generates a table with the information about 
                                                                    // the Facility and the contacts related to said facility.
                                                                    //
                                                                    //
    const {contact, updateContact} = useContext(ContactContext);    // Pulls contact & updateContact from ContactContext and facility from
    const {facility, fId} = useContext(FacilityContext);            // FacilityContext to create the table below.
                                                                    //
    const [keyword, setKeyword] = useState("");                     // Two state variables have been initialized, keyword and inputs.
    const [inputs, setInputs] = useState({                          // Keyword is the final search keyword used after being typed and
        "keyword":""                                                // submitted in the <input> field. Inputs is used in handleChange
    });                                                             // to gather the user inputs as they type, keeping it up to date
                                                                    // on any changes made.
                                                                    //
    const handleChange = (e) => {                                   // handleChange() is a function to keep the Inputs up to date
        setInputs((prev) => {                                       // on any new changes made. Called in the <input>'s onChange,
            return {...prev, [e.target.name]: e.target.value}       // it gathers the inputs in real time and forms a string based on them.
        });                                                         //
    }                                                               //
                                                                    //
    const handleSubmit = (e) => {                                   // handleSubmit() is a function used on the <form>'s onSubmit.
        e.preventDefault();                                         // It first prevents the form from re-rendering the page, and then
        setKeyword((keyword)=> inputs.keyword);                     // takes Inputs and sets Keyword to that final value.
    };                                                              //
                                                                    //
    useEffect(() => {                                               // This useEffect is used for the refined search into the contacts
                                                                    // table in the database. It gathers the fId and the Keyword state
        const jsonLoad = {fId, keyword};                            // variable mentioned earlier, and it sets them to jsonLoad. jsonLoad
        axios.post('http://localhost:8800/api/facility/search/contacts', jsonLoad)// is then sent to the server with axios and retrieves
        .then(function (response) {                                 // the response data. If there is no error, then it sets the Contact
            updateContact(response.data);                           // context variable to the information received from the server. 
        })                                                          // Otherwise, it catches the error. It is dependent on Keyword and
        .catch(function (error) {                                   // fId, and so it will not be triggered until both objects have changed.
            console.log(error);                                     //
        })                                                          //
    }, [keyword, fId]                                               //
    );                                                              //
                                                                    //
                                                                    //
    useEffect(() => {                                               // One more useEffect, this one is used to reset Keyword to "" when the
        setKeyword("");                                             // object gets re-rendered, so that there are no issues with saving state
    }, [fId]);                                                      // across different renders.
                                                                    //
    return(                                                         //  
        <div className="moreInfo">
            <div className="topBar">
                <h3>Facility</h3>
                <div className="moreInfoSearch">
                    <form onSubmit={handleSubmit}>
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
            <tr>
                <td className="otherRow">Contacts:</td><td className="otherRow"></td>
            </tr>
            </tbody>
            {contact.map(c => {
                return( // Generates the second <tbody>, focused on the facility contacts. Each facility could have more
                        // than one contact, which is the purpose for the mapping. Most may only have one, however.
                    <tbody>
                    <tr>
                        <td className="otherRow"></td><td className="otherRow"></td>
                    </tr>
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
                        <td className="leftRow">Contact eMail:</td><td>{c.cEmail}</td>
                    </tr>
                    </tbody>
                )
            })}
            {/* Creates a link to the /facility page, which will display the chemical information. */}
        </table>
    </div>
    )
}

export default MoreInfoFacility;
