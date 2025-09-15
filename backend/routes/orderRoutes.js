const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protectAdminRoute } = require('../middleware/authMiddleware');

router.post('/', orderController.placeOrder);
router.get('/admin', protectAdminRoute, orderController.getAllOrders);
router.get('/admin/pending', protectAdminRoute, orderController.getPendingOrders);
router.put('/admin/:id/complete', protectAdminRoute, orderController.markOrderComplete);
router.put('/admin/:id/urgent', protectAdminRoute, orderController.markOrderUrgent);

module.exports = router;