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
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Avatar } from "@mui/material";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import BusinessIcon from "@mui/icons-material/Business"

const FacilityItem = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const {fId} = useContext(FacilityContext);

  useEffect(() => {
    setOpen(false);
  }, [fId])

  return (
    <List>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Avatar><BusinessIcon/></Avatar>
        </ListItemIcon>
        <ListItemText
          primary={`${data.fName}`}
          secondary={`${data.fId}`}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <LocationOnOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary={data.fAddr + ", " + data.fCity + ", " + data.fState + " " + data.fZip}
            />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <GroupsOutlinedIcon />
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
