import express from 'express';
import registerRoute from "./Routes/register.js";
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
app.use("/api/authentication", registerRoute);

const port = 8800;

app.listen(port, () => {
    console.log(`API is listening on ${port}`);
});