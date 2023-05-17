import express from 'express';
import { departments,pending, departmentAdmin, createRequest } from '../Controller/user.js';



const route = express.Router();

route.post("/departments", departments);
route.post("/pending", pending);
route.post("/departmentAdmin", departmentAdmin);

route.post("/createRequest", createRequest);



export default route;