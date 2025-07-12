const express = require("express");
const {
	createAOrder,
	getOrderByEmail,
	markOrderAsDelivered,
} = require("./order.controller");

const router = express.Router();

// se crează endpoint-urile pentru comenzi
router.post("/", createAOrder);

// ia comenzile după email-ul utilizatorului
router.get("/email/:email", getOrderByEmail);

router.put("/mark-delivered", markOrderAsDelivered);

module.exports = router;
