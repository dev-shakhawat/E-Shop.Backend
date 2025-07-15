const express = require("express");
const app = express();
const port = 3000;
const env = require("dotenv");
env.config();
const dbConfig = require("./config/dbConfig");
const router = require("./routes/index");
const otpGen = require("./helpers/optGen");

dbConfig();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/", router);
 
 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});