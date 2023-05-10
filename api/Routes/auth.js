import express from 'express';
import { register, login, logout, userInfo, departments, verifiedDepartments } from '../Controller/auth.js';



const route = express.Router();

route.post("/register", register);

route.post("/departments", departments);
route.post("/verifiedDepartments", verifiedDepartments)

route.post("/login", login);
route.post("/userInfo", userInfo)

route.get("/logout", logout);


export default route;
