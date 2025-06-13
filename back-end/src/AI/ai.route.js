const express = require('express');
const router = express.Router();
const axios = require('axios');
const Puzzle = require('../puzzles/puzzle.model'); // adjust path if needed

router.post('/search', async (req, res) => {
    const { query } = req.body;
    const puzzles = await Puzzle.find();

    const prompt = `
You are an assistant for a puzzle store. Here are the available puzzles:
${puzzles.map(p => `Title: ${p.title}, Description: ${p.description}, Number of pieces: ${p.noPieces}, Image category: ${p.categoryImage}, 
    Manufacturer/Brand: ${p.categoryManufacturer}, Price: ${p.price}`).join('\n')}
User query: "${query}"
List ONLY the titles of the most relevant puzzles, separated by new lines. If none match, say "Nu s-au gasit puzzle-uri după caracteristicile cerute.
Also, if the query is not related to puzzles, respond with "Întrebarea nu este legată de puzzle-uri.
If the user asks for a specific puzzle, provide the title of that puzzle.
If the user ask for puzzles in general, find the right answer from the internet. Try to respond quicky, with lower waiting time."
`;
    
    try {
        const response = await axios.post('http://localhost:11434/api/generate', {
            model: "llama3",
            prompt: prompt,
            stream: true
        });
        console.log(response.data); 
        res.json({ result: response.data.response || response.data || "No response from model." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;