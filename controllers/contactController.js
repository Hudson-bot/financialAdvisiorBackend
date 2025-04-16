const Contact = require("../models/contact");

const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, Email & Message are required." });
    }

    const newContact = new Contact({ name, email, subject, phone, message });
    await newContact.save();

    res.status(201).json({ message: "Contact form submitted successfully ✅" });
  } catch (error) {
    console.error("Contact submission error:", error.message);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};

module.exports = { submitContactForm };
