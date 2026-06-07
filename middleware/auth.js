const jwt = require("jsonwebtoken");
const admin = require("../Models/admin");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies?.token; // ✅ safe access

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // 🔥 FIX HERE (rename variable)
        const adminData = await admin
            .findById(decodedToken.id)
            .select("-password");

        if (!adminData) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.admin = adminData; // ✅ attach to request

        next();
    } catch (error) {
        console.log("AUTH ERROR:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = auth;