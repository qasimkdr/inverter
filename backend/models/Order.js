const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true }, 
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      quantity: Number,
      price: Number,
      imageUrl: String, // ✅ store product image URL
    },
  ],
  customerDetails: {
    name: String,
    email: String,
    phone: String,
    address: String,
    state: String,
    description: String,
  },
  status: { type: String, enum: ["pending", "urgent", "completed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
