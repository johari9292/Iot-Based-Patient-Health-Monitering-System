const PHMS = require("../model/model")
exports.getphms= (req, res)=> {
    PHMS.find(function(err, PHMSs) {
        if (err) {
            console.log(err);
        } else {
            res.json(PHMSs);
            console.log("api called data is getting from database")
           
        }
    });
};

 exports.deletephms=  (req, res) => {
    PHMS.remove({_id:req.params.id}, function (err) {
        if (!err) {
            res.status(200).send({'status':'deleted'});}
    else {
        res.status(500).send({'status':'error'});
    }
});
 }
       
     
exports.getphmsbyid= (req, res)=> {
    let id = req.params.id;
    PHMS.findById(id, function(err, PHMSs) {
        res.json(PHMSs);
    })
};

exports.addphms = (req, res)=> {
    let phms = new PHMS(req.body);
    phms.save()
        .then(phms => {
            res.status(200).json({'PHMS': 'PHMS added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new PHMS failed');
        });
}

exports.addphmsparam = (req, res)=> {
    let ecgs = req.params.ecg;
     let bps = req.params.bp;
     let heartbeats = req.params.heartbeat
     let temps = req.params.temp
     PHMS.insertMany({
        
        temp: temps, 
        heartbeat: heartbeats,
        ecg: ecgs,
        bp: bps,
        
       
     }).then(phms => {
             res.status(200).json({'PHMS': 'PHMS added successfully'+ "ecg:" +ecgs + "bp:"+bps+"heartbeat:"+heartbeats + "temp:"+temps});
            console.log("phms added")
         })
         .catch(err => {
             res.status(400).send('adding new PHMS failed');
         });
 }
 
