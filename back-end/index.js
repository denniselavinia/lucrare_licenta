const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));
//routes
const puzzleRoutes = require('./src/puzzles/puzzle.route');
app.use('/api/puzzles', puzzleRoutes);

const aiRoutes = require('./src/ai/ai.route');
app.use('/api/ai', aiRoutes);

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use('/', (req, res) => {
        res.send('Welcome to my server!')
    })
}

main().then(() => console.log("Mondodb connect successfully!")).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
