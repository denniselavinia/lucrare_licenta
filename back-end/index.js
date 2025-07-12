const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json({ limit: "256mb" }));
app.use(express.urlencoded({ limit: "256mb", extended: true }));

const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());
app.use(
	cors({
		origin: ["http://localhost:5173"],
		credentials: true,
	})
);
//routes
const puzzleRoutes = require("./src/puzzles/puzzle.route");
const orderRoutes = require("./src/orders/order.route");
const sellRoutes = require("./src/sell/sell.route");
const userRoutes = require("./src/users/user.route");
const profileRoutes = require("./src/profiles/profile.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/puzzles", puzzleRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/sells", sellRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/admin/stats", adminRoutes);

async function main() {
	await mongoose.connect(process.env.DB_URL);
	app.use("/", (req, res) => {
		res.send("Welcome to my server!");
	});
}

main()
	.then(() => console.log("Mondodb connect successfully!"))
	.catch((err) => console.log(err));

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
