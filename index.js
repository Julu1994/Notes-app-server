/**
@file index.js
@description Entry point for the backend server application
@requires express
@requires mongoose
@requires cookie-parser
@requires cors
@requires ./Routes/router
@requires ./Config/config
*/
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./Routes/router");
const config = require("./Config/config");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
//Routes
app.use("/api/v1", router);

//Database
mongoose.set("strictQuery", false);
mongoose
    .connect(config.DB_LINK, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.error("DB Connection Failed:", err);
    });
module.exports = app;
