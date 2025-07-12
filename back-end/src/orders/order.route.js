const express = require("express");
const { createAOrder, getOrderByEmail } = require("./order.controller");

const router = express.Router();

// se crează endpoint-urile pentru comenzi
router.post("/", createAOrder);

// ia comenzile după email-ul utilizatorului
router.get("/email/:email", getOrderByEmail);

module.exports = router;
