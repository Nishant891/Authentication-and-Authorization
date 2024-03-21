import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import { connectDB } from "../utils/db";
import {router} from "../route/router"

dotenv.config();

const app = express();

app.use(express.json({limit : "50mb"}));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors());

app.use(router);

const PORT = process.env.PORT || "";

app.listen(PORT, () => {
    console.log(`Alpha is online on ${PORT}`);
    connectDB();
})