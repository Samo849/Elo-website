const mongoose = require("mongoose");
const Gamescount = mongoose.model("Gamescount");

// activate games count
const activateGamesCount = async(req,res) => {
    const potential = await Gamescount.findOne()
    if(potential) {
        return res.status(400).json({
            message:"Games count already exists."
        })
    }

    try {
        const count = await Gamescount.create(req.body);


        return res.status(200).json({
            
            message: "Wins count has been initialized."
        });
    } catch (error) {
        console.error('Error creating GamesCount:', error);
        return res.status(500).json({
            message: "Internal server error."
        })
    }
}

module.exports = {
    activateGamesCount
}