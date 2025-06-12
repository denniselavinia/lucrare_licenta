const express = require('express');
const User = require('./user.model');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post("/admin", async (req, res) => { 
    const { username, password } = req.body;
    try {
        const admin = await User.findOne({ username });
        if (!admin) {
            res.status(404).json({ error: "Utilizatorul admin nu a fost găsit" });
        }
        if(admin.password !== password) {
            res.status(401).json({ error: "Parola incorecta" });
        }
        const token = jwt.sign({ id: admin._id, username: admin.username, role: admin.role }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            message: "Autentificarea s-a realizat cu succes",
            token: token,
            user: {username: admin.username, role: admin.role }
        });
    } catch (error) {
        console.error("Eroare la logare ca admin", error);
        res.status(500).json({ error: "Eroare la logare ca admin" });
    }
})

module.exports = router;