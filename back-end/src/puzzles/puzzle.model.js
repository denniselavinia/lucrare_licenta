const mongoose = require('mongoose');


const puzzleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    noPieces: {
        type: Number,
        required: true,
    },
    categoryImage: {
        type: String,
        required: true,
    },
    categoryManufacturer: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const Puzzle = mongoose.model('Puzzle', puzzleSchema);
module.exports = Puzzle;
