import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import cloudinary from './cloudinary.js';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configuración de multer: guardará archivos temporales en carpeta 'uploads'
const upload = multer({ dest: 'uploads/' });

// Ruta para obtener productos (igual que antes)
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

// Ruta para subir imagen usando multer y luego subirla a Cloudinary
app.post('/api/upload', upload.single('imagen'), async (req, res) => {
  try {
    // req.file.path tiene la ruta temporal de la imagen subida
    const filePath = req.file.path;

    // Subir a Cloudinary
    const result = await cloudinary.uploader.upload(filePath);

    // Borrar el archivo temporal local luego de subirlo a Cloudinary
    fs.unlinkSync(filePath);

    res.json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al subir la imagen.' });
  }
});

// Aquí van tus otras rutas, por ejemplo la de productos POST para guardar nuevos productos

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
