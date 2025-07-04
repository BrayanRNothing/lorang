import { useState } from 'react';

// Contenedor para centrar contenido
const PageContainer = ({ children }) => (
  <div className="flex items-center justify-center min-h-screen p-4 bg-neutral-950">
    {children}
  </div>
);

function AdminForm() {
  const [imagen, setImagen] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [etiqueta, setEtiqueta] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setExito('');

    if (!imagen || !nombre || !descripcion || !precio || !etiqueta) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setCargando(true);

    try {
      // 1. Subir imagen al backend (que la manda a Cloudinary)
      const formData = new FormData();
      formData.append('imagen', imagen);

      const uploadRes = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) throw new Error('Error al subir la imagen');

      const { url } = await uploadRes.json();

      // 2. Crear nuevo producto con URL de imagen
      const producto = {
        nombre,
        descripcion,
        precio,
        category: etiqueta,
        imagen: url,
      };

      const res = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto),
      });

      if (!res.ok) throw new Error('Error al agregar el producto');

      setExito('Producto agregado correctamente');
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setEtiqueta('');
      setImagen(null);
      e.target.reset();
    } catch (err) {
      setError(err.message || 'Ocurrió un error inesperado');
    } finally {
      setCargando(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl p-8 space-y-6 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl"
    >
      <h2 className="text-3xl font-bold text-center text-white drop-shadow-md">
        Panel de Administrador
      </h2>

      {error && (
        <div className="p-3 text-center text-red-300 bg-red-900/20 border border-red-500/30 rounded-lg">
          {error}
        </div>
      )}
      {exito && (
        <div className="p-3 text-center text-green-300 bg-green-900/20 border border-green-500/30 rounded-lg">
          {exito}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <label className="block col-span-1 md:col-span-2">
          <span className="font-medium text-neutral-300">Imagen del Producto</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
            required
            className="block w-full text-sm mt-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600/10 file:text-blue-300 hover:file:bg-blue-600/20 text-neutral-400"
          />
        </label>

        <label className="block">
          <span className="font-medium text-neutral-300">Nombre</span>
          <input
            type="text"
            placeholder="Ej: Tabla de Skate Pro"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full px-4 py-2 mt-2 text-white bg-neutral-800 border-2 border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </label>

        <label className="block">
          <span className="font-medium text-neutral-300">Precio</span>
          <input
            type="number"
            placeholder="Ej: 59.99"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-2 mt-2 text-white bg-neutral-800 border-2 border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </label>

        <label className="block col-span-1 md:col-span-2">
          <span className="font-medium text-neutral-300">Descripción</span>
          <textarea
            placeholder="Detalles del producto..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2 mt-2 text-white bg-neutral-800 border-2 border-neutral-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </label>

        <label className="block col-span-1 md:col-span-2">
          <span className="font-medium text-neutral-300">Etiqueta / Categoría</span>
          <input
            type="text"
            placeholder="Ej: tablas, rodamientos, etc."
            value={etiqueta}
            onChange={(e) => setEtiqueta(e.target.value)}
            required
            className="w-full px-4 py-2 mt-2 text-white bg-neutral-800 border-2 border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={cargando}
        className="w-full px-6 py-3 text-lg font-bold text-white transition-all duration-300 bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-wait"
      >
        {cargando ? 'Agregando Producto...' : 'Agregar Producto'}
      </button>
    </form>
  );
}

export default function AdminProtegido() {
  const [autorizado, setAutorizado] = useState(false);
  const [clave, setClave] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (clave === 'lorang200') {
      setAutorizado(true);
    } else {
      setError(true);
      setClave('');
    }
  };

  if (!autorizado) {
    return (
      <PageContainer>
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm p-8 space-y-6 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-center text-white">Acceso de Administrador</h2>
          <label className="block">
            <span className="font-medium text-neutral-300">Contraseña</span>
            <input
              type="password"
              placeholder="••••••••"
              value={clave}
              onChange={(e) => {
                setClave(e.target.value);
                setError(false);
              }}
              className={`w-full px-4 py-2 mt-2 text-white bg-neutral-800 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error ? 'border-red-500' : 'border-neutral-700'
              }`}
            />
          </label>
          {error && <p className="text-sm text-center text-red-400">Contraseña incorrecta. Inténtalo de nuevo.</p>}
          <button className="w-full px-6 py-3 font-bold text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            Entrar
          </button>
        </form>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <AdminForm />
    </PageContainer>
  );
}
