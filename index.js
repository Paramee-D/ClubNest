import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import clubRoute from "./Route/clubRoute.js";
import recruitmentRoute from "./Route/recruitmentRoute.js";
import applicationRoute from "./Route/applicationRoute.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("Database connected successfully.");
        app.listen(PORT, () => {
            console.log(`ClubNest server is running on port: ${PORT}`);
        });
    })
    .catch((error) => console.log(error));

// Routes
app.use("/api/clubs", clubRoute);
app.use("/api/recruitments", recruitmentRoute);
app.use("/api/applications", applicationRoute);
