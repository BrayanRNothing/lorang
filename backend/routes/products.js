import { Router } from 'express';
import Product from '../models/Product.js'; // Importar el modelo Product
import { findAll, findById, create as createLocal, removeById } from '../services/localProducts.js';

const router = Router();
const MODE = process.env.DATA_MODE || 'mongo'; // 'mongo' | 'local'

// Endpoint de salud y modo actual (debe ir ANTES de '/:id')
router.get('/__mode', (req, res) => {
  res.json({ mode: MODE });
});

// GET /api/products
router.get('/', async (req, res) => {
  try {
    if (MODE === 'local') {
      const productos = await findAll();
      return res.json(productos);
    }
    const productos = await Product.find();
    res.json(productos);
  } catch (err) {
    console.error('Error al leer productos:', err);
    res.status(500).json({ error: 'Error al leer productos' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (MODE === 'local') {
      const producto = await findById(id);
      if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
      return res.json(producto);
    }
    const producto = await Product.findById(id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    console.error('Error al buscar el producto:', err);
    res.status(500).json({ error: 'Error al buscar el producto' });
  }
});

// POST /api/products
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, precio, imagen, images, category } = req.body;

    if (!nombre || !descripcion || !precio || !imagen) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    if (MODE === 'local') {
      const nuevo = await createLocal({ nombre, descripcion, precio, imagen, images, category });
      return res.status(201).json(nuevo);
    }

    const nuevoProducto = new Product({
      nombre,
      descripcion,
      precio,
      imagen,
      images: images || [imagen],
      category: category || 'all'
    });

    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (err) {
    console.error('Error al guardar el producto:', err);
    res.status(500).json({ error: 'Error al guardar el producto' });
  }
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (MODE === 'local') {
      const ok = await removeById(id);
      if (!ok) return res.status(404).json({ error: 'Producto no encontrado' });
      return res.json({ success: true, message: 'Producto eliminado correctamente' });
    }
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ success: true, message: 'Producto eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar el producto:', err);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});


export default router;