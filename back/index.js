import express from 'express';
import { configDotenv } from 'dotenv';
import { connectDB } from './db/connectDB.js';
import router from './routes/authRoute.js';
import cookieParser from 'cookie-parser';

configDotenv();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());



app.use("/api/auth",router);

app.listen(PORT, () => {
    connectDB();
    console.log("server is runing on port -->",PORT);
})

