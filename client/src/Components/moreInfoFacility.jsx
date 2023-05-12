import "./moreInfoFacility.scss";
import {ContactContext} from "../Contexts/contactContext";
import {FacilityContext} from "../Contexts/facilityContext";
import {useContext, useState, useEffect} from "react";
import axios from "axios";
import ContactItem from "./contactItem";
import FacilityItem from "./facilityItem";

const MoreInfoFacility = ({facilities}) => {                                    // A Functional Component to display the information about a selected 
                                                                    // facility. After receiving the information from Contact and 
                                                                    // FacilityContext, it generates a table with the information about 
                                                                    // the Facility and the contacts related to said facility.
                                                                    //
                                                                    //
    const {contact, updateContact} = useContext(ContactContext);    // Pulls contact & updateContact from ContactContext
    const {fId} = useContext(FacilityContext);                      //
                                                                    //
    const [isLoading, setIsLoading] = useState(true);
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
            setIsLoading(false);                                    // Otherwise, it catches the error. It is dependent on Keyword and
        })                                                          // fId, and so it will not be triggered until both objects have changed.
        .catch(function (error) {                                   //
            console.log(error);                                     //
        })                                                          //
    }, [keyword, fId]                                               //
    );                                                              //
                                                                    //
                                                                    //
    useEffect(() => {                                               // One more useEffect, this one is used to reset Keyword to "" when the
        setKeyword("");                                             // object gets re-rendered, so that there are no issues with saving state
        setIsLoading(true);                                         // across different renders.
    }, [fId]);                                                      //
                                                                    //
    if (isLoading) {
        return(
            <div className="moreInfo">
                <div className="topBar">
                    <h3>Facility</h3>
                    <div className="moreInfoSearch">
                        <form onSubmit={handleSubmit}>
                        <input type="text" name="keyword" placeholder="Search for contacts..." onChange={handleChange}/>
                        </form>
                    </div>
                </div>
                <div className="loading">Loading...<div className="loader"></div></div>
            </div>
        )
    }

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
            {facilities.map(facility => {
                return(
                    <div className="facility-item" key={facility.fId}>
                        <FacilityItem data={facility} contacts={contact}/>
                    </div>
                )
            })}
            {contact.map(c => {
                return(
                    <div key={c.cId} className="contact-item">
                        <ContactItem data={c}/>
                    </div>
                )
            })}
    </div>
    )
}

export default MoreInfoFacility;
