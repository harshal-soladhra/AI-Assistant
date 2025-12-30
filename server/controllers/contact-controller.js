import Contact from "../models/contact-model.js";

// contact controller
const contact = async (req, res, next) => {
  try {
    const response = req.body;

    await Contact.create(response);

    // ✅ RETURN JSON (IMPORTANT)
    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully"
    });

  } catch (error) {
    next(error);
  }
};


export default { contact };
