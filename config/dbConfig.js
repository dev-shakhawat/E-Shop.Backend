const mongoose = require("mongoose");


async function dbConfig() {
    await mongoose.connect(`mongodb+srv://${process.env.db_username}:${process.env.db_pass}@cluster0.mn2y2.mongodb.net/${process.env.db_username}?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err));
   
  }



module.exports = dbConfig;