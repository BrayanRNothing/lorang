import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import cloudinary from './cloudinary.js';
import fs from 'fs';
import path from 'path';
import productsRouter from './routes/products.js'; // Asegúrate de este import
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer (para archivos temporales)
const upload = multer({ dest: 'uploads/' });

// Ruta para subir imágenes a Cloudinary
app.post('/api/upload', upload.single('imagen'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const result = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath);
    res.json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al subir la imagen.' });
  }
});

// Ruta para productos
app.use('/api/products', productsRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
