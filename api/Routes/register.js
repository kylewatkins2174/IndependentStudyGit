import express from 'express';
import { register } from '../Controller/register.js';

const route = express.Router();

route.get("/register", register);


export default route;
