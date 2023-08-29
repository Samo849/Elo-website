const mongoose = require("mongoose");

const gamescount = new mongoose.Schema({
    evil: { type: Number, default: 0 },
    good: { type: Number, default: 0 },
});

const user = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
});

const player = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, default: 1000 },
});

const game = new mongoose.Schema({
    players: { type: [String], required: true },
    winner: { type: String },
    creator: { type: String, required: true },
    rankGainGoodWin: { type: Number , default:15},
    rankGainEvilWin: { type: Number , default:15},
    date: {type: Date, default: Date.now}
});

const Gamescount = mongoose.model('Gamescount', gamescount);
const User = mongoose.model('User', user);
const Player = mongoose.model('Player', player);
const Game = mongoose.model('Game', game);

module.exports = {
    Gamescount,
    User,
    Player,
    Game
};