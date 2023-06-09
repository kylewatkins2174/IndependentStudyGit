import express from 'express';
import authRoute from "./Routes/auth.js";
import facilityRoute from "./Routes/facility.js"
import adminRoute from "./Routes/admin.js"
import userRoute from "./Routes/user.js"
import cors from 'cors';
import cookieParser from 'cookie-parser';

//middleware
const app = express();
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));

//paths
app.use("/api/auth", authRoute);
app.use("/api/facility", facilityRoute);
app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute)

const port = 8800;

app.listen(port, () => {
    console.log(`API is listening on ${port}`);
});