const express = require("express");
const router = express.Router();

const ctrlPlayer = require("../controlers/players");
const ctrlGames = require("../controlers/games");
const ctrlCount = require("../controlers/gamesCount");


//games
router.get("/all-games", ctrlGames.getAllGames);
router.put("/set-winner/:id", ctrlGames.setWinner);
router.delete("/game-delete-and-undo/:id", ctrlGames.delete_game_and_reset_the_ranking);
router.delete("/game-delete/:id", ctrlGames.removeGame);
router.post("/new-game", ctrlGames.createGame);

//players
router.delete("/user/:id", ctrlPlayer.removeUser);
router.get("/player/:id", ctrlPlayer.getPlayer);
//router.get("/player/:id", ctrlPlayer.getPlayerRating);
router.post("/add-user", ctrlPlayer.addUser);
router.post("/add-player", ctrlPlayer.addPlayer);
router.delete("/player/:id", ctrlPlayer.removePlayer);
router.put("/changeRankings", ctrlPlayer.changeRankings);

//Count
router.post("/create-game-count", ctrlCount.activateGamesCount);
router.put("/update-games-count", ctrlGames.updateCount);

module.exports = router;