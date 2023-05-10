import express from 'express';
import { departments, departmentAdmin } from '../Controller/user.js';



const route = express.Router();

route.post("/departments", departments);
route.post("/departmentAdmin", departmentAdmin);



export default route;