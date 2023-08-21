const mongoose = require("mongoose");

const game = new mongoose.Schema({
    player1: { type: String, required: true},
    player2: { type: String, required: true},
    player3: { type: String, required: true},
    player4: { type: String, required: true},
    player5: { type: String, required: true},
    player6: { type: String, required: true},
    player7: { type: String, required: true},
    player8: { type: String, required: true},
    winner: {type: String},
    rankGain: {type: Number}
})

module.export = mongoose.model('Game', game);