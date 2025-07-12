const Sell = require("./sell.model");

const createASell = async (req, res) => {
	try {
		const newSell = await Sell(req.body);
		const savedSell = await newSell.save();
		res.status(200).json(savedSell);
	} catch (error) {
		console.error("Eroare la crearea vânzarii:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const getSellsByEmail = async (req, res) => {
	try {
		const { email } = req.params;
		const sells = await Sell.find({ email }).sort({ createdAt: -1 });
		if (!sells) {
			return res
				.status(404)
				.json({ message: "Nu a fost găsită nicio vânzare." });
		}
		res.status(200).json(sells);
	} catch (error) {
		console.error("Eroare la obținerea vânzărilor:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = {
	createASell,
	getSellsByEmail,
};
