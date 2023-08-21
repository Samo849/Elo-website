const express = require("express");
const router = express.Router();

const ctrlPlayer = require("../controlers/players");
const ctrlGames = require("../controlers/games");


//games

router.get("/all-games", ctrlGames.getAllGames);


router.delete("/game-delete-and-undo/:id", ctrlGames.delete_game_and_reset_the_ranking);
router.delete("/game-delete/:id", ctrlGames.removeGame);

router.post("/new-game", ctrlGames.createGame);


//players
router.get("/player/:id", ctrlPlayer.getPlayer);
router.get("/player/:id", ctrlPlayer.getPlayerRating);

router.post("/add-player", ctrlPlayer.addPlayer);
router.delete("/player/:id", ctrlPlayer.removePlayer);
router.put("/changeRankings", ctrlPlayer.changeRankings);




module.exports = router;