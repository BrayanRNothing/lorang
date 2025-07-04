import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '../data/products.json');

router.get('/', (req, res) => {
  const productos = JSON.parse(fs.readFileSync(filePath));
  res.json(productos);
});

router.post('/', (req, res) => {
  const productos = JSON.parse(fs.readFileSync(filePath));
  const nuevoProducto = {
    id: Date.now(),
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    imagen: req.body.imagen,
  };

  productos.push(nuevoProducto);
  fs.writeFileSync(filePath, JSON.stringify(productos, null, 2));
  res.status(201).json(nuevoProducto);
});

export default router;
