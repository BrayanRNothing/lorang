import { useState, useEffect } from 'react';
import MultiImageUpload from './MultiImageUpload';
import { apiUrl, getProductId } from '../lib/api';

const NEWS_TYPE_OPTIONS = [
  { value: 'evento', label: 'Evento' },
  { value: 'anuncio', label: 'Anuncio' },
  { value: 'lanzamiento', label: 'Lanzamiento' },
  { value: 'comunicado', label: 'Comunicado' },
];

function inferNewsType(post) {
  if (post?.tipo) return post.tipo;
  if (post?.fechaEvento || post?.horaEvento || post?.lugar || post?.ubicacion) return 'evento';
  return 'anuncio';
}

function validateNewsPayload(payload) {
  if (!payload.titulo || !payload.resumen || !payload.contenido) {
    return 'Completa titulo, resumen y contenido del post.';
  }

  if (payload.tipo === 'evento') {
    if (!payload.fechaEvento || !payload.horaEvento) {
      return 'Para eventos, agrega fecha y hora.';
    }
    if (!payload.ubicacion && !payload.enlace) {
      return 'Para eventos, agrega ubicacion o un enlace de referencia.';
    }
  }

  return '';
}

const CATEGORIAS = [
  {
    value: 'rodamientos',
    label: 'Rodamientos',
    hint: 'Ruedas, sets y repuestos de alto rendimiento.',
  },
  {
    value: 'ropa',
    label: 'Ropa',
    hint: 'Polos, hoodies y prendas de marca.',
  },
  {
    value: 'accesorios',
    label: 'Accesorios',
    hint: 'Llaveros, stickers y otros complementos.',
  },
];

