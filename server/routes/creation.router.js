const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a new creationSchema and define the properties
const creationSchema = new Schema({
    user_id: { type: String, required: true },
    synth1_params: { delayTime: Number, volume: Number, looping: Boolean, chord: Array },
    synth2_params: { drumVolume: Number, looping: Boolean },
    master_control_params: { songTile: String, tempo: Number, volume: Number }
})

// the variable that will be used to declare new instances of the Creation schema
const Creation = mongoose.model('Creation', creationSchema);

// post ROUTE to send new Creation object from client
router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('creation POST route', req.body);
        let user_id = req.user.id;
        let synth1_params = req.body[0];
        let synth2_params = req.body[1];
        let master_control_params = req.body[2];
        let creationToAdd = new Creation({user_id, synth1_params, synth2_params, master_control_params});

        creationToAdd.save((err, savedCreation) => {
            if (err) {
                console.log('ERROR mongodb creation POST route', err);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            } // end if error
        });
    } else {
        res.sendStatus(403);
    } // end if saved
}); // end router POST

module.exports = router;