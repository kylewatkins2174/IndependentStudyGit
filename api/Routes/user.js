import express from 'express';
import { departments, departmentAdmin, createRequest } from '../Controller/user.js';



const route = express.Router();

route.post("/departments", departments);
route.post("/departmentAdmin", departmentAdmin);

route.post("/createRequest", createRequest);



export default route;