// Contenedor principal
const PageContainer = ({ children }) => (
  <div className="min-h-screen w-full bg-gradient-to-br from-neutral-950 via-black to-neutral-900 text-white p-4 sm:p-6 lg:p-8 pt-18 sm:pt-22 lg:pt-20">
    <div className="w-full">{children}</div>
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
  serverOnline,
  dbOnline,
  lastSync,
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

  const requiredChecklist = [
    { key: 'nombre', label: 'Nombre del producto', done: nombre.trim().length > 0 },
    { key: 'precio', label: 'Precio', done: String(precio).trim().length > 0 },
    { key: 'descripcion', label: 'Descripcion corta', done: descripcion.trim().length > 0 },
    { key: 'images', label: 'Al menos una imagen', done: images.length > 0 },
  ];
  const completedRequired = requiredChecklist.filter((item) => item.done).length;
  const completionPercent = Math.round((completedRequired / requiredChecklist.length) * 100);
  const selectedCategory = CATEGORIAS.find((item) => item.value === categoria);
  const lastSyncText = lastSync
    ? new Date(lastSync).toLocaleTimeString('es-PE', { hour12: false })
    : 'Sin datos';

  return (
    <div className="space-y-6 mt-2 sm:mt-3">
      {/* Header */}
      <header className="pt-1 pb-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div className="lg:col-span-4 rounded-xl border border-neutral-700 bg-neutral-900/70 px-4 py-3 flex items-center">
            <p className="text-sm md:text-base font-semibold text-amber-200 tracking-wide">Hola, Angel</p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="rounded-xl border border-neutral-700 bg-neutral-900/70 px-3 py-2.5">
              <p className="text-[11px] uppercase tracking-wide text-gray-400">Servidor</p>
              <p className={`mt-1 text-sm font-semibold ${serverOnline ? 'text-emerald-300' : 'text-red-300'}`}>
                {serverOnline ? 'Conectado' : 'Sin conexion'}
              </p>
            </div>

            <div className="rounded-xl border border-neutral-700 bg-neutral-900/70 px-3 py-2.5">
              <p className="text-[11px] uppercase tracking-wide text-gray-400">Base de datos</p>
              <p className={`mt-1 text-sm font-semibold ${dbOnline ? 'text-emerald-300' : 'text-red-300'}`}>
                {dbOnline ? 'Disponible' : 'No disponible'}
              </p>
            </div>

            <div className="rounded-xl border border-neutral-700 bg-neutral-900/70 px-3 py-2.5">
              <p className="text-[11px] uppercase tracking-wide text-gray-400">Ultima sincronizacion</p>
              <p className="mt-1 text-sm font-semibold text-sky-300">{lastSyncText}</p>
            </div>
          </div>
        </div>
      </header>

      {editMode && (
        <div className="rounded-xl border border-amber-500/60 bg-amber-900/20 p-4 animate-fade-in-up">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Modo edicion activo
              </p>
              <p className="mt-1 text-sm md:text-base text-amber-100">
                Estas editando: <span className="font-bold">{nombre || 'Producto sin nombre'}</span>
              </p>
            </div>
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-amber-500/20 text-amber-100 border border-amber-400/50 hover:bg-amber-500/30 transition-colors"
            >
              Salir de edicion
            </button>
          </div>
        </div>
      )}

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

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
        {/* Formulario */}
        <div className="lg:col-span-7 xl:col-span-7">
          <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-5 lg:p-6 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
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

          <div className="mb-4 rounded-xl border border-neutral-700 bg-neutral-800/60 p-3">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-gray-200">Estado del formulario</p>
              <p className="text-xs font-semibold text-gray-400">
                {completedRequired}/{requiredChecklist.length} completos
              </p>
            </div>
            <div className="mt-3 h-2 rounded-full bg-neutral-700">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-xs">
              {requiredChecklist.map((item) => (
                <li
                  key={item.key}
                  className={`flex items-center justify-between rounded-lg px-2 py-1.5 ${item.done ? 'bg-emerald-900/20 text-emerald-300' : 'bg-neutral-900/70 text-gray-400'}`}
                >
                  <span className="truncate pr-1">{item.label}</span>
                  <span className="font-bold">{item.done ? 'Listo' : 'Pendiente'}</span>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <section className="space-y-3 rounded-xl border border-neutral-800 bg-neutral-950/50 p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">Paso 1</p>
                <h3 className="mt-1 text-base font-bold text-white">Informacion principal</h3>
                <p className="text-xs text-gray-400">Completa los datos que veran los clientes.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className="md:col-span-3">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  maxLength={90}
                  placeholder="Ej: Rodamientos Lorang - Amistad"
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Usa un nombre claro y corto. {nombre.length}/90 caracteres.
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Precio *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                    min="0"
                    step="0.01"
                    placeholder="450"
                    className="w-full pl-8 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Ingresa solo numeros, sin comas ni texto extra.</p>
              </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Descripcion corta *
                </label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                  rows={3}
                  maxLength={240}
                  placeholder="Descripcion breve del producto..."
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 resize-none"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Resume beneficio principal y uso. {descripcion.length}/240 caracteres.
                </p>
              </div>
            </section>

            <section className="space-y-3 rounded-xl border border-neutral-800 bg-neutral-950/50 p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">Paso 2</p>
                <h3 className="mt-1 text-base font-bold text-white">Clasificacion y detalles</h3>
                <p className="text-xs text-gray-400">Ayuda a organizar mejor el catalogo.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Categoria *
                </label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                >
                  {CATEGORIAS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">{selectedCategory?.hint}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Detalles tecnicos
                </label>
                <textarea
                  value={detalles}
                  onChange={(e) => setDetalles(e.target.value)}
                  rows={3}
                  placeholder="Ej: ABEC, material, medidas, recomendaciones de uso..."
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 resize-none"
                />
                <p className="mt-1 text-xs text-gray-500">Opcional. Si lo dejas vacio, se completa automaticamente al crear.</p>
              </div>
              </div>
            </section>

            <section className="space-y-3 rounded-xl border border-neutral-800 bg-neutral-950/50 p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">Paso 3</p>
                <h3 className="mt-1 text-base font-bold text-white">Imagenes</h3>
                <p className="text-xs text-gray-400">La primera imagen sera la portada del producto.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Imagenes del Producto *
                </label>
                <MultiImageUpload
                  images={images}
                  onChange={setImages}
                  maxImages={8}
                />
                <p className="mt-3 text-xs text-gray-500">
                  Recomendado: subir imagenes en la misma proporcion para una vista mas limpia.
                </p>
              </div>
            </section>

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
            <p className="text-center text-xs text-gray-500">
              Consejo: revisa el checklist de arriba antes de guardar para evitar errores.
            </p>
          </form>
          </div>
        </div>

        {/* Lista de Productos */}
        <div className="lg:col-span-3 xl:col-span-3">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-4 lg:sticky lg:top-28">
          <h2 className="text-xl font-bold mb-4 text-white">
            Productos ({productos.length})
          </h2>

          {productos.length === 0 ? (
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-gray-500 text-lg">No hay productos aún</p>
              <p className="text-gray-600 text-sm mt-2">Agrega tu primer producto usando el formulario</p>
            </div>
          ) : (
            <div className="grid gap-3 max-h-[70vh] overflow-y-auto pr-1">
              {productos.map((p) => (
                <div
                  key={getProductId(p)}
                  className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-3 hover:border-blue-500/50 transition-all duration-300 group"
                >
                  <div className="flex gap-3">
                    {/* Imagen */}
                    <div className="flex-shrink-0">
                      <img
                        src={p.image || p.imagen}
                        alt={p.title || p.nombre}
                        className="w-16 h-16 object-cover rounded-lg bg-neutral-800"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/200x200/333/666?text=Sin+Imagen';
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-sm mb-1 truncate group-hover:text-blue-400 transition-colors">
                        {p.title || p.nombre}
                      </h3>
                      <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                        {p.description || p.descripcion}
                      </p>
                      <div className="flex items-center gap-2 text-xs flex-wrap">
                        <span className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded-lg font-semibold">
                          ${p.price || p.precio}
                        </span>
                        <span className="text-gray-500">
                          {p.category || 'Sin categoría'}
                        </span>
                        {Array.isArray(p.images) && p.images.length > 1 && (
                          <span className="text-gray-500 text-xs">
                            {p.images.length} fotos
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(p)}
                        className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                      </button>
                      <button
                        onClick={() => onDelete(getProductId(p))}
                        className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    </div>
  );
}

function NewsAdminForm({
  posts,
  onCreate,
  onUpdate,
  onDelete,
  cargando,
  error,
  exito,
}) {
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState('');
  const [titulo, setTitulo] = useState('');
  const [resumen, setResumen] = useState('');
  const [contenido, setContenido] = useState('');
  const [tipoPublicacion, setTipoPublicacion] = useState('evento');
  const [imagen, setImagen] = useState('');
  const [imagenFileName, setImagenFileName] = useState('');
  const [fechaEvento, setFechaEvento] = useState('');
  const [horaEvento, setHoraEvento] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [enlace, setEnlace] = useState('');

  const isEvent = tipoPublicacion === 'evento';

  const resetForm = () => {
    setTitulo('');
    setResumen('');
    setContenido('');
    setTipoPublicacion('evento');
    setImagen('');
    setImagenFileName('');
    setFechaEvento('');
    setHoraEvento('');
    setUbicacion('');
    setEnlace('');
    setEditMode(false);
    setEditId('');
  };

  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const compressImageToBase64 = async (file, options = {}) => {
    const { maxWidth = 1400, maxHeight = 1400, quality = 0.78 } = options;
    const rawDataUrl = await fileToBase64(file);

    const image = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = rawDataUrl;
    });

    const scale = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
    const targetWidth = Math.max(1, Math.round(image.width * scale));
    const targetHeight = Math.max(1, Math.round(image.height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return rawDataUrl;

    ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
    return canvas.toDataURL('image/jpeg', quality);
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await compressImageToBase64(file);
      setImagen(base64);
      setImagenFileName(file.name);
    } catch (err) {
      console.error('Error reading image file:', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      titulo: titulo.trim(),
      resumen: resumen.trim(),
      contenido: contenido.trim(),
      tipo: tipoPublicacion,
      imagen: imagen.trim(),
      fechaEvento,
      horaEvento,
      ubicacion: ubicacion.trim(),
      enlace: enlace.trim(),
    };

    if (editMode) {
      onUpdate(editId, payload);
    } else {
      onCreate(payload);
    }
    resetForm();
  };

  const handleEdit = (post) => {
    setEditMode(true);
    setEditId(post.id);
    setTitulo(post.titulo || '');
    setResumen(post.resumen || '');
    setContenido(post.contenido || '');
    setTipoPublicacion(inferNewsType(post));
    setImagen(post.imagen || '');
    setImagenFileName('');
    setFechaEvento(post.fechaEvento || '');
    setHoraEvento(post.horaEvento || '');
    setUbicacion(post.ubicacion || post.lugar || '');
    setEnlace(post.enlace || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const requiredChecklist = [
    { key: 'titulo', label: 'Titulo', done: titulo.trim().length > 0 },
    { key: 'resumen', label: 'Resumen', done: resumen.trim().length > 0 },
    { key: 'contenido', label: 'Contenido', done: contenido.trim().length > 0 },
    { key: 'tipo', label: 'Tipo de publicacion', done: tipoPublicacion.trim().length > 0 },
    { key: 'fechaEvento', label: 'Fecha (solo evento)', done: !isEvent || fechaEvento.trim().length > 0 },
    { key: 'horaEvento', label: 'Hora (solo evento)', done: !isEvent || horaEvento.trim().length > 0 },
    { key: 'ubicacion', label: 'Ubicacion o enlace', done: !isEvent || ubicacion.trim().length > 0 || enlace.trim().length > 0 },
  ];

  const completedRequired = requiredChecklist.filter((item) => item.done).length;
  const completionPercent = Math.round((completedRequired / requiredChecklist.length) * 100);

  return (
    <div className="space-y-6 mt-2 sm:mt-3">
      {editMode && (
        <div className="rounded-xl border border-amber-500/60 bg-amber-900/20 p-4 animate-fade-in-up">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">Modo edicion activo</p>
              <p className="mt-1 text-sm md:text-base text-amber-100">
                Estas editando: <span className="font-bold">{titulo || 'Post sin titulo'}</span>
              </p>
            </div>
            <button
              onClick={resetForm}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-amber-500/20 text-amber-100 border border-amber-400/50 hover:bg-amber-500/30 transition-colors"
            >
              Salir de edicion
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 text-center text-red-300 bg-red-900/30 border border-red-500/50 rounded-xl animate-fade-in-up">
          {error}
        </div>
      )}
      {exito && (
        <div className="p-4 text-center text-green-300 bg-green-900/30 border border-green-500/50 rounded-xl animate-fade-in-up">
          {exito}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
        <div className="lg:col-span-7 xl:col-span-7">
          <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-5 lg:p-6 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">{editMode ? 'Editar Post' : 'Nuevo Post'}</h2>
              {editMode && (
                <button onClick={resetForm} className="text-sm text-gray-400 hover:text-white transition-colors">
                  Cancelar
                </button>
              )}
            </div>

            <div className="mb-4 rounded-xl border border-neutral-700 bg-neutral-800/60 p-3">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-gray-200">Estado del formulario</p>
                <p className="text-xs font-semibold text-gray-400">
                  {completedRequired}/{requiredChecklist.length} completos
                </p>
              </div>
              <div className="mt-3 h-2 rounded-full bg-neutral-700">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 transition-all duration-300"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
              <ul className="mt-3 grid grid-cols-2 gap-2 text-xs">
                {requiredChecklist.map((item) => (
                  <li
                    key={item.key}
                    className={`flex items-center justify-between rounded-lg px-2 py-1.5 ${item.done ? 'bg-emerald-900/20 text-emerald-300' : 'bg-neutral-900/70 text-gray-400'}`}
                  >
                    <span className="truncate pr-1">{item.label}</span>
                    <span className="font-bold">{item.done ? 'Listo' : 'Pendiente'}</span>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <section className="space-y-3 rounded-xl border border-neutral-800 bg-neutral-950/50 p-4">
                <label className="block text-sm font-semibold text-gray-300 mb-2">Tipo de publicacion *</label>
                <select
                  value={tipoPublicacion}
                  onChange={(e) => setTipoPublicacion(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-white"
                >
                  {NEWS_TYPE_OPTIONS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>

                <label className="block text-sm font-semibold text-gray-300 mb-2">Titulo *</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                  maxLength={120}
                  placeholder="Ej: Sesion especial de domingo"
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-white placeholder-gray-500"
                />

                <label className="block text-sm font-semibold text-gray-300 mb-2">Resumen *</label>
                <textarea
                  value={resumen}
                  onChange={(e) => setResumen(e.target.value)}
                  required
                  rows={2}
                  maxLength={200}
                  placeholder="Texto corto para la card"
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-white placeholder-gray-500 resize-none"
                />

                <label className="block text-sm font-semibold text-gray-300 mb-2">Contenido *</label>
                <textarea
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                  required
                  rows={5}
                  placeholder="Describe el evento, horarios, requisitos y recomendaciones"
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-white placeholder-gray-500 resize-none"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      {isEvent ? 'Fecha del evento *' : 'Fecha (opcional)'}
                    </label>
                    <input
                      type="date"
                      value={fechaEvento}
                      onChange={(e) => setFechaEvento(e.target.value)}
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      {isEvent ? 'Hora del evento *' : 'Hora (opcional)'}
                    </label>
                    <input
                      type="time"
                      value={horaEvento}
                      onChange={(e) => setHoraEvento(e.target.value)}
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Ubicacion</label>
                    <input
                      type="text"
                      value={ubicacion}
                      onChange={(e) => setUbicacion(e.target.value)}
                      placeholder="Ej: Parque central"
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-white placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Enlace relevante</label>
                    <input
                      type="url"
                      value={enlace}
                      onChange={(e) => setEnlace(e.target.value)}
                      placeholder="https://maps... o link del anuncio"
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                {isEvent && (
                  <p className="text-xs text-gray-500">Para eventos, agrega fecha y hora. Tambien necesitas ubicacion o enlace.</p>
                )}

                <label className="block text-sm font-semibold text-gray-300 mb-2">Imagen del post</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-rose-600 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-rose-700"
                />
                {imagenFileName && (
                  <p className="text-xs text-gray-400">Imagen cargada y optimizada: {imagenFileName}</p>
                )}

                <p className="text-xs text-gray-500">Tambien puedes pegar una URL si prefieres no subir archivo.</p>
                <input
                  type="url"
                  value={imagen}
                  onChange={(e) => {
                    setImagen(e.target.value);
                    setImagenFileName('');
                  }}
                  placeholder="https://..."
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-white placeholder-gray-500"
                />

                {imagen && (
                  <div className="rounded-xl border border-neutral-700 bg-neutral-900/70 p-3">
                    <p className="text-xs text-gray-400 mb-2">Vista previa</p>
                    <img
                      src={imagen}
                      alt="Vista previa"
                      className="w-full max-h-56 object-cover rounded-lg bg-neutral-800"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </section>

              <button
                type="submit"
                disabled={cargando}
                className="w-full py-4 text-lg font-bold text-white bg-gradient-to-r from-rose-600 to-orange-500 rounded-xl hover:from-rose-700 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-rose-500/30"
              >
                {cargando ? 'Guardando...' : editMode ? 'Actualizar Post' : 'Publicar Post'}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-3 xl:col-span-3">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-4 lg:sticky lg:top-28">
            <h2 className="text-xl font-bold mb-4 text-white">Posts ({posts.length})</h2>

            {posts.length === 0 ? (
              <div className="rounded-2xl p-5 text-center border border-neutral-800 bg-neutral-900/50">
                <p className="text-gray-400">Aun no hay noticias publicadas</p>
                <p className="text-gray-500 text-sm mt-2">Crea tu primer post desde el formulario</p>
              </div>
            ) : (
              <div className="grid gap-3 max-h-[70vh] overflow-y-auto pr-1">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-3 hover:border-rose-500/40 transition-all duration-300"
                  >
                    {post.imagen && (
                      <img
                        src={post.imagen}
                        alt={post.titulo}
                        className="w-full h-28 object-cover rounded-lg bg-neutral-800 mb-3"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <h3 className="font-bold text-white text-sm mb-1 line-clamp-1">{post.titulo}</h3>
                    <p className="text-xs text-gray-400 mb-2 line-clamp-2">{post.resumen}</p>
                    <div className="text-[11px] text-gray-500 mb-2">
                      <p className="capitalize">{post.tipo || inferNewsType(post)}</p>
                      {post.fechaEvento && <p>{post.fechaEvento}</p>}
                      {post.horaEvento && <p>{post.horaEvento}</p>}
                      {(post.ubicacion || post.lugar) && <p>{post.ubicacion || post.lugar}</p>}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="flex-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onDelete(post.id)}
                        className="flex-1 px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente Principal con Autenticación
export default function AdminProtegido() {
  const [activeTab, setActiveTab] = useState('productos');
  const [autorizado, setAutorizado] = useState(false);
  const [clave, setClave] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [newsError, setNewsError] = useState('');
  const [newsExito, setNewsExito] = useState('');
  const [posts, setPosts] = useState([]);
  const [serverOnline, setServerOnline] = useState(false);
  const [dbOnline, setDbOnline] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  // Cargar productos desde el backend
  useEffect(() => {
    const loadProducts = async () => {
      setCargando(true);
      try {
        const response = await fetch(apiUrl('/api/products'));
        if (!response.ok) throw new Error('Error al cargar productos');
        const data = await response.json();
        setProductos(data);
        setServerOnline(true);
        setDbOnline(true);
        setLastSync(new Date().toISOString());
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Error al conectar con el servidor');
        setServerOnline(false);
        setDbOnline(false);
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

  useEffect(() => {
    if (!autorizado) return;
    const loadNews = async () => {
      try {
        const response = await fetch(apiUrl('/api/news'));
        if (!response.ok) throw new Error('Error al cargar noticias');
        const data = await response.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error loading news:', err);
        setNewsError('No se pudieron cargar las noticias del servidor.');
      }
    };

    loadNews();
  }, [autorizado]);

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
      setServerOnline(true);
      setDbOnline(true);
      setLastSync(new Date().toISOString());
    } catch (err) {
      setError('Fallo al eliminar el producto del servidor.');
      setServerOnline(false);
      setDbOnline(false);
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
      setServerOnline(true);
      setDbOnline(true);
      setLastSync(new Date().toISOString());
    } catch (err) {
      setError('Error al actualizar el producto: ' + err.message);
      setServerOnline(false);
      setDbOnline(false);
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
      setServerOnline(true);
      setDbOnline(true);
      setLastSync(new Date().toISOString());
    } catch (err) {
      setError('Error al agregar el producto: ' + err.message);
      setServerOnline(false);
      setDbOnline(false);
    } finally {
      setCargando(false);
    }
  };

  const handleCreatePost = async (payload) => {
    setNewsError('');
    setNewsExito('');

    const validationError = validateNewsPayload(payload);
    if (validationError) {
      setNewsError(validationError);
      return;
    }

    setCargando(true);

    try {
      const response = await fetch(apiUrl('/api/news'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Error al crear el post');
      }

      setPosts((current) => [data, ...current]);
      setNewsExito('Post publicado con exito.');
    } catch (err) {
      setNewsError(err.message || 'No se pudo publicar el post.');
    } finally {
      setCargando(false);
    }
  };

  const handleUpdatePost = async (id, payload) => {
    setNewsError('');
    setNewsExito('');

    const validationError = validateNewsPayload(payload);
    if (validationError) {
      setNewsError(validationError);
      return;
    }

    setCargando(true);

    try {
      const response = await fetch(apiUrl(`/api/news/${id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Error al actualizar el post');
      }

      setPosts((current) => current.map((post) => (String(post.id) === String(id) ? data : post)));
      setNewsExito('Post actualizado correctamente.');
    } catch (err) {
      setNewsError(err.message || 'No se pudo actualizar el post.');
    } finally {
      setCargando(false);
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('Seguro que quieres eliminar este post?')) return;

    setCargando(true);
    setNewsError('');
    setNewsExito('');

    try {
      const response = await fetch(apiUrl(`/api/news/${id}`), {
        method: 'DELETE',
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Error al eliminar el post');
      }

      setPosts((current) => current.filter((post) => String(post.id) !== String(id)));
      setNewsExito('Post eliminado correctamente.');
    } catch (err) {
      setNewsError(err.message || 'No se pudo eliminar el post.');
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
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('productos')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
            activeTab === 'productos'
              ? 'bg-blue-600 text-white border-blue-500'
              : 'bg-neutral-900/60 text-gray-300 border-neutral-700 hover:border-blue-500/50'
          }`}
        >
          Productos
        </button>
        <button
          onClick={() => setActiveTab('noticias')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
            activeTab === 'noticias'
              ? 'bg-rose-600 text-white border-rose-500'
              : 'bg-neutral-900/60 text-gray-300 border-neutral-700 hover:border-rose-500/50'
          }`}
        >
          Noticias
        </button>
      </div>

      {activeTab === 'productos' ? (
        <AdminForm
          productos={productos}
          onFormSubmit={handleSubmit}
          onDelete={handleDelete}
          onEdit={handleEdit}
          error={error}
          exito={exito}
          cargando={cargando}
          serverOnline={serverOnline}
          dbOnline={dbOnline}
          lastSync={lastSync}
        />
      ) : (
        <NewsAdminForm
          posts={posts}
          onCreate={handleCreatePost}
          onUpdate={handleUpdatePost}
          onDelete={handleDeletePost}
          cargando={cargando}
          error={newsError}
          exito={newsExito}
        />
      )}
    </PageContainer>
  );
}
