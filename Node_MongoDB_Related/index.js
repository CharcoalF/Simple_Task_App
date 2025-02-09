// Reference: https://www.mongodb.com/products/platform/cloud
// add API method
const Express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());
app.use(Express.json()); // deal with JSON request

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

// Post route to add a note
app.post('/api/React_Related/AddNotes', multer().none(), async (request, response) => {
    try {
        const numOfDocs = await database.collection("Simple_Task_Collection").countDocuments({});
        const result = await database.collection("Simple_Task_Collection").insertOne({
            id: (numOfDocs + 1).toString(),
            description: request.body.newNotes
        });

        response.json({ message: "Added Successfully", result });
    } catch (error) {
        console.error("Error adding note:", error);
        response.status(500).json({ error: "Failed to add note" });
    }
});

// Delete route to delete a note
app.delete('/api/React_Related/DeleteNote', async (request, response) => {
    const { id } = request.body; // assuming the id is sent in the body of the DELETE request
    try {
        const result = await database.collection("Simple_Task_Collection").deleteOne({ id: id });

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

// Get route to fetch all notes
app.get('/api/React_Related/GetNote', async (request, response) => {
    try {
        const notes = await database.collection("Simple_Task_Collection").find({}).toArray();
        response.json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        response.status(500).json({ error: "Failed to fetch notes" });
    }
});
