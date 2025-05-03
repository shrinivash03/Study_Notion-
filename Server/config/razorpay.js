const Razorpay = require("razorpay");
require("dotenv").config();

// Optional: debug logs
// console.log("key_id:", process.env.RAZORPAY_KEY_ID);
// console.log("key_secret:", process.env.RAZORPAY_KEY_SECRET);

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = instance;
