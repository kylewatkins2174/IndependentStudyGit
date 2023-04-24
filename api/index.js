import express from 'express';
import authRoute from "./Routes/auth.js";
import facilityRoute from "./Routes/facility.js"
import adminRoute from "./Routes/admin.js"
import cors from 'cors';

//middleware
const app = express();
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));

//paths
app.use("/api/auth", authRoute);
app.use("/api/facility", facilityRoute);
app.use("/api/admin", adminRoute);

const port = 8800;

app.listen(port, () => {
    console.log(`API is listening on ${port}`);
});