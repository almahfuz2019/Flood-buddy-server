const Contact = require("../models/ContactModel");

// Get all contacts with pagination
exports.getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10
    const skip = (page - 1) * limit;

    const contacts = await Contact.find()
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    const totalContacts = await Contact.countDocuments();

    res.status(200).json({ totalContacts, contacts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single contact by ID
exports.getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Contact ID is required" });
    }
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new contact
exports.createContact = async (req, res) => {
  try {
    const { email, message } = req.body;
    console.log(req.body);

    if (!email || !message) {
      return res.status(400).json({ error: "email, and message are required" });
    }
    // Create a new contact
    const contact = new Contact({ email, message });
    await contact.save();
    res.status(201).json({ message: "Contact created successfully", contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a contact by ID
exports.deleteContactById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Contact ID is required" });
    }

    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update an existing contact by ID
// Toggle the read status of a contact
exports.toggleReadStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the contact by ID
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    // Toggle the read status
    contact.read = !contact.read;
    await contact.save();

    res.status(200).json({ message: "Read status toggled", contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Count total contacts
exports.countContacts = async (req, res) => {
  try {
    const count = await Contact.countDocuments();
    res.status(200).json({ totalContacts: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search contacts by name or email
// Search contacts by email
exports.searchContacts = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const skip = (page - 1) * limit;
    const regex = new RegExp(query, "i"); // Case-insensitive search

    // Search contacts by email
    const contacts = await Contact.find({ email: regex })
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    // Count the total number of matching contacts
    const totalContacts = await Contact.countDocuments({ email: regex });

    res.status(200).json({ totalContacts, contacts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
