const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a new creationSchema and define the properties
const creationSchema = new Schema({
    user_id: { type: String, required: true },
    username: { type: String },
    synth1_params: { delayTime: Number, volume: Number, looping: Boolean, chord: Array },
    synth2_params: { drumVolume: Number, looping: Boolean },
    synth3_params: {note: String, looping: Boolean},
    master_control_params: { creationTitle: String, tempo: Number, volume: Number },
    display_color: {type: Number}
})

// the variable that will be used to declare new instances of the Creation schema
const Creation = mongoose.model('Creation', creationSchema);

// POST function to send new Creation object from client
router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('creation POST route', req.body);
        let user_id = req.user.id;
        let username = req.user.username;
        let synth1_params = req.body[0];
        let synth2_params = req.body[1];
        let synth3_params = req.body[2];
        let master_control_params = req.body[3];
        let display_color = req.body[4];
        let creationToAdd = new Creation({user_id, username, synth1_params, synth2_params, synth3_params, master_control_params, display_color});

        creationToAdd.save((err, savedCreation) => {
            if (err) {
                console.log('ERROR mongodb creation POST route', err);
                res.sendStatus(500);
            } else {
                console.log('creation POST route SUCCESS', savedCreation);
                res.sendStatus(200);
            } // end if error
        }); // end creationToAdd.save
    } else {
        res.sendStatus(403);
    } // end if isAuthenticated
}); // end router POST

// GET function to retrieve all Creation objects from database
router.get('/', (req, res)=>{
    if (req.isAuthenticated()){
        Creation.find({}, (err, foundCreations)=>{
            if (err){
                console.log('ERROR mongodb creation GET route', err);
                res.sendStatus(500);
            } else {
                console.log('creation GET route SUCCESS', foundCreations);
                res.send(foundCreations);
            } // end if error
        }); // end Creation.find
    } else {
        res.sendStatus(403);
    } // end if isAuthenticated
}); // end router GET

router.delete('/:id', (req, res)=> {
    if (req.isAuthenticated()){
        const creationObjectId = req.params.id;
        Creation.findByIdAndRemove(creationObjectId, (err, deletedCreationObject)=> {
            if(err){
                console.log('ERROR mongodb creation DELETE route', err);
                res.sendStatus(500);
            } else {
                console.log('creation DELETE route SUCCESS', deletedCreationObject);
                res.sendStatus(200);
            } // end if error
        }); // end Creation.findByIdAndRemove
    } else {
        res.sendStatus(403);
    } // end if isAuthenticated
}); // end router DELETE

router.put('/:id', (req, res)=> {
    if(req.isAuthenticated()){
        const creationObjectId = req.params.id;
        const update = req.body.newTitle;
        Creation.findByIdAndUpdate(creationObjectId, { $set:{ master_control_params: { creationTitle: update } } }, {new: true}, (err, updatedCreationObject)=>{
            if(err){
                console.log('ERROR creation PUT route', err);
                res.sendStatus(500);
            } else {
                console.log('creation PUT route SUCCESS', updatedCreationObject);
                res.sendStatus(200);
            } // end if error
        }); // end Creation.findByIdAndUpdate
    } else {
        res.sendStatus(403);
    } // end if isAuthenticated
}); // end router PUT

module.exports = router;