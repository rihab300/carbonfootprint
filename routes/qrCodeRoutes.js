const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Middleware pour la numérisation des codes QR
const handleQRCode = (req, res, next) => {
  const { productId } = req.query; // On suppose que le code QR fournit l'identifiant du produit
  
  // Récupération des détails du produit en fonction de l'identifiant du produit extrait
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: 'Produit introuvable' });
      }
      req.product = product; // Attacher le produit à l'objet de requête (request object)
      next(); // Continuer vers le middleware ou le gestionnaire de routes suivant
    })
    .catch((error) => {
      res.status(500).json({ error: 'Erreur interne du serveur' });
    });
};

// Endpoint pour gérer la numérisation des codes QR
router.get('/scan', handleQRCode, (req, res) => {
  res.status(200).json({ product: req.product });
});

// Endpoint pour afficher les informations détaillées du produit
router.get('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produit introuvable' });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

module.exports = router;

