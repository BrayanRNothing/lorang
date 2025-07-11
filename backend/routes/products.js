import { Router } from 'express';
import Product from '../models/Product.js'; // Importar el modelo Product

const router = Router();

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const productos = await Product.find(); // Usar Mongoose para encontrar todos los productos
    res.json(productos);
  } catch (err) {
    console.error('Error al leer productos de la DB:', err);
    res.status(500).json({ error: 'Error al leer productos' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const producto = await Product.findById(id); // Usar Mongoose para encontrar por ID
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (err) {
    console.error('Error al buscar el producto en la DB:', err);
    res.status(500).json({ error: 'Error al buscar el producto' });
  }
});

// POST /api/products
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, precio, imagen, category } = req.body;

    if (!nombre || !descripcion || !precio || !imagen) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevoProducto = new Product({
      nombre,
      descripcion,
      precio,
      imagen,
      category: category || 'all'
    });

    await nuevoProducto.save(); // Usar Mongoose para guardar el nuevo producto
    res.status(201).json(nuevoProducto);
  } catch (err) {
    console.error('Error al guardar el producto en la DB:', err);
    res.status(500).json({ error: 'Error al guardar el producto' });
  }
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.findByIdAndDelete(id); // Usar Mongoose para eliminar por ID
    if (!result) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ success: true, message: 'Producto eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar el producto de la DB:', err);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

export default router;