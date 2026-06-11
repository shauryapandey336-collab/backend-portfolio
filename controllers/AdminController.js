const admin = require("../Models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// ================= CLOUDINARY CONFIG =================
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

class AdminController {
    static register = async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const adminExists = await admin.findOne({ email });
            if (adminExists) {
                return res.status(400).json({ message: "Admin already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await admin.create({ name, email, password: hashedPassword });
            res.status(201).json({ message: "Admin registered successfully", result });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static login = async (req, res) => {
        try {
            console.log("BODY:", req.body);

            const { email, password } = req.body;

            const adminExists = await admin.findOne({ email });
            console.log("ADMIN:", adminExists);

            if (!adminExists) {
                return res.status(400).json({ message: "Admin not found" });
            }

            const isPasswordValid = await bcrypt.compare(password, adminExists.password);
            console.log("PASSWORD MATCH:", isPasswordValid);

            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid password" });
            }

            console.log("JWT_SECRET:", process.env.JWT_SECRET);

            const token = jwt.sign(
                { id: adminExists._id },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 3600000,
            });
            res.status(200).json({ message: "Login success", token });

        } catch (error) {
            console.log("FULL ERROR:", error);
            res.status(500).json({ message: error.message });
        }
    };

    static logout = async (req, res) => {
        try {
            res.clearCookie("token");
            res.status(200).json({ message: "Admin logged out successfully" });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static getProfile = async (req, res) => {
        try {
            const adminData = await admin.findById(req.admin.id).select("-password");

            if (!adminData) {
                return res.status(404).json({ message: "Admin not found" });
            }

            res.status(200).json({ adminData });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };


}
module.exports = AdminController