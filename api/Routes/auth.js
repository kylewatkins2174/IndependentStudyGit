import express from 'express';
import { register, login, logout, userInfo } from '../Controller/auth.js';



const route = express.Router();

route.post("/register", register);

route.get("/departments");

route.post("/login", login);
route.post("/userinfo", userInfo)

route.get("/logout", logout);


export default route;
