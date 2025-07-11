// require('dotenv').config({path:'./env'})

import dotenv from "dotenv";

import mongoose from "mongoose"
import { DB_NAME } from "../constants.js";
import connectDb from "../db/dbConnection.js";
import { app } from "../app.js";


// we can use that beacuse we want that  all the env verable available all time 
dotenv.config({
    path: './env'
})

connectDb()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`App is Listing on Port ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("Connection Faild !!!", err);
    })


