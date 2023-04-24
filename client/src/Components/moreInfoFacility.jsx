import "./MoreInfoFacility.scss";

const MoreInfoFacility = (props) => {

    const fId = 1;

    const contacts = [{
        id:"fId",
        name:"fName",
        addr:"fAddr",
        city:"fCity",
        state:"fState",
        zip:"fZip",
        occ:"maxOcc",
        first:"firstName",
        last:"lastName", 
        title:"title", 
        cType:"cType", 
        phoneNum:"phoneNum",
        email:"cEmail",
        mailAddr:"cMailAddr",
        mailCity:"cMailCity",
        maiLZip:"cMailZip",
    }]

    return(
        <div>
      {contacts.map(contact => {
        return(
            <table>
                <tr>
                <td className="firstRow">Facility ID:</td><td>{contact.id}</td>
             </tr>
             <tr>
                <td className="firstRow">Facility Address:</td><td>{contact.addr}, {contact.city}, {contact.state} {contact.zip}</td>
             </tr>
             <tr>
                <td className="firstRow">Facility:</td><td>{contact.title}</td>
             </tr>
             <tr>
                <td className="firstRow">Contact Title:</td><td>{contact.title}</td>
             </tr>
            <tr>
                <td className="firstRow">Contact Name:</td><td>{contact.first}, {contact.last}</td>
            </tr>
            <tr>
                <td className="firstRow">Contact Title:</td><td>{contact.title}</td>
             </tr>
            <tr>
                <td className="firstRow">Contact Type:</td><td>{contact.cType}</td>
            </tr>
            <tr>
                <td className="firstRow">Contact Phone Num:</td><td>{contact.phoneNum}</td>
            </tr>
            <tr>
                <td className="firstRow">Contact eMail:</td><td>{contact.email}</td>
            </tr>
            </table>
        )
    })}
    </div>
    )
}

export default MoreInfoFacility;
//<table>
//<tr>
//<td>Facility Name:</td><td>{props.marker.name}</td>
//</tr>
//<tr>
//<td>Facility ID: </td><td>{props.marker.fId}</td>
//</tr>
//<tr>
//<td>Facility Address: </td><td>{props.marker.address}, {props.marker.city}, {props.marker.state}, {props.marker.zip}</td>
//</tr>
//<tr>
//<td>Max Occupancy: </td><td>{props.marker.occ}</td>
//</tr>
//</table>
