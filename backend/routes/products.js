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

export default router;
