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
    PHMS.findById(id, function(err, PHMS) {
        res.json(PHMS);
    })
};
exports.getphmsparam=(req,res)=>{
    let ecgs = req.params.ecg
    let bps = req.params.bp
    let temps = req.params.temp
    let heartbeats = req.params.heartbeat
    PHMS.insertMany({
        ecg:ecgs,
        heartbeat:heartbeats,
        bp:bps,
        temp:temps
    }).then(phms => {
        res.status(200).json({'PHMS': 'PHMS added successfully'});
       
    })
    .catch(err => {
        res.status(400).send('adding new PHMS failed');
    });
        

}
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