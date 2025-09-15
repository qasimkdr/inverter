const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  const { items, customerDetails } = req.body;
  const newOrder = new Order({ items, customerDetails });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPendingOrders = async (req, res) => {
  try {
    const pendingOrders = await Order.find({ status: 'pending' }).sort({ createdAt: -1 });
    res.json(pendingOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.markOrderComplete = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.markOrderUrgent = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: 'urgent' }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};