const Puzzle = require("./puzzle.model");

const postAPuzzle = async (req, res) => {
	try {
		const newPuzzle = await Puzzle({ ...req.body });
		await newPuzzle.save();
		res
			.status(200)
			.send({ message: "Puzzle creat cu succes", puzzle: newPuzzle });
	} catch (error) {
		console.error("Eroare la crearea puzzle-ului:", error);
		res.status(500).send({ message: "Eroare de server" });
	}
};

const getAllPuzzles = async (req, res) => {
	try {
		const puzzles = await Puzzle.find().sort({ createdAt: -1 });
		res.status(200).send(puzzles);
	} catch (error) {
		console.error("Eroare la preluarea puzzle-urilor:", error);
		res.status(500).send({ message: "Eroare de server" });
	}
};

const getSinglePuzzle = async (req, res) => {
	try {
		const { id } = req.params;
		const puzzle = await Puzzle.findById(id);
		if (!puzzle) {
			return res.status(404).send({ message: "Puzzle-ul nu a fost găsit!" });
		}
		res.status(200).send(puzzle);
	} catch (error) {
		console.error("Eroare la preluarea puzzle-ului:", error);
		res.status(500).send({ message: "Eroare de server" });
	}
};

const updatePuzzle = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedPuzzle = await Puzzle.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!updatedPuzzle) {
			return res.status(404).send({ message: "Puzzle-ul nu a fost găsit" });
		}
		res
			.status(200)
			.send({ message: "Puzzle actualizat cu succes", puzzle: updatedPuzzle });
	} catch (error) {
		console.error("Eroare la actualizarea puzzle-ului:", error);
		res.status(500).send({ message: "Eroare de server" });
	}
};

const deletePuzzle = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedPuzzle = await Puzzle.findByIdAndDelete(id);
		if (!deletedPuzzle) {
			return res.status(404).send({ message: "Puzzle-ul nu a fost găsit" });
		}
		res
			.status(200)
			.send({ message: "Puzzle șters cu succes", puzzle: deletedPuzzle });
	} catch (error) {
		console.error("Eroare la ștergerea puzzle-ului:", error);
		res.status(500).send({ message: "Eroare de server" });
	}
};

module.exports = {
	postAPuzzle,
	getAllPuzzles,
	getSinglePuzzle,
	updatePuzzle,
	deletePuzzle,
};
