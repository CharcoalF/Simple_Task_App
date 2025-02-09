// Reference: https://www.mongodb.com/products/platform/cloud
// add API method
// server.js
const Express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const multer = require("multer");
const { ObjectId } = require('mongodb');

var app = Express();
app.use(cors());
app.use(Express.json()); // Handle JSON requests

var CONNECTION_STRING = "mongodb+srv://admin:admin123456@cluster0.t5rdo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASENAME = "Simple_Task_Database";
var database;

async function connectToDatabase() {
    try {
        const client = await MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        database = client.db(DATABASENAME);
        console.log("Mongo DB Connection Successful");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}

app.listen(55038, async () => {
    await connectToDatabase();
});

// Add a new note
app.post('/api/React_Related/AddNotes', multer().none(), async (request, response) => {
    try {
        const { Title, Description, Due_date, Priority, Status } = request.body;
        const result = await database.collection("Simple_Task_Collection").insertOne({
            Title,
            Description,
            Due_date,
            Priority,
            Status,
            Creation_Timestamp: new Date(),
            Last_Updated_Timestamp: new Date(),
        });

        response.json({ message: "Added Successfully", result });
    } catch (error) {
        console.error("Error adding note:", error);
        response.status(500).json({ error: "Failed to add note" });
    }
});

// Delete a note
app.delete('/api/React_Related/DeleteNote', async (request, response) => {
    const { id } = request.body;
    if (!ObjectId.isValid(id)) {
        return response.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const objectId = new ObjectId(id);
        const result = await database.collection("Simple_Task_Collection").deleteOne({ _id: objectId });

        if (result.deletedCount === 1) {
            response.json({ message: "Note deleted successfully" });
        } else {
            response.status(404).json({ message: "Note not found" });
        }
    } catch (error) {
        console.error("Error deleting note:", error);
        response.status(500).json({ error: "Failed to delete note" });
    }
});

// Get all notes
app.get('/api/React_Related/GetNote', async (request, response) => {
    try {
        const notes = await database.collection("Simple_Task_Collection").find({}).toArray();
        response.json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        response.status(500).json({ error: "Failed to fetch notes" });
    }
});
