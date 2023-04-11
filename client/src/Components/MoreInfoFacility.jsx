import "./moreInfoFacility.scss";
import {ContactContext} from "../Contexts/contactContext";
import {FacilityContext} from "../Contexts/facilityContext";
import {MapContext} from "../Contexts/showMapContext";
import {useContext} from "react"
import {Link} from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

const MoreInfoFacility = () => {                        // A Functional Component to display the information about a selected 
                                                        // facility. After receiving the information from Contact and 
                                                        // FacilityContext, it generates a table with the information about 
                                                        // the Facility and the contacts related to said facility.
                                                        //
                                                        //
    const {contact} = useContext(ContactContext);       // Pulls contact from ContactContext and facility from
    const {facility} = useContext(FacilityContext);     // FacilityContext to create the table below. Also pulls 
    const {setInvisible} = useContext(MapContext);      // setInvisible from MapContext to close the window.
                                                        //
    return(                                             //
        <div className="moreInfo">
            <CloseIcon className="close" onClick={setInvisible}/>
            <table>
            <tbody>
                {/* Generates the first <tbody> with the information about the Facility. */}
            <tr>
                <td className="firstRow">Facility ID:</td><td>{facility.fId}</td>
            </tr>
            <tr>
                <td className="firstRow">Facility </td><td>{facility.name}</td>
            </tr>
            <tr>
                <td className="firstRow">Facility Address:</td><td>{facility.address}, {facility.city}, {facility.state} {facility.zip}</td>
            </tr>
            <tr>
                <td className="firstRow">Max Occupancy:</td><td>{facility.occ}</td>
            </tr>
            </tbody>
            {contact.map(c => {
                return( // Generates the second <tbody>, focused on the facility contacts. Each facility could have more
                        // than one contact, which is the purpose for the mapping. Most may only have one, however.
                    <tbody key={c.cId}>
                    <tr>
                        <td className="firstRow">Contact Name:</td><td>{c.firstName} {c.lastName}</td>
                    </tr>
                    <tr>
                        <td className="firstRow">Contact Title:</td><td>{c.title}</td>
                    </tr>
                    <tr>
                        <td className="firstRow">Contact Address:</td><td>{c.cMailAddr}, {c.cMailCity}, {c.cMailState} {c.cMailZip}</td>
                    </tr>
                    <tr>
                        <td className="firstRow">Contact Type:</td><td>{c.cType}</td>
                    </tr>
                    <tr>
                        <td className="firstRow">Contact Phone:</td><td>{c.phoneNum}</td>
                    </tr>
                    <tr>
                        <td className="firstRow">Contact eMail:</td><td>{c.cEmail}</td>
                    </tr>
                    </tbody>
                )
            })}
            {/* Creates a link to the /facility page, which will display the chemical information. */}
        </table>
            <Link to="/facility">
            <button className="fullWidth">View Facility's Chemical Information</button>
            </Link>
    </div>
    )
}

export default MoreInfoFacility;