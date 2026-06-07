const Certifications = require("../Models/Certifications");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// ================= CLOUDINARY CONFIG =================

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

class CertificateController {

    // ================= CREATE CERTIFICATE =================

    static createCertificate = async (req, res) => {

        try {

            const {
                title,
                organization,
                issueDate,
                credentialId,
                certificateLink,
                skills
            } = req.body;

            if (
                !title ||
                !organization ||
                !issueDate ||
                !certificateLink
            ) {
                return res.status(400).json({
                    success: false,
                    message: "All required fields are required"
                });
            }

            if (!req.files || !req.files.image) {
                return res.status(400).json({
                    success: false,
                    message: "Certificate image is required"
                });
            }

            const file = req.files.image;

            const uploadResult =
                await cloudinary.uploader.upload(
                    file.tempFilePath,
                    {
                        folder: "portfolio_certificates",
                        resource_type: "image"
                    }
                );

            fs.unlinkSync(file.tempFilePath);

            const certificate =
                await Certifications.create({
                    title,
                    organization,
                    issueDate,
                    credentialId,
                    certificateLink,
                    image: uploadResult.secure_url,
                    public_id: uploadResult.public_id,
                    skills: skills
                        ? skills.split(",").map(
                            item => item.trim()
                        )
                        : [],
                });

            res.status(201).json({
                success: true,
                message:
                    "Certificate created successfully",
                certificate
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

    // ================= GET ALL CERTIFICATES =================

    static getAllCertificates = async (req, res) => {

        try {

            const certificates =
                await Certifications.find()
                    .sort({ createdAt: -1 });

            res.status(200).json({
                success: true,
                certificates
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

    // ================= GET SINGLE CERTIFICATE =================

    static getSingleCertificate = async (req, res) => {

        try {

            const { id } = req.params;

            const certificate =
                await Certifications.findById(id);

            if (!certificate) {

                return res.status(404).json({
                    success: false,
                    message: "Certificate not found"
                });
            }

            res.status(200).json({
                success: true,
                certificate
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

    // ================= UPDATE CERTIFICATE =================

    static updateCertificate = async (req, res) => {

        try {

            const { id } = req.params;

            const certificate =
                await Certifications.findById(id);

            if (!certificate) {

                return res.status(404).json({
                    success: false,
                    message: "Certificate not found"
                });
            }

            const {
                title,
                organization,
                issueDate,
                credentialId,
                certificateLink,
                skills
            } = req.body;

            // IMAGE UPDATE

            if (req.files && req.files.image) {

                if (certificate.public_id) {

                    await cloudinary.uploader.destroy(
                        certificate.public_id
                    );
                }

                const file = req.files.image;

                const uploadResult =
                    await cloudinary.uploader.upload(
                        file.tempFilePath,
                        {
                            folder:
                                "portfolio_certificates",
                            resource_type:
                                "image"
                        }
                    );

                fs.unlinkSync(
                    file.tempFilePath
                );

                certificate.image =
                    uploadResult.secure_url;

                certificate.public_id =
                    uploadResult.public_id;
            }

            // TEXT UPDATE

            certificate.title =
                title || certificate.title;

            certificate.organization =
                organization ||
                certificate.organization;

            certificate.issueDate =
                issueDate ||
                certificate.issueDate;

            certificate.credentialId =
                credentialId ||
                certificate.credentialId;

            certificate.certificateLink =
                certificateLink ||
                certificate.certificateLink;

            certificate.skills =
                skills
                    ? skills
                        .split(",")
                        .map(item =>
                            item.trim()
                        )
                    : certificate.skills;

            await certificate.save();

            res.status(200).json({
                success: true,
                message:
                    "Certificate updated successfully",
                certificate
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

    // ================= DELETE CERTIFICATE =================
    static deleteCertificate = async (req, res) => {

        try {

            const { id } = req.params;

            const certificate =
                await Certifications.findById(id);

            if (!certificate) {

                return res.status(404).json({
                    success: false,
                    message: "Certificate not found"
                });
            }

            if (certificate.public_id) {

                await cloudinary.uploader.destroy(
                    certificate.public_id
                );
            }

            await certificate.deleteOne();

            res.status(200).json({
                success: true,
                message:
                    "Certificate deleted successfully"
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };



}

module.exports = CertificateController;

