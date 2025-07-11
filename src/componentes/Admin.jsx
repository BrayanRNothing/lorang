import { useState, useEffect } from 'react';

// Contenedor principal de la página de administración
const PageContainer = ({ children }) => (
  <div className="min-h-screen w-full bg-neutral-950 text-white p-4 sm:p-6 lg:p-8">
    <div className="max-w-7xl mx-auto">{children}</div>
  </div>
);

// Formulario de Administración y Lista de Productos (Componente Hijo)
function AdminForm({
  productos,
  onFormSubmit,
  onDelete,
  error,
  exito,
  cargando,
}) {
  const [imagen, setImagen] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [etiqueta, setEtiqueta] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(e, { nombre, descripcion, precio, etiqueta, imagen });
    // Limpiar formulario si no hay error
    if (error) return;
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setEtiqueta('');
    setImagen(null);
    e.target.reset();
  };

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">Bienvenido Angel</h1>
        <p className="mt-2 text-neutral-400">Agrega, edita o elimina productos de la tienda.</p>
      </header>

      {/* Alertas */}
      {error && (
        <div className="p-4 text-center text-red-300 bg-red-900/30 border border-red-500/50 rounded-lg">
          {error}
        </div>
      )}
      {exito && (
        <div className="p-4 text-center text-green-300 bg-green-900/30 border border-green-500/50 rounded-lg">
          {exito}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Columna del Formulario */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-semibold">Agregar Nuevo Producto</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <label className="block">
              <span className="font-medium text-neutral-300">Imagen</span>
              <input type="file" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} required className="block w-full text-sm mt-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-blue-600/20 file:text-blue-300 hover:file:bg-blue-600/30 text-neutral-400"/>
            </label>
            <label className="block">
              <span className="font-medium text-neutral-300">Nombre</span>
              <input type="text" placeholder="Ej: Tabla de Skate Pro" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="w-full px-4 py-2 mt-2 bg-neutral-800 border-2 border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </label>
            <label className="block">
              <span className="font-medium text-neutral-300">Precio</span>
              <input type="number" placeholder="Ej: 59.99" value={precio} onChange={(e) => setPrecio(e.target.value)} required min="0" step="0.01" className="w-full px-4 py-2 mt-2 bg-neutral-800 border-2 border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </label>
            <label className="block">
              <span className="font-medium text-neutral-300">Descripción</span>
              <textarea placeholder="Detalles del producto..." value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required rows={4} className="w-full px-4 py-2 mt-2 bg-neutral-800 border-2 border-neutral-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </label>
            <label className="block">
              <span className="font-medium text-neutral-300">Categoría</span>
              <input type="text" placeholder="Ej: tablas, rodamientos" value={etiqueta} onChange={(e) => setEtiqueta(e.target.value)} required className="w-full px-4 py-2 mt-2 bg-neutral-800 border-2 border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </label>
            <button type="submit" disabled={cargando} className="w-full py-3 text-lg font-bold text-white transition-all duration-300 bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50">
              {cargando ? 'Agregando...' : 'Agregar Producto'}
            </button>
          </form>
        </div>

        {/* Columna de la Lista de Productos */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold">Productos Existentes</h2>
          <div className="mt-6 bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
            <ul className="divide-y divide-neutral-800">
              {productos.length > 0 ? (
                productos.map((p) => (
                  <li key={p.id} className="flex items-center justify-between p-4 hover:bg-neutral-800/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <img src={p.imagen} alt={p.nombre} className="w-16 h-16 object-cover rounded-md bg-neutral-800"/>
                      <div>
                        <p className="font-semibold text-white">{p.nombre || p.title}</p>
                        <p className="text-sm text-neutral-400">${p.precio}</p>
                      </div>
                    </div>
                    <button onClick={() => onDelete(p.id)} className="px-4 py-2 font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                      Eliminar
                    </button>
                  </li>
                ))
              ) : (
                <li className="p-6 text-center text-neutral-500">No hay productos para mostrar.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de Acceso Protegido (Componente Padre)
export default function AdminProtegido() {
  const [autorizado, setAutorizado] = useState(false);
  const [clave, setClave] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  // Verificar autorización al cargar
  useEffect(() => {
    const autorizadoLS = localStorage.getItem('autorizado');
    if (autorizadoLS === 'true') setAutorizado(true);
  }, []);

  // Cargar productos al autorizar
  useEffect(() => {
    if (autorizado) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
        .then((res) => res.json())
        .then((data) => setProductos(data))
        .catch(() => setError('No se pudieron cargar los productos.'));
    }
  }, [autorizado]);

  // Manejar login
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

  // Manejar eliminación de producto
  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este producto?')) return;
    setError('');
    setExito('');
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar');
      setProductos(productos.filter((p) => p.id !== id));
      setExito('Producto eliminado correctamente.');
    } catch (err) {
      setError('No se pudo eliminar el producto.');
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e, { nombre, descripcion, precio, etiqueta, imagen }) => {
    e.preventDefault();
    setError('');
    setExito('');

    if (!imagen || !nombre || !descripcion || !precio || !etiqueta) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setCargando(true);

    try {
      const formData = new FormData();
      formData.append('imagen', imagen);

      const uploadRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) throw new Error('Error al subir la imagen');
      const { url } = await uploadRes.json();

      const producto = { nombre, descripcion, precio, category: etiqueta, imagen: url };

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto),
      });

      if (!res.ok) throw new Error('Error al agregar el producto');

      const nuevoProducto = await res.json();
      setProductos([nuevoProducto, ...productos]);
      setExito('Producto agregado correctamente.');
    } catch (err) {
      setError(err.message || 'Ocurrió un error inesperado');
    } finally {
      setCargando(false);
    }
  };

  if (!autorizado) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <div className="flex items-center justify-center w-full" style={{ minHeight: '80vh' }}>
          <form onSubmit={handleLogin} className="space-y-6 w-full max-w-md mx-auto p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Acceso de Administrador</h2>
              <p className="mt-2 text-neutral-400">Ingresa la contraseña para continuar.</p>
            </div>
            <label className="block">
              <span className="font-medium text-neutral-300 sr-only">Contraseña</span>
              <input
                type="password"
                placeholder="Contraseña"
                value={clave}
                onChange={(e) => {
                  setClave(e.target.value);
                  setLoginError(false);
                }}
                className={`w-full px-4 py-3 mt-2 text-white bg-neutral-800 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  loginError ? 'border-red-500' : 'border-neutral-700'
                }`}
              />
            </label>
            {loginError && <p className="text-sm text-center text-red-400">Contraseña incorrecta.</p>}
            <button className="w-full py-3 font-bold text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
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
        error={error}
        exito={exito}
        cargando={cargando}
      />
    </PageContainer>
  );
}
