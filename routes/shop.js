const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();


router.get('/', shopController.getIndex);
router.get('/products', shopController.getProduct);
router.get('/product/:productId', shopController.getProductId);
router.get('/orders', shopController.getOrders);
router.get('/cart', shopController.getCart);
router.get('/check-out', shopController.getCheckOut);

module.exports = router;