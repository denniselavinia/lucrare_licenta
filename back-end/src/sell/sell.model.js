const mongoose = require("mongoose");

const sellSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		noPieces: {
			type: Number,
			required: true,
		},
		categoryImage: {
			type: String,
			required: true,
		},
		categoryManufacturer: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Sell = mongoose.model("Sell", sellSchema);

module.exports = Sell;
