import "./FacTable.scss"

const FacTable = ({chemicalData}) => {

    return(
      <div>
        {chemicalData.map(chem => {
          return (
            <table>
              <tr>
                <td className="firstRow">Chemical:</td><td>{chem.chName}</td>
              </tr>
              <tr>
                <td className="firstRow">CAS Number:</td><td>{chem.CAS}</td>
              </tr>
              <tr>
                <td className="firstRow">Extremely Hazardous Substance?</td><td>{chem.EHS}</td>
              </tr>
              <tr>
                <td className="firstRow">Location Type:</td><td>{chem.loc_type}</td>
              </tr>
              <tr>
                <td className="firstRow">CAS Number:</td><td>{chem.loc_pressure}</td>
              </tr>
              <tr>
                <td className="firstRow">Location Temperature:</td><td>{chem.loc_temp}</td>
              </tr>
              <tr>
                <td className="firstRow">Location Pressure:</td><td>{chem.loc_pressure}</td>
              </tr>
              <tr>
                <td className="firstRow">Percent:</td><td>{chem.percent}%</td>
              </tr>
              <tr>
                <td className="firstRow">Max Amount:</td><td>{chem.max_Amt}</td>
              </tr>
            </table>
          )
        })}
        <button>View SDS</button>
        <button>View ERG</button>
        <button>View 3rd option</button>
        </div>
    )
}

export default FacTable;