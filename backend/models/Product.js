import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true
  },
  precio: {
    type: String, // Lo mantenemos como String para coincidir con tu JSON
    required: true
  },
  imagen: {
    type: String,
    required: true
  },
  images: {
    type: [String], // Array de URLs de imágenes
    default: function() { return [this.imagen]; } // Por defecto, contiene solo la imagen principal
  },
  category: {
    type: String,
    required: true,
    default: 'all'
  }
}, {
  // Opciones del esquema para incluir timestamps y configurar la salida JSON
  timestamps: true, // Agrega createdAt y updatedAt automáticamente
  toJSON: {
    virtuals: true, // Asegura que los campos virtuales se incluyan en el JSON
    transform: (doc, ret) => {
      // Transforma el _id de MongoDB a un campo `id` como en tu JSON original
      ret.id = ret._id.toString();
      delete ret._id; // Elimina el _id original
      delete ret.__v; // Elimina el campo de versión de Mongoose
    }
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
