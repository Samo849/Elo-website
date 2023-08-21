const mongoose = require("mongoose");

const game = new mongoose.Schema({
    evil: { type: Number, default: 0 },
    good: { type: Number, default: 0 },
})

module.export = mongoose.model('Game', game);