import express from 'express';
import { searchFacility, searchContacts } from '../Controller/facility.js';


const route = express.Router();

route.post("/search", searchFacility);

route.post("/contacts", searchContacts);

export default route;