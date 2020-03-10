const cors = require('cors');
const http = require("http");
var config = require("./db/config");
const express = require("express");
const bodyParser = require("body-parser");
const PHMSController = require("./api/api") 
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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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
.route('/adddata/:temp/:heartbeat/:bp/:ecg')
.get(PHMSController.getphmsparam)

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

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});