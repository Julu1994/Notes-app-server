const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./Routes/router");
const config = require("./Config/config");

const app = express();
const port = 8080;

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
    })
);
app.use("/", router);

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
        console.error("DocumentDB Connection Failed:", err);
    });

const PORT = config.PORT || port;
app.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`);
});
