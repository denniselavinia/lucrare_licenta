const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    image: {
        type: String, // URL -ul imaginii de profil
        required: true,
    },
},{
    timestamps: true,
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;