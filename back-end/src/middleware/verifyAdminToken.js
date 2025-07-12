const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyAdminToken = (req, res, next) => {
	const token = req.headers["authorization"]?.split(" ")[1];
	if (!token) {
		return res
			.status(401)
			.json({ error: "Acces interzis: token de autentificare lipsă" });
	}

	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({ error: "Token de autentificare invalid" });
		}

		if (user.role !== "admin") {
			return res
				.status(403)
				.json({
					error: "Acces interzis: nu aveți permisiuni de administrator",
				});
		}

		req.user = user;
		next();
	});
};

module.exports = verifyAdminToken;
