import express from 'express';
import { searchFacility, searchContacts, searchChemicals, searchContactsRefined } from '../Controller/facility.js';


const route = express.Router();

route.post("/search", searchFacility);

route.post("/contacts", searchContacts);

route.post("/chemicals", searchChemicals);

route.post("/search/contacts", searchContactsRefined);

export default route;