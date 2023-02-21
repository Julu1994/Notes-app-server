import express from "express";
import { router } from "./Routes/router.js";
import { config } from "./Config/config.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use("/", router);
app.use(express.json());
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

mongoose.set("strictQuery", false);
mongoose.connect(
    config.DB_LINK,
    (err) => {
        if (err) return console.error(err);
        console.log("Succcessfully connected to MongoDB");
    },
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const PORT = process.env.PORT || port;
app.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`);
});
