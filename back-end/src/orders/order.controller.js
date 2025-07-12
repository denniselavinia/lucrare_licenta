const Puzzle = require("../puzzles/puzzle.model");
const Order = require("./order.model");

const createAOrder = async (req, res) => {
	try {
		const newOrder = new Order(req.body);
		const savedOrder = await newOrder.save();
		if (req.body.productIds && Array.isArray(req.body.productIds)) {
			for (const puzzleId of req.body.productIds) {
				await Puzzle.findByIdAndUpdate(puzzleId, { status: "ordered" });
			}
		}
		res.status(200).json(savedOrder);
	} catch (error) {
		console.error("Eroare la crearea comenzii:", error);
		res.status(500).json({ message: "Eroare server" });
	}
};

const getOrderByEmail = async (req, res) => {
	try {
		const { email } = req.params;
		const orders = await Order.find({ email }).sort({ createdAt: -1 });
		if (!orders) {
			return res
				.status(404)
				.json({ message: "Nu a fost găsită nicio comandă." });
		}
		res.status(200).json(orders);
	} catch (error) {
		console.error("Eroare la obținerea comenzilor:", error);
		res.status(500).json({ message: "Eroare server" });
	}
};

const markOrderAsDelivered = async (req, res) => {
	try {
		const { orderId, puzzleIds } = req.body;
		await Order.findByIdAndUpdate(orderId, { status: "delivered" });
		if (Array.isArray(puzzleIds)) {
			for (const puzzleId of puzzleIds) {
				await Puzzle.findByIdAndUpdate(puzzleId, { status: "delivered" });
			}
		}
		res
			.status(200)
			.json({ message: "Comanda și puzzle-ul setate ca delivered" });
	} catch (error) {
		console.error("Eroare la livrare:", error);
		res.status(500).json({ message: "Eroare server" });
	}
};

module.exports = {
	createAOrder,
	getOrderByEmail,
	markOrderAsDelivered,
};
