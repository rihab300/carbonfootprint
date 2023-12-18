const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const productController = require('../controllers/productControllers');

// Middleware to handle QR code scanning
const handleQRCode = (req, res, next) => {
  const { productId } = req.query;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      req.product = product;
      next();
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// QR code scanning endpoint
router.get('/scan', handleQRCode, (req, res) => {
  res.status(200).json({ product: req.product });
});

// Display detailed product information endpoint
router.get('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
//getproduct details based on id
router.get('/:productId', productController.getProductDetails);


module.exports = router;
