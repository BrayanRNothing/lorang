import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import cloudinary from './cloudinary.js';
import fs from 'fs';
import path from 'path';
import productsRouter from './routes/products.js';
import { fileURLToPath } from 'url';
import cors from 'cors';
import mongoose from 'mongoose'; // Importar mongoose

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB Atlas
const DB_URI = process.env.MONGO_URI; // Leer la URI de la base de datos desde una variable de entorno

mongoose.connect(DB_URI)
  .then(() => {
    console.log('Conectado a MongoDB Atlas');
    // Iniciar el servidor solo si la conexión a la DB es exitosa
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB Atlas:', err);
    process.exit(1); // Salir del proceso si no se puede conectar a la DB
  });

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

