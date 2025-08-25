const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const env = require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const router = require("./routes/index");


// cors middleware
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});




// db config
dbConfig();



app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/", router);
 
 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});