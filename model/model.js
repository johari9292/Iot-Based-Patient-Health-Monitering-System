const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let PHMS = new Schema({
    temp:{
        type:String
    },
    heartbeat:{
        type:String
    },
    ecg:{
        type:String
    },
    bp:{
        type:String
    },
   date:{
        type:Date,
        default: Date.now
        
    }
})


module.exports = mongoose.model('PHMS', PHMS);