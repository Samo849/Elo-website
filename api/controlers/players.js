const mongoose = require("mongoose");
const User = mongoose.model("User");
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
        const potential = await Player.findOne({name: player.name})
        if(potential) {
            return res.status(400).json({message: `Name ${player.name} is already taken.`})
        }
    } catch {
        return res.status(500).json({message: `Internal server error.`})
    }

    try {
        await Player.create(player);

        return res.status(200).json({
            message: `Player ${player.name} successfully created.`
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error."
        })
    }
}

const addUser = async (req, res) => {
    const user = req.body;

    try {
        await User.create(user);


        return res.status(200).json({
            message: "User successfully created."
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error."
        })
    }
}

const removeUser = async (req, res) => {
    const UserId = req.params.id;
    try {
        await User.findByIdAndDelete(UserId);
        return res.status(200).json({
            message: "User successfully deleted."
        })
    } catch(err) {
        return res.status(500).json({message:err.message});
    }
}

const removePlayer = async (req, res) => {
    const playerId = req.params.id;
    try {
        await Player.findByIdAndDelete(playerId);
        return res.status(200).json({
            message: "Player successfully deleted."
        })
    } catch(err) {
        return res.status(500).json({message:err.message});
    }
}

const changeRankings = async(changeInratings, losers, winners) => {


    for (let i = 0; i < losers.length; i++) {
        try {
            const player = await Player.findOne({name: losers[i]});
            
            if (player) {
                player.rating -= changeInratings;
                await player.save();
            } else {
                console.log(`Player with name ${losers[i]} not found.`);
            }
        } catch (error) {
            console.error(`Error updating loser: ${error}`);
        }
    }

    for (let i = 0; i < winners.length; i++) {
        try {
            const player = await Player.findOne({name: winners[i]});
            if (player) {
                player.rating += changeInratings;
                await player.save();
            } else {
                console.log(`Player with name ${winners[i]} not found.`);
            }
        } catch (error) {
            console.error(`Error updating winner: ${error}`);
        }
    }
    return ({})
    
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
    addUser,
    getPlayer,
    getPlayerRating,
    addPlayer,
    removePlayer,
    removeUser,
    changeRankings
};
