// controllers/ProjectController.js
const User = require("../Models/User");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// ================= CLOUDINARY CONFIG =================
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
class UserController{
    static createProfile =async(req,res)=>{
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({
                    message: "All fields are required",
                });
            }
            if (!req.files || !req.files.image) {
                return res.status(400).json({
                    message: "Image is required",
                });
            }
            const userImage = req.files.image;
            const uploadResult = await cloudinary.uploader.upload(userImage.tempFilePath, {
                folder: "users",
            });
            fs.unlinkSync(userImage.tempFilePath);
            const user = await User.create({ name, image: uploadResult.secure_url, public_id: uploadResult.public_id });
            res.status(201).json({
                message: "User created successfully",
                user,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal server error",
            });
        }
    }
    static getUser = async (req, res) => {
        try {
            const user = await User.find();
            res.status(200).json({
                message: "User fetched successfully",
                user,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal server error",
            });
        }
    }
    static updateUser = async (req, res) => {
        try {
            const { name, image } = req.body;
            const { id } = req.params;
            if (!name || !image) {
                return res.status(400).json({
                    message: "All fields are required",
                });
            }
            if (!req.files || !req.files.image) {
                return res.status(400).json({
                    message: "Image is required",
                });
            }
            const userImage = req.files.image;
            const uploadResult = await cloudinary.uploader.upload(userImage.tempFilePath, {
                folder: "users",
            });
            fs.unlinkSync(userImage.tempFilePath);
            const user = await User.findByIdAndUpdate(id, { name, image: uploadResult.secure_url, public_id: uploadResult.public_id }, { new: true });
            res.status(200).json({
                message: "User updated successfully",
                user,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal server error",
            });
        }
    }
    static deleteUser = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByIdAndDelete(id);
            res.status(200).json({
                message: "User deleted successfully",
                user,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal server error",
            });
        }
    }
}
module.exports = UserController;