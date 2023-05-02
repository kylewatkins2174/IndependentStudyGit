import * as React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider
} from "@mui/material";
import {useContext, useEffect} from "react";
import {FacilityContext} from "../Contexts/facilityContext";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Avatar } from "@mui/material";
import ScienceIcon from '@mui/icons-material/Science';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WarningIcon from '@mui/icons-material/Warning';

const ChemicalProp = ({value}) => {

  return(
    <ListItemButton sx={{ pl: 4 }}>
      <ListItemIcon>
          {/* <CheckBoxOutlineBlankOutlinedIcon /> */}
      </ListItemIcon>
      <ListItemText primary={value} />
    </ListItemButton>
  )
}

const DisabledChemicalProp = ({value}) => {
  return(
    <ListItemButton sx={{ pl: 4 }}>
      <ListItemIcon>
          <CheckOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary={value} />
    </ListItemButton>
  )
}

const ChemicalItem = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const {fId} = useContext(FacilityContext);

  const onERGClick = () => {
    window.location.href= `https://phmsa.dot.gov/erg/material?materialName=${data.chName}&materialUn=${data.materialUn}`
  }

  useEffect(() => {
    setOpen(false);
  }, [fId])

  return (
    <List>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Avatar>{data.chName[0]}</Avatar>
        </ListItemIcon>
        <ListItemText
          primary={`${data.chName} (${data.CAS})`}
          secondary={data.max_Amt ? `Max amt. ${data.max_Amt} - Perc. Full: ${data.percent}%` : ""}
        />
        <span style={{color:"red"}}>{(data.EHS === "YES") ? <WarningIcon /> : null}</span>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.chronic ? (<DisabledChemicalProp value={"Chronic"}/>) : (<ChemicalProp value={"Chronic"}/>)}
          {data.fire ? (<DisabledChemicalProp value={"Fire"}/>) : (<ChemicalProp value={"Fire"} />)}
          {data.gas ? (<DisabledChemicalProp value={"Gas"}/>) : (<ChemicalProp value={"Gas"} />)}
          {data.liquid ? (<DisabledChemicalProp value={"Liquid"}/>) : (<ChemicalProp value={"Liquid"} />)}
          {data.mixture ? (<DisabledChemicalProp value={"Mixture"}/>) : (<ChemicalProp value={"Mixture"} />)}
          {data.pressure ? (<DisabledChemicalProp value={"Pressure"}/>) : (<ChemicalProp value={"Pressure"} />)}
          {data.pure ? (<DisabledChemicalProp value={"Pure"}/>) : (<ChemicalProp value={"Pure"} />)}
          {data.reactive ? (<DisabledChemicalProp value={"Reactive"}/>) : (<ChemicalProp value={"Reactive"} />)}
          {data.solid ? (<DisabledChemicalProp value={"Solid"}/>) : (<ChemicalProp value={"Solid"} />)}
          {data.explosive ? (<DisabledChemicalProp value={"Explosive"}/>) : (<ChemicalProp value={"Explosive"} />)}
          {data.flammable ? (<DisabledChemicalProp value={"Flammable"}/>) : (<ChemicalProp value={"Flammable"} />)}
          {data.oxidizer ? (<DisabledChemicalProp value={"Oxidizer"}/>) : (<ChemicalProp value={"Oxidizer"} />)}
          {data.self_reactive ? (<DisabledChemicalProp value={"Self Reactive"}/>) : (<ChemicalProp value={"Self Reactive"} />)}
          {data.pyrophoric_liquid ? (<DisabledChemicalProp value={"Pyrophoric Liquid"}/>) : (<ChemicalProp value={"Pyrophoric Liquid"} />)}
          {data.pyrophoric_gas ? (<DisabledChemicalProp value={"Pyrophoric Gas"}/>) : (<ChemicalProp value={"Pyrophoric Gas"} />)}
          {data.self_heating ? (<DisabledChemicalProp value={"Self Heating"}/>) : (<ChemicalProp value={"Self Heating"} />)}
          {data.organic_peroxide ? (<DisabledChemicalProp value={"Organic Peroxide"}/>) : (<ChemicalProp value={"Organic Peroxide"} />)}
          {data.corrosive_to_metal ? (<DisabledChemicalProp value={"Corrosive to Metal"}/>) : (<ChemicalProp value={"Corrosive to Metal"} />)}
          {data.gas_under_pressure ? (<DisabledChemicalProp value={"Gas Under Pressure"}/>) : (<ChemicalProp value={"Gas Under Pressure"} />)}
          {data.flammable_gas ? (<DisabledChemicalProp value={"Flammable Gas"}/>) : (<ChemicalProp value={"Flammable Gas"} />)}
          {data.acute_toxicity ? (<DisabledChemicalProp value={"Acute Toxicity"}/>) : (<ChemicalProp value={"Acute Toxicity"} />)}
          {data.mutagen ? (<DisabledChemicalProp value={"Mutagen"}/>) : (<ChemicalProp value={"Mutagen"} />)}
          {data.carcinogen ? (<DisabledChemicalProp value={"Carcinogen"}/>) : (<ChemicalProp value={"Carcinogen"} />)}
          {data.loc ?<ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <LocationOnOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary={data.loc_type}
              secondary={data.loc}
            />
          </ListItemButton> : null}
          {data.loc_pressure ? <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <ThermostatIcon />
            </ListItemIcon>
            <ListItemText
              primary={data.loc_pressure + " " + data.loc_temp}
            />
            </ListItemButton> : null}
          <ListItemButton sx={{ pl: 4 }} onClick={onERGClick}>
            <ListItemIcon>
              <ScienceIcon />
            </ListItemIcon>
            <ListItemText
              primary={data.materialUn}
              secondary={"ERG"}
            />
          </ListItemButton>
        </List>
      </Collapse>
      <Divider component="li" />
    </List>
  );
};

export default ChemicalItem;
