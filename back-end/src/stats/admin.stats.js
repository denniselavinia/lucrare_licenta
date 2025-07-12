const mongoose = require("mongoose");
const express = require("express");
const Order = require("../orders/order.model");
const Puzzle = require("../puzzles/puzzle.model");
const verifyAdminToken = require("../middleware/verifyAdminToken");
const router = express.Router();

// Functie de pentru a obține statistici pentru admin
router.get("/", verifyAdminToken, async (req, res) => {
	try {
		// Numărul total de comenzi
		const totalOrders = await Order.countDocuments();

		// Numărul total de vânzări (suma totală a tuturor comenzilor)
		const orders = await Order.find();
		const totalSales = orders.reduce(
			(sum, order) => sum + (order.totalPrice || 0),
			0
		);

		// Număr total de puzzle-uri
		const totalPuzzles = await Puzzle.countDocuments();

		res.json({
			totalSales,
			totalOrders,
			totalPuzzles,
		});
	} catch (error) {
		console.error("Eroare la preluarea dateleor despre admin:", error);
		res.status(500).json({ message: "Eroare de server" });
	}
});

module.exports = router;
