const mongoose = require("mongoose");


async function dbConfig() {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.mn2y2.mongodb.net/${process.env.DB_USERNAME}?retryWrites=true&w=majority&appName=Cluster0`)

    .then(() => console.log("db connected"))
    .catch((err) => console.log(err));
   
  }



module.exports = dbConfig;