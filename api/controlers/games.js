const mongoose = require("mongoose");
const { changeRankings } = require("./players");
const { User } = require("../models/game");
const Player = mongoose.model("Player");
const Game = mongoose.model("Game");
const Gamescount = mongoose.model("Gamescount");

const createGame = async(req, res) => {
    const game = req.body;
    var ratingsEvil = 0;
    var ratingsGood = 0;

    //check if players and creator exist
    try {
        const user = await User.findOne ({ name: game.creator})
    } catch(error){
        res.status(404).json({
            message:"Creator/user not found."
        })
    }
    try {
        var players= [];
        var player;
        for(var i = 0; i < 8; i++) {
            player = await Player.findOne({name: game.players[i]})
            console.log(i);
            players.push(player);
        }
    } catch(error) {
        return res.status(404).json({
            message: "There was a problem finding players."
        })
    }

    // calculate ratings
    for(var i = 0; i < 8; i++) {
        if(i <4) {
            ratingsEvil += players[i].rating;
        } else{
            ratingsGood += players[i].rating;
        }
    }

    // if both teams are even the gain is 15 points
    var gain = 15;
    var diff = Math.round((ratingsEvil - ratingsGood) /50);

    var goodSideWin = gain + diff;
    var evilSideWin = gain - diff;

    console.log(goodSideWin, evilSideWin)
    
    // create game
    try {
        const newGame = await Game.create(game);
        newGame.rankGainGoodWin = goodSideWin;
        newGame.rankGainEvilWin = evilSideWin;
        await newGame.save();

        return res.status(201).json({
            message: "Game created successfully."
        });
        
    } catch(error) {
        return res.status(500).json({
            message:"Internal server error."
        })
    }
}

// here u set the winner and trigger the ranking changes
const setWinner  = async(req,res) => {
    const winner = req.body['winner'];
    const gameId = req.params.id;

    try {
        const game = await Game.findById(gameId);
        game.winner = winner;
        await game.save();
        var sendRating;
        if(winner === "Evil" || winner === "evil") {
            sendRating = game.rankGainEvilWin;
            var losers = [game.players[4],game.players[5],game.players[6],game.players[7]]
            var winners = [game.players[0],game.players[1],game.players[2],game.players[3]]
        } else {
            sendRating = game.rankGainGoodWin;
            var losers = [game.players[0],game.players[1],game.players[2],game.players[3]]
            var winners = [game.players[4],game.players[5],game.players[6],game.players[7]]
        }
        await changeRankings(
            sendRating,
            losers,
            winners
        );
        await updateCount(game.winner);
        return res.status(200).json({message: `Winner has been set. The gain/loss of players is ${sendRating}.`});
    } catch(error) {
        return res.status(500).json({message:"Internal server error."});
    }
}


// all recent games
const getAllGames = async (req, res) => {
    try {
        const games = await Game.find(); // Fetch all games

        res.status(200).json({ games });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching games.', error: error.message });
    }
};


// remove games after there is a large amount of games cca. 100
const removeGame = async(req,res) => {
    const gameId = req.params.id;
    try {
        await Game.findByIdAndDelete(gameId);
        return res.status(200).json({
            message: "Game successfully deleted."
        })
    } catch(err) {
        return res.status(500).json({message:err.message});
    }
}


// if a game is invallid
const delete_game_and_reset_the_ranking = async(req,res) => {
    const gameId = req.params.id;

    try {
        var game = await Game.findById(gameId);
        var lossGain = game.rankGain;
        // it has to be the opposite
        if(game.winner === "evil" || game.winner === "Evil") {
            var losers = [game.players[0], game.players[1], game.players[2], game.players[3]];
            var winners = [game.players[4], game.players[5], game.players[6], game.players[7]];
        } else {
            var losers = [game.players[4], game.players[5], game.players[6], game.players[7]];
            var winners = [game.players[0], game.players[1], game.players[2], game.players[3]];
        }
        await changeRankings(
            lossGain,
            losers,
            winners
        );
        await updateCount(game.winner);
        
    } catch(error) {
        return res.status(500).json({message: "Rating could not be reset."});
    }

    
    try {
        await Game.findByIdAndDelete(gameId);
        return res.status(200).json({
            message: "Game successfully deleted, rating is reset."
        })
    } catch(err) {
        return res.status(500).json({message:"Internal server error."});
    }
}

const updateCount = async(winner,loser) => {
    
    try{
        const count = await Gamescount.findOne();
        if(winner === "Evil" || "evil") {
            count.evil += 1;
        } else {
            count.good += 1;
        }
        await count.save();
        console.log("Games count has been updated.");
    } catch(error) {
        console.log("Games count could not be updated.");
    }
}


module.exports = {
    updateCount,
    setWinner,
    getAllGames,
    createGame,
    removeGame,
    delete_game_and_reset_the_ranking
}