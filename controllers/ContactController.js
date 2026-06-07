const contact = require("../Models/contact");

class ContactController {

    // create contact form
    static createContact = async (req, res) => {
        try {
            const { name, email, subject, message } = req.body;
            if (!name || !email || !subject || !message) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const result = new contact({
                name,
                email,
                subject,
                message,
            });
            await result.save();
            res.status(201).json({ message: "Message sent successfully" });


        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal Server Error" });
        }
    }


    // get all contact form
    static getAllContact = async (req, res) => {
        try {
            const contacts = await contact.find();
            res.status(200).json(contacts);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    // edit contact form
    static editContact = async (req, res) => {
        try {
            const { name, email, subject, message } = req.body;
            if (!name || !email || !subject || !message) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const result = await contact.findByIdAndUpdate(req.params.id, {
                name,
                email,
                subject,
                message,
            }, { new: true });
            res.status(200).json({ message: "Message updated successfully" });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    // delete contact form
    static deleteContact = async (req, res) => {
        try {
            const result = await contact.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Message deleted successfully" });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal Server Error" });
        }
    }



}

module.exports = ContactController;