const express = require('express');
const { postAPuzzle, getAllPuzzles, getSinglePuzzle, updatePuzzle, deletePuzzle } = require('./puzzle.controller');
const router = express.Router();

// endpoints pentru puzzles-uri

//crează un puzzle nou
router.post('/create-puzzle', postAPuzzle)
 
//ia toate puzzle-urile
router.get("/", getAllPuzzles);

//un singur puzzle
router.get("/:id", getSinglePuzzle)

//editează un puzzle
router.put("/edit/:id", updatePuzzle)

//sterge un puzzle
router.delete("/delete/:id", deletePuzzle);

module.exports = router;