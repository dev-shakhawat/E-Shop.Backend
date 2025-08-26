const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const env = require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const router = require("./routes/index");
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(express.json()); // for parsing application/json

// cors middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH , DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.set("trust proxy", 1); // trust first proxy

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://${process.env.db_username}:${process.env.db_pass}@cluster0.mn2y2.mongodb.net/${process.env.db_username}?retryWrites=true&w=majority&appName=Cluster0`,
      collectionName: "sessions",
      ttl: 30,    // one day time
    }),
    secret: process.env.session_secret,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { secure: false, httpOnly: false, maxAge: 1000 * 30 },
  })
);



// db config
dbConfig();

 


app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
