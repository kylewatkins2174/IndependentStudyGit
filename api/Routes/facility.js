import express from 'express';
import { searchFacility, searchContacts, searchChemicals } from '../Controller/facility.js';


const route = express.Router();

route.post("/search", searchFacility);

route.post("/contacts", searchContacts);

route.post("/chemicals", searchChemicals)

export default route;