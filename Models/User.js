const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String, // Cloudinary secure_url
        required: [true, "Project image is required"]
    },
    public_id: {
        type: String,
        required: true
    }
})
const userModel = mongoose.model('User', userSchema)
module.exports = userModel