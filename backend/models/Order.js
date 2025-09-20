const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true }, // Add this new field
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    quantity: Number,
    price: Number,
  }],
  customerDetails: {
    name: String,
    email: String,
    phone: String,
    address: String,
    state: String,
    description: String,
  },
  status: { type: String, enum: ['pending', 'urgent', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
