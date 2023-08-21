const mongoose = require("mongoose");
const Player = mongoose.model("Player");
const Game = mongoose.model("Game");

const createGame = async(req, res) => {

}

const getAllGames = async(req,res) => {

}

const removeGame = async(req,res) => {

}

const delete_game_and_reset_the_ranking = async(req,res) => {
    const gameId = req.body.id;
}





module.exports = {
    getAllGames,
    createGame,
    removeGame,
    delete_game_and_reset_the_ranking

}