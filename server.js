const cors = require('cors');
// const http = require("http");
var config = require("./db/config");
const express = require("express");
const bodyParser = require("body-parser");
const PHMSController = require("./api/api") 
const port = process.env.PORT || 80;
var http = require('http').Server(app);
   var  io = require('socket.io')(http);
// const io = socketIo(server);
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
  .route('/getdata')
  .get(PHMSController.getphms)

app
  .route('/getdata/:id')
  .get(PHMSController.getphmsbyid)
app
  .route('/adddata/temp=/:temp/&heartbeat=/:heartbeat/&bp=/:bp/&/ecg=/:ecg')
  .get(PHMSController.addphmsparam)
app
  .route('/add')
  .post(PHMSController.addphms)

app 
  .route('/delete/:id')
  .delete(PHMSController.deletephms) 


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

http.listen(process.env.PORT || 3000, function() {
  // ...
})