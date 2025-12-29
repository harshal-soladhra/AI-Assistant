import express from "express"
import dotenv from "dotenv";
import cors from "cors"

import authRouter from "./router/auth-router.js"
import contactRouter from "./router/contact-router.js"
import serviceRouter from "./router/service-router.js"
import connectDB from "./utils/db.js"
import errorMiddleware from "./middlewares/error-middleware.js";

dotenv.config();

const app = express()

const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your client's origin
    optionsSuccessStatus: 200 ,// Some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
};

app.use(cors(corsOptions))
app.use(express.json())


connectDB();

app.use("/api/auth",authRouter)
app.use("/api/form",contactRouter)
app.use("/api/data",serviceRouter)


app.use(errorMiddleware)
app.listen(3000,()=>{
    console.log(`server is running on port 3000`)
})