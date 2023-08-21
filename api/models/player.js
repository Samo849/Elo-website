const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, default: 1000 }
});

module.exports = mongoose.model('Player', playerSchema);
