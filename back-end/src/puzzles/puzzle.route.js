const express = require('express');
const { postAPuzzle, getAllPuzzles, getSinglePuzzle, updatePuzzle, deletePuzzle } = require('./puzzle.controller');
const router = express.Router();

// endpoints for puzzles

//create/post a puzzle
router.post('/create-puzzle', postAPuzzle)
 
//get all puzzles
router.get("/", getAllPuzzles);

//single book 
router.get("/:id", getSinglePuzzle)

//update a puzzle
router.put("/edit/:id", updatePuzzle)

//delete a puzzle
router.delete("/delete/:id", deletePuzzle);

module.exports = router;