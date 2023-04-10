const mongoose = require("mongoose");
// const { DB_HOST, DB_PORT, DB_CNN, DB_NAME } = require("../config/config");

const DB_HOST = "localhost";
const DB_PORT = 27027;
const DB_NAME = "ecommerce-DB";
let DB_CNN;

const configConnection = {
  url: `mongodb://localhost:27017//puedo`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

const mongoDBconnection = async () => {
  try {
    // await mongoose.connect(configConnection.url, configConnection.options);
    mongoose.connect('mongodb://127.0.0.1:27017/ecommerce-DB');
    console.log(`=================================`);
    console.log(
      `======= URL: ${configConnection.url.substring(0, 20)} =======`
    );
    console.log(`=================================`);
  } catch (error) {
    console.log(
      "aaaaaa", 
      "🚀 ~ file: mongo.config.js:23 ~ mongoDBconnection ~ error:",
      error.message
    );
    // throw new Error(error);
  }
};

module.exports = {
  configConnection,
  mongoDBconnection,
};