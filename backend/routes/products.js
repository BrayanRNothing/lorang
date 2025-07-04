const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// GET /api/products - Obtener todos los productos
router.get('/', (req, res) => {
  const productsPath = path.join(__dirname, '..', 'data', 'products.json');
  try {
    const data = fs.readFileSync(productsPath, 'utf-8');
    const products = JSON.parse(data);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'No se pudieron cargar los productos.' });
  }
});

module.exports = router;