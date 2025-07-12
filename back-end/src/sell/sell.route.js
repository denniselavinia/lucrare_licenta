const express = require("express");
const { createASell, getSellsByEmail } = require("./sell.controller");

const router = express.Router();

// se crează endpoint-urile pentru a vinde
router.post("/", createASell);

// ia v\nz[rile] după email-ul utilizatorului
router.get("/email/:email", getSellsByEmail);

module.exports = router;
