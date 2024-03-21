import express from "express";
import { createOTP, createNewUser } from "../controllers/user.controller";
import { Request, Response, NextFunction } from "express";

export const router = express.Router();

router.get("/", (req:Request, res:Response) => {
    res.send("<h1>Hello! This is Alpha.</h1>")
})

router.post("/signup", createNewUser);

router.post("/verification", createOTP);

router.get('/favicon.ico', (req, res) => {
    res.status(404).send('Favicon not found');
});

router.all('*', (req:Request, res:Response, next:NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    next(err);
})


