const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protectAdminRoute } = require('../middleware/authMiddleware');

router.get('/', productController.getAllProducts);
router.get('/trending', productController.getTrendingProducts);
router.post('/', protectAdminRoute, productController.createProduct);
router.put('/:id', protectAdminRoute, productController.updateProduct);
router.delete('/:id', protectAdminRoute, productController.deleteProduct);

module.exports = router;