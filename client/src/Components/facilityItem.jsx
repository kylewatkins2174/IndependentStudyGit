import * as React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider
} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {FacilityContext} from "../Contexts/facilityContext";
import {ContactContext} from "../Contexts/contactContext"
import {MapContext} from "../Contexts/showMapContext";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Avatar } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessIcon from "@mui/icons-material/Business"
import axios from "axios";

const FacilityItem = ({ data, contacts }) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const {fId} = useContext(FacilityContext);
  const {selected} = useContext(MapContext);
  const {contact} = useContext(ContactContext);

  const [tempContact, setTempContact] = useState([{firstName:"", phoneNum: ""}]);

  useEffect(() => {
    setOpen(false);
  }, [fId])

  useEffect(() => {
    const fId = data.fId;
    

    const jsonLoad = {fId};
    axios.post('http://localhost:8800/api/facility/contacts', jsonLoad)
    .then(function (response) {
        setTempContact(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [data.fId] )

  return (
    <List>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Avatar style={{backgroundColor:"lightblue", color:"black"}}><BusinessIcon/></Avatar>
        </ListItemIcon>
        <ListItemText
          primary={`${data.fName}`}
          secondary={selected ? `${data.fId}` : `${tempContact[0].firstName} ${tempContact[0].lastName}, ${tempContact[0].phoneNum}`}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <LocationOnOutlinedIcon style={{color:"red"}} />
            </ListItemIcon>
            <ListItemText
              primary={data.fAddr + ", " + data.fCity + ", " + data.fState + " " + data.fZip}
            />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <GroupsIcon style={{color:"blue"}} />
            </ListItemIcon>
            <ListItemText
              primary={data.maxOccupants}
              secondary={"Max Occupants"} 
            />
            </ListItemButton>
        </List>
      </Collapse>
      <Divider component="li" />
    </List>
  );
};

export default FacilityItem;
