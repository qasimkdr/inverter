const Order = require('../models/Order');

// Function to generate a unique 6-digit number
const generateOrderId = async () => {
  let orderId;
  let existingOrder;
  do {
    orderId = Math.floor(100000 + Math.random() * 900000).toString();
    existingOrder = await Order.findOne({ orderId });
  } while (existingOrder); // regenerate if duplicate
  return orderId;
};

// Place a new order (for customers without login)
exports.placeOrder = async (req, res) => {
  try {
    const { items, customerDetails } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must include at least one item" });
    }

    const orderId = await generateOrderId();

    const newOrder = new Order({
      orderId,
      items,
      customerDetails,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ message: "Server error placing order" });
  }
};

// Fetch all orders (Admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ message: "Server error fetching orders" });
  }
};

// Fetch only pending orders (Admin only)
exports.getPendingOrders = async (req, res) => {
  try {
    const pendingOrders = await Order.find({ status: "pending" }).sort({ createdAt: -1 });
    res.json(pendingOrders);
  } catch (err) {
    console.error("❌ Error fetching pending orders:", err);
    res.status(500).json({ message: "Server error fetching pending orders" });
  }
};

// Mark an order as complete (Admin only)
exports.markOrderComplete = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    console.error("❌ Error marking order complete:", err);
    res.status(400).json({ message: "Failed to mark order complete" });
  }
};

// Mark an order as urgent (Admin only)
exports.markOrderUrgent = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "urgent" },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    console.error("❌ Error marking order urgent:", err);
    res.status(400).json({ message: "Failed to mark order urgent" });
  }
};
