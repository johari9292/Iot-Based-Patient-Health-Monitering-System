const cors = require('cors');
const http = require("http");
var config = require("./db/config");
const express = require("express");
const bodyParser = require("body-parser");
const PHMSController = require("./apis/api")
const port = process.env.PORT || 3201;

const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const ObjectId = require("mongodb").ObjectID;
const MongoClient = require('mongodb').MongoClient;
const DATABASE_NAME = "test";
const uri = "mongodb+srv://joharibalti1996:is119821885@cluster0-jjj5l.mongodb.net/test?retryWrites=true&w=majority";
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const dotenv = require("dotenv").config()
const path = require("path")

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "frontend", "build")))

// ...
// Right before your app.listen(), add this:

var database, collection;



MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    throw error;
  }
  database = client.db(DATABASE_NAME);
  collection = database.collection("phms");
  console.log("Connected to `" + DATABASE_NAME + "`!");


  io.on("connection", socket => {
    console.log("New client connected");
    if (!socket.sentMydata) {
      collection.find({}).sort({ _id: -1 }).limit(1).toArray(function (err, result) {
       if (err) throw err;
        socket.emit("mydata", (result));
        console.log("data",result)

      })
      socket.sentMydata = true;
    }
    const changeStream = collection.watch()
    changeStream.on('change', function (change) {
      collection.find({}).sort({ _id: -1 }).limit(1).toArray(function (err, result) {
        if (err) throw err;

        socket.emit("FromAPI", (result));

      })
    })

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
})





app
  .route('/get')
  .get(PHMSController.getphms)

app
  .route('/get/:id')
  .get(PHMSController.getphmsbyid)

app
  .route('/add')
  .post(PHMSController.addphms)

app 
  .route('/delete/:id')
  .delete(PHMSController.deletephms) 

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});