const express = require("express");
const app = express(); 
const env = require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const router = require("./routes/index");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");



app.use(express.json()); // for parsing application/json


 
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 



// cors middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH , DELETE , OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // preflight request 
  }
  next();
});

app.set("trust proxy", 1); // trust first proxy

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.mn2y2.mongodb.net/${process.env.DB_USERNAME}?retryWrites=true&w=majority&appName=Cluster0`,
      collectionName: "sessions",
      ttl: 60 * 60 * 24 ,    // one day time
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { secure: false, httpOnly: false, maxAge: 1000 * 60 * 60 * 24 },
    name: "Eshop",
  })
);



// db config
dbConfig();
 

app.use("/", router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${port}`);
});
