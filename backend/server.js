import 'dotenv/config';
import express from 'express';
import cloudinary from './cloudinary.js';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/products', (req, res) => {
  const productsPath = path.join(path.dirname(new URL(import.meta.url).pathname), 'data', 'products.json');
  try {
    const data = fs.readFileSync(productsPath, 'utf-8');
    const products = JSON.parse(data);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'No se pudieron cargar los productos.' });
  }
});

app.post('/api/upload', async (req, res) => {
  const { imagePath } = req.body;
  if (!imagePath) {
    return res.status(400).json({ error: 'Falta imagePath en el body.' });
  }
  try {
    const result = await cloudinary.uploader.upload(imagePath);
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: 'Error al subir la imagen.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});