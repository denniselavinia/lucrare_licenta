
const Puzzle = require('./puzzle.model');

const postAPuzzle = async (req, res) => {
    try {
        const newPuzzle = await Puzzle({...req.body });
        await newPuzzle.save();
        res.status(200).send({ message: 'Puzzle created successfully', puzzle: newPuzzle });
    } catch (error) {
        console.error('Error creating puzzle:', error);
        res.status(500).send({ message: 'Error creating puzzle'});
    }
}

const getAllPuzzles = async (req, res) => {
    try {
        const puzzles = await Puzzle.find().sort({ createdAt: -1 });
        res.status(200).send(puzzles);
    } catch (error) {
        console.error('Error fetching puzzles:', error);
        res.status(500).send({ message: 'Error fetching puzzles' });
    }
}

const getSinglePuzzle = async (req, res) => { 
    try {
        const { id } = req.params;
        const puzzle = await Puzzle.findById(id);
        if (!puzzle) {
            return res.status(404).send({ message: 'Puzzle not found' });
        }
        res.status(200).send(puzzle);
    }catch (error) {
        console.error('Error fetching the puzzle:', error);
        res.status(500).send({ message: 'Error fetching the puzzle' });
    }
}

const updatePuzzle = async (req, res) => {
    try { 
        const { id } = req.params;
        const updatedPuzzle = await Puzzle.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPuzzle) {
            return res.status(404).send({ message: 'Puzzle not found' });
        }
        res.status(200).send({ message: 'Puzzle updated successfully', puzzle: updatedPuzzle });
    }
    catch (error) {
        console.error('Error updating the puzzle:', error);
        res.status(500).send({ message: 'Error updating the puzzle' });
    }
}

const deletePuzzle = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPuzzle = await Puzzle.findByIdAndDelete(id);
        if (!deletedPuzzle) {
            return res.status(404).send({ message: 'Puzzle not found' });
        }
        res.status(200).send({ message: 'Puzzle deleted successfully', puzzle: deletedPuzzle });
    } catch (error) {
        console.error('Error deleting the puzzle:', error);
        res.status(500).send({ message: 'Error deleting the puzzle' });
    }
}

module.exports = {
    postAPuzzle,
    getAllPuzzles,
    getSinglePuzzle,
    updatePuzzle,
    deletePuzzle
}