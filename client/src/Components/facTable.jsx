import "./facTable.scss"

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
              <button><a href={"https://phmsa.dot.gov/erg/material?materialName=" + chem.chName + "&materialUn=" + chem.materialUn} target="_blank" rel="noreferrer" style={{color:"white"}}>ERG</a></button>
            </table>
          )
        })}
        </div>
    )
}

export default FacTable;
