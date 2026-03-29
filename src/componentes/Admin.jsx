import { useState, useEffect } from 'react';
import MultiImageUpload from './MultiImageUpload';
import { apiUrl, getProductId } from '../lib/api';

// Contenedor principal
const PageContainer = ({ children }) => (
  <div className="min-h-screen w-full bg-gradient-to-br from-neutral-950 via-black to-neutral-900 text-white p-4 sm:p-6 lg:p-8 pt-20">
    <div className="max-w-7xl mx-auto">{children}</div>
  </div>
);

// Formulario de Administración
function AdminForm({
  productos,
  onFormSubmit,
  onDelete,
  onEdit,
  error,
  exito,
  cargando,
}) {
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [images, setImages] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [detalles, setDetalles] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('rodamientos');

  const handleEdit = (producto) => {
    setEditMode(true);
    setEditId(getProductId(producto));
    setNombre(producto.title || producto.nombre || '');
    setDescripcion(producto.description || producto.descripcion || '');
    setDetalles(producto.details || '');
    setPrecio(producto.price || producto.precio || '');
    setCategoria(producto.category || 'rodamientos');

    // Cargar imágenes existentes
    const existingImages = [];
    if (producto.image || producto.imagen) {
      existingImages.push({ url: producto.image || producto.imagen, isNew: false });
    }
    if (Array.isArray(producto.images) && producto.images.length > 0) {
      producto.images.forEach(img => {
        if (img && img !== (producto.image || producto.imagen)) {
          existingImages.push({ url: img, isNew: false });
        }
      });
    }
    setImages(existingImages);

    // Scroll al formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditId(null);
    resetForm();
  };

  const resetForm = () => {
    setNombre('');
    setDescripcion('');
    setDetalles('');
    setPrecio('');
    setCategoria('rodamientos');
    setImages([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      nombre,
      descripcion,
      detalles,
      precio,
      categoria,
      images
    };

    if (editMode) {
      onEdit({ id: editId, ...productData });
    } else {
      onFormSubmit(e, productData);
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="py-4">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Panel Admin
              </span>
            </h1>
            <p className="mt-3 text-gray-400 text-base md:text-lg">
              Administra los productos de Lorang
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-green-900/30 text-green-300 border border-green-700/40">
              POSTGRESQL (BASE64)
            </span>
          </div>
        </div>
      </header>

      {/* Alertas */}
      {error && (
        <div className="p-4 text-center text-red-300 bg-red-900/30 border border-red-500/50 rounded-xl animate-fade-in-up">
          <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}
      {exito && (
        <div className="p-4 text-center text-green-300 bg-green-900/30 border border-green-500/50 rounded-xl animate-fade-in-up">
          <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {exito}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="lg:col-span-1 bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {editMode ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            {editMode && (
              <button
                onClick={handleCancelEdit}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Nombre del Producto *
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                placeholder="Ej: Rodamientos Lorang - Amistad"
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Precio *
              </label>
              <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
                min="0"
                step="0.01"
                placeholder="450"
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Descripción corta *
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
                rows={3}
                placeholder="Descripción breve del producto..."
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Detalles técnicos
              </label>
              <textarea
                value={detalles}
                onChange={(e) => setDetalles(e.target.value)}
                rows={2}
                placeholder="Especificaciones técnicas, ABEC, materiales..."
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Categoría *
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              >
                <option value="rodamientos">Rodamientos</option>
                <option value="ropa">Ropa</option>
                <option value="accesorios">Accesorios</option>
              </select>
            </div>

            <div className="border-t border-neutral-700 pt-5">
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Imágenes del Producto *
              </label>
              <MultiImageUpload
                images={images}
                onChange={setImages}
                maxImages={8}
              />
              <p className="mt-3 text-xs text-gray-500">
                📸 La primera imagen será la principal. Arrastra para reordenar (próximamente).
              </p>
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
            >
              {cargando ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Procesando...
                </span>
              ) : (
                editMode ? 'Actualizar Producto' : 'Agregar Producto'
              )}
            </button>
          </form>
        </div>

        {/* Lista de Productos */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Productos ({productos.length})
          </h2>

          {productos.length === 0 ? (
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-12 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-gray-500 text-lg">No hay productos aún</p>
              <p className="text-gray-600 text-sm mt-2">Agrega tu primer producto usando el formulario</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {productos.map((p) => (
                <div
                  key={getProductId(p)}
                  className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-4 hover:border-blue-500/50 transition-all duration-300 group"
                >
                  <div className="flex gap-4">
                    {/* Imagen */}
                    <div className="flex-shrink-0">
                      <img
                        src={p.image || p.imagen}
                        alt={p.title || p.nombre}
                        className="w-24 h-24 object-cover rounded-xl bg-neutral-800"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/200x200/333/666?text=Sin+Imagen';
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-lg mb-1 truncate group-hover:text-blue-400 transition-colors">
                        {p.title || p.nombre}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                        {p.description || p.descripcion}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-lg font-semibold">
                          ${p.price || p.precio}
                        </span>
                        <span className="text-gray-500">
                          {p.category || 'Sin categoría'}
                        </span>
                        {Array.isArray(p.images) && p.images.length > 1 && (
                          <span className="text-gray-500 text-xs">
                            📸 {p.images.length} fotos
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(p)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                      </button>
                      <button
                        onClick={() => onDelete(getProductId(p))}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Componente Principal con Autenticación
export default function AdminProtegido() {
  const [autorizado, setAutorizado] = useState(false);
  const [clave, setClave] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  // Cargar productos desde el backend
  useEffect(() => {
    const loadProducts = async () => {
      setCargando(true);
      try {
        const response = await fetch(apiUrl('/api/products'));
        if (!response.ok) throw new Error('Error al cargar productos');
        const data = await response.json();
        setProductos(data);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Error al conectar con el servidor');
      } finally {
        setCargando(false);
      }
    };

    if (autorizado) {
      loadProducts();
    }
  }, [autorizado]);

  // Verificar autorización
  useEffect(() => {
    const autorizadoLS = localStorage.getItem('autorizado');
    if (autorizadoLS === 'true') setAutorizado(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (clave === 'lorang200') {
      setAutorizado(true);
      localStorage.setItem('autorizado', 'true');
    } else {
      setLoginError(true);
      setClave('');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este producto?')) return;
    setError('');
    setExito('');

    try {
      const response = await fetch(apiUrl(`/api/products/${id}`), {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar');

      setProductos(productos.filter((p) => getProductId(p) !== String(id)));
      setExito('Producto eliminado correctamente.');
    } catch (err) {
      setError('Fallo al eliminar el producto del servidor.');
    }
  };

  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const handleEdit = async ({ id, nombre, descripcion, detalles, precio, categoria, images }) => {
    setError('');
    setExito('');
    setCargando(true);

    try {
      // Procesar imágenes: convertir archivos nuevos a base64 y mantener las existentes
      const uploadedImages = [];

      for (const img of images) {
        if (img.file) {
          const base64Image = await fileToBase64(img.file);
          uploadedImages.push(base64Image);
        } else if (img.url) {
          uploadedImages.push(img.url);
        } else if (typeof img === 'string') {
          uploadedImages.push(img);
        }
      }

      if (uploadedImages.length === 0) {
        setError('Debes agregar al menos una imagen');
        setCargando(false);
        return;
      }

      const productBody = {
        nombre,
        descripcion,
        detalles,
        precio: precio.toString(),
        category: categoria,
        imagen: uploadedImages[0], // Primera imagen como principal
        images: uploadedImages,
      };

      const response = await fetch(apiUrl(`/api/products/${id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productBody),
      });

      if (!response.ok) throw new Error('Error al actualizar');
      const updatedProduct = await response.json();

      setProductos(productos.map(p => getProductId(p) === String(id) ? updatedProduct : p));
      setExito('Producto actualizado con éxito.');
    } catch (err) {
      setError('Error al actualizar el producto: ' + err.message);
    } finally {
      setCargando(false);
    }
  };

  const handleSubmit = async (e, { nombre, descripcion, detalles, precio, categoria, images }) => {
    e.preventDefault();
    setError('');
    setExito('');

    if (!nombre || !descripcion || !precio) {
      setError('Faltan campos obligatorios (nombre, descripción, precio)');
      return;
    }

    if (!images || images.length === 0) {
      setError('Debes agregar al menos una imagen');
      return;
    }

    setCargando(true);

    try {
      // Procesar imágenes: convertir archivos nuevos a base64 y mantener las existentes
      const uploadedImages = [];

      for (const img of images) {
        if (img.file) {
          const base64Image = await fileToBase64(img.file);
          uploadedImages.push(base64Image);
        } else if (img.url) {
          uploadedImages.push(img.url);
        } else if (typeof img === 'string') {
          uploadedImages.push(img);
        }
      }

      const productBody = {
        nombre,
        descripcion,
        detalles: detalles || `ABEC 9. ${descripcion}`,
        imagen: uploadedImages[0], // Primera imagen como principal
        images: uploadedImages,
        precio: precio.toString(),
        category: categoria,
      };

      const response = await fetch(apiUrl('/api/products'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productBody),
      });

      if (!response.ok) throw new Error('Error al crear producto');
      const newProduct = await response.json();

      setProductos([...productos, newProduct]);
      setExito('Producto agregado con éxito.');
    } catch (err) {
      setError('Error al agregar el producto: ' + err.message);
    } finally {
      setCargando(false);
    }
  };

  if (!autorizado) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-900">
        <div className="w-full max-w-md mx-auto p-8">
          <form onSubmit={handleLogin} className="space-y-6 bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8">
            <div className="text-center">
              <h2 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Admin Lorang
              </h2>
              <p className="mt-2 text-gray-400">Ingresa la contraseña</p>
            </div>

            <div>
              <input
                type="password"
                placeholder="Contraseña"
                value={clave}
                onChange={(e) => {
                  setClave(e.target.value);
                  setLoginError(false);
                }}
                className={`w-full px-4 py-3 bg-neutral-800 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white ${loginError ? 'border-red-500' : 'border-neutral-700'
                  }`}
              />
            </div>

            {loginError && (
              <p className="text-sm text-center text-red-400">Contraseña incorrecta</p>
            )}

            <button className="w-full py-3 font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg">
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <PageContainer>
      <AdminForm
        productos={productos}
        onFormSubmit={handleSubmit}
        onDelete={handleDelete}
        onEdit={handleEdit}
        error={error}
        exito={exito}
        cargando={cargando}
      />
    </PageContainer>
  );
}
