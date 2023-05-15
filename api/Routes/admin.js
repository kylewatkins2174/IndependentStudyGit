import express from 'express';
import { requests, accept, deny, revoke, activeUsers, departments } from '../Controller/admin.js';



const route = express.Router();

route.post("/requests", requests);
route.post("/accept", accept);
route.post("/activeUsers", activeUsers);
route.post("/deny", deny);
route.post("/revoke", revoke);
route.post("/departments", departments);


export default route;
