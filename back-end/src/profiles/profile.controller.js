const Profile = require("./profile.model");

const createAProfile = async (req, res) => {
	try {
		const newProfile = new Profile(req.body);
		const savedProfile = await newProfile.save();
		return res.status(200).json(savedProfile); // Only one response!
	} catch (error) {
		console.error("Eroare la crearea profilului:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

const updateProfile = async (req, res) => {
	try {
		const { email } = req.params;
		const updatedProfile = await Profile.findOneAndUpdate({ email }, req.body, {
			new: true,
		});
		if (!updatedProfile) {
			return res.status(404).json({ message: "Profilul nu a fost găsit" });
		}
		return res.status(200).json(updatedProfile); // Return only the profile object!
	} catch (error) {
		console.error("Eroare la actualizarea profilului:", error);
		return res
			.status(500)
			.json({ message: "Eroare la actualizarea profilului." });
	}
};

const getProfileByEmail = async (req, res) => {
	try {
		const { email } = req.params;
		const profile = await Profile.findOne({ email }); // Return single profile
		if (!profile) {
			return res
				.status(404)
				.json({ message: "Nu a fost găsit niciun profil." });
		}
		return res.status(200).json(profile);
	} catch (error) {
		console.error("Eroare la obținerea profilului:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = {
	createAProfile,
	getProfileByEmail,
	updateProfile,
};
