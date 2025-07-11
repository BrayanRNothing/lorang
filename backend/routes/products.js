import { Router } from 'express';
import fs from 'fs';
import path from 'path';4
import { fileURLToPath } from 'url';

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '../data/products.json');

// Asegurar que el archivo exista
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '[]', 'utf-8');
}

// GET /api/products
router.get('/', (req, res) => {
  try {
    const productos = JSON.parse(fs.readFileSync(filePath));
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error al leer productos' });
  }
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  try {
    const productos = JSON.parse(fs.readFileSync(filePath));
    const id = req.params.id;
    const producto = productos.find(p => String(p.id) === String(id));
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar el producto' });
  }
});

// POST /api/products
router.post('/', (req, res) => {
  try {
    const { nombre, descripcion, precio, imagen, category } = req.body;

    if (!nombre || !descripcion || !precio || !imagen) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const productos = JSON.parse(fs.readFileSync(filePath));
    const nuevoProducto = {
      id: Date.now(),
      nombre,
      descripcion,
      precio,
      imagen,
      category: category || 'all'
    };

    productos.push(nuevoProducto);
    fs.writeFileSync(filePath, JSON.stringify(productos, null, 2));
    res.status(201).json(nuevoProducto);
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar el producto' });
  }
});

// DELETE /api/products/:id
router.delete('/:id', (req, res) => {
  try {
    const productos = JSON.parse(fs.readFileSync(filePath));
    const id = req.params.id;
    const nuevosProductos = productos.filter(p => String(p.id) !== String(id));
    if (productos.length === nuevosProductos.length) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    fs.writeFileSync(filePath, JSON.stringify(nuevosProductos, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

export default router;
