const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a new creationSchema and define the properties
const creationSchema = new Schema({
    creation_params: {type: Array}
})

// the variable that will be used to declare new instances of the Creation schema
const Creation = mongoose.model('Creation', creationSchema);

// post ROUTE to send new Creation object from client
router.post('/', (req, res)=>{
    console.log('synth_interface POST route', req.body);
    let creationObject = req.body;
    let creationToAdd = new Creation(creationObject);

    creationToAdd.save((err, savedCreation)=>{
        if(err){
            console.log('ERROR mongodb synth_interface POST route', err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        } // end if error
    }); // end if saved
}); // end router POST

module.exports = router;