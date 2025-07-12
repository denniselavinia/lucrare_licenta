const express = require("express");
const {
	createAProfile,
	getProfileByEmail,
	updateProfile,
} = require("./profile.controller");

const router = express.Router();

// se crează endpoint-urile pentru profile
router.post("/", createAProfile);

//editează un profil
router.put("/edit/:email", updateProfile);

// ia profil-ul după email-ul utilizatorului
router.get("/email/:email", getProfileByEmail);

module.exports = router;
