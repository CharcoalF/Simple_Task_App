// Reference: https://www.mongodb.com/products/platform/cloud
// add API method
var Express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECTION_STRING = "mongodb+srv://admin:admin123456@cluster0.t5rdo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASENAME = "Simple_Task_Database";
var database;

async function connectToDatabase() {
    try {
        // try connect to MongoDB
        const client = await MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        database = client.db(DATABASENAME);
        console.log("Mongo DB Connection Successful");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}

app.listen(55038, async () => {
    await connectToDatabase(); // connect database when start the sever
});
