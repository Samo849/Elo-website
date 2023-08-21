const mongoose = require("mongoose");
const player = require("../models/player");
const Player = mongoose.model("Player");
const Game = mongoose.model("Game");

const getPlayer = async (req,res) => {
    try {
        const player = await Player.findById(req.params.id);
        if(player == null) {
            return res.status(404).json({message: "Cannot find the player"});
        } else if (player) {
            res.send(player)
        }
    } catch(err) {
        return res.status(500).json({message:err.message});
    }

}

const addPlayer = async (req, res) => {
    const player = req.body;

    try {
        await Player.create(player);


        return res.status(200).json({
            message: "Player successfully created."
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error."
        })
    }
}

const removePlayer = async (req, res) => {
    const playerId = req.params.id;
    try {
        await Player.findByIdAndDelete(playerId);
        return res.status(200).json({
            message: "User successfully deleted."
        })
    } catch(err) {
        return res.status(500).json({message:err.message});
    }
}

const changeRankings = async(req,res) => {
    
    try {
        const changeInratings = req.body['change-in-rating'];
        const losers = req.body['losers'];
        const winners =req.body['winners'];

        for (let i = 0; i < losers.length; i++) {
            try {
                const player = await Player.findById(losers[i]);
                if (player) {
                    player.rating -= changeInratings;
                    await player.save();
                } else {
                    console.log(`Player with ID ${losers[i]} not found.`);
                }
            } catch (error) {
                console.error(`Error updating loser: ${error}`);
            }
        }
        
        for (let i = 0; i < winners.length; i++) {
            try {
                const player = await Player.findById(winners[i]);
                if (player) {
                    player.rating += changeInratings;
                    await player.save();
                } else {
                    console.log(`Player with ID ${winners[i]} not found.`);
                }
            } catch (error) {
                console.error(`Error updating winner: ${error}`);
            }
        }

        return res.status(200).json({
            message: "dela",
            changeInratings: changeInratings,
            winners: winners,
            losers: losers
        })
    } catch(err) {
        return res.status(500).json({message:"internal"});
    }
}

const getPlayerRating = async(req,res) => { // ?
    try {
        const player = await Player.findById(req.params.id);
        if(player == null) {
            return res.status(404).json({message: "Cannot find the player"});
        } else if (player) {
            res.send(player.rating)
        }
    } catch(err) {
        return res.status(500).json({message:err.message});
    }
}

module.exports = {
    getPlayer,
    getPlayerRating,
    addPlayer,
    removePlayer,
    changeRankings
};
