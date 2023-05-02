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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar } from "@mui/material";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EmailIcon from '@mui/icons-material/Email';

const ContactItem = ({ data }) => {
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
          <Avatar>{data.firstName[0] + data.lastName[0]}</Avatar>
        </ListItemIcon>
        <ListItemText
          primary={`${data.firstName} ${data.lastName}`}
          secondary={`${data.phoneNum}`}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText
              primary={data.title}
              secondary={data.cType}
            />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText
              primary={data.cMailAddr + ", " + data.cMailCity}
              secondary={data.cMailState + " " + data.cMailZip} 
            />
            </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <AlternateEmailIcon />
            </ListItemIcon>
            <ListItemText
              primary={data.cEmail}
              secondary={"eMail"}
            />
          </ListItemButton>
        </List>
      </Collapse>
      <Divider component="li" />
    </List>
  );
};

export default ContactItem;
