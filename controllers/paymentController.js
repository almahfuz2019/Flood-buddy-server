const Stripe = require("stripe");
const Payment = require("../models/paymentModel"); // Import the Payment model

// Replace with your Secret Key from the Stripe dashboard
const stripe = Stripe(
  "sk_test_51PzB0X04pq12kJOGOQRh1ury3fXZOKffEIysqo7hyNrsjZIN5K68YicbiT1PyjT5e4NbaXRTLPh9LqgSg6vV3eXg00jvMmnu5d",
);

// Endpoint to create a PaymentIntent and store the data in MongoDB
exports.payment = async (req, res) => {
  const { amount } = req.body; // Example amount passed from the client in cents (e.g., 1000 = $10.00)

  try {
    // Create a PaymentIntent with the specified amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount should be passed in cents
      currency: "usd", // Currency, e.g., USD
    });

    // Save payment details in the database
    const newPayment = new Payment({
      amount: amount,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
    });

    // Save the new payment in the database
    await newPayment.save();

    // Return the clientSecret to the client
    res.send({
      clientSecret: paymentIntent.client_secret, // Send this to the frontend
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
// Endpoint to get all payments with pagination
exports.getAllPaymentsPaginated = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default page = 1, limit = 10
    const skip = (page - 1) * limit;

    // Fetch paginated payments from the database
    const payments = await Payment.find().skip(skip).limit(parseInt(limit));

    // Get total payment count
    const totalPayments = await Payment.countDocuments();

    res.status(200).json({
      payments,
      totalPayments,
      totalPages: Math.ceil(totalPayments / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Search payments by Payment Intent ID
exports.searchPaymentByIntentId = async (req, res) => {
  try {
    const { paymentIntentId } = req.query;

    if (!paymentIntentId) {
      return res.status(400).json({ error: "Payment Intent ID is required" });
    }

    const payment = await Payment.findOne({ paymentIntentId });

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json({ payment });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
