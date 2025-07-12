const express = require("express");
const {
	postAPuzzle,
	getAllPuzzles,
	getSinglePuzzle,
	updatePuzzle,
	deletePuzzle,
	availablePuzzles,
} = require("./puzzle.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");
const router = express.Router();

// endpoints pentru puzzles-uri

//crează un puzzle nou
router.post("/create-puzzle", verifyAdminToken, postAPuzzle);

//ia toate puzzle-urile
router.get("/", getAllPuzzles);

//un singur puzzle
router.get("/:id", getSinglePuzzle);

//editează un puzzle
router.put("/edit/:id", verifyAdminToken, updatePuzzle);

//sterge un puzzle
router.delete("/delete/:id", verifyAdminToken, deletePuzzle);

// endpoint pentru a obține puzzle-uri disponibile
router.get("/available", availablePuzzles);

module.exports = router;
