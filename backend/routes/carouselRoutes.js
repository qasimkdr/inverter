const express = require('express');
const router = express.Router();
const carouselController = require('../controllers/carouselController');
const { protectAdminRoute } = require('../middleware/authMiddleware');

router.get('/', carouselController.getCarouselImages);
router.post('/', protectAdminRoute, carouselController.addCarouselImage);
router.delete('/:id', protectAdminRoute, carouselController.deleteCarouselImage);

module.exports = router;