const Product = require('../models/product');

exports.getProductByQRCode = async (req, res) => {
  try {
    const { qrCode } = req.params;
    const product = await Product.findOne({ qrCode });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getProductDetails = async (req, res) => {
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
};
