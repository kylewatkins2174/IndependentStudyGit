

const FacTable = (props) => {

    return(
        <table>
        <tr>
          <td>Facility Name:</td><td>{props.marker.name}</td>
        </tr>
        <tr>
          <td>Facility ID: </td><td>{props.marker.fId}</td>
          </tr>
          <tr>
          <td>Facility Address: </td><td>{props.marker.address}, {props.marker.city}, {props.marker.state}, {props.marker.zip}</td>
          </tr>
          <tr>
          <td>Max Occupancy: </td><td>{props.marker.occ}</td>
        </tr>
      </table>
    )
}

export default FacTable;