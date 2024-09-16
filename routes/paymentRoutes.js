const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Public Routes
router.post("/create-payment-intent", paymentController.payment);
router.get("/payments", paymentController.getAllPaymentsPaginated);
router.get("/payments/search", paymentController.searchPaymentByIntentId);
module.exports = router;
