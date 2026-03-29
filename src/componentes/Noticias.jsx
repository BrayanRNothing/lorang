import { useEffect, useState } from 'react';
import { apiUrl } from '../lib/api';

const fallbackPosts = [
  {
    id: 'demo-1',
    tipo: 'evento',
    titulo: 'Sesion nocturna de fin de semana',
    resumen: 'Rodada abierta con premios para mejor truco y mejor estilo.',
    contenido:
      'Este sabado tendremos sesion nocturna con DJ en vivo. Trae casco, hidratacion y muchas ganas de patinar.',
    fechaEvento: '2026-04-05',
    horaEvento: '20:00',
    ubicacion: 'Skatepark Central',
    imagen:
      'https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'demo-2',
    tipo: 'anuncio',
    titulo: 'Clinica de mantenimiento',
    resumen: 'Aprende a cambiar rodamientos y ajustar tu setup.',
    contenido:
      'Habra una mini clinica gratuita para quienes quieran aprender mantenimiento basico y cuidado de su tabla.',
    fechaEvento: '',
    horaEvento: '',
    ubicacion: 'Tienda Lorang',
    imagen:
      'https://images.unsplash.com/photo-1520116468816-95b69f847357?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'demo-3',
    tipo: 'evento',
    titulo: 'Mini torneo street',
    resumen: 'Formato rapido por rondas, cupos limitados.',
    contenido:
      'Inscripciones desde las 10:00 am. Premiacion al final del evento con productos de la tienda.',
    fechaEvento: '2026-04-20',
    horaEvento: '10:00',
    ubicacion: 'Plaza Norte',
    imagen:
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80',
  },
];

function inferNewsType(post) {
  if (post?.tipo) return post.tipo;
  if (post?.fechaEvento || post?.horaEvento || post?.lugar || post?.ubicacion) return 'evento';
  return 'anuncio';
}

function normalizePost(post) {
  return {
    ...post,
    tipo: inferNewsType(post),
    ubicacion: post.ubicacion || post.lugar || '',
    horaEvento: post.horaEvento || '',
    enlace: post.enlace || '',
  };
}

function formatDate(value) {
  if (!value) return 'Fecha por confirmar';
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('es-PE', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function Noticias() {
  const [posts, setPosts] = useState(() => fallbackPosts.map(normalizePost));

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch(apiUrl('/api/news'));
        if (!response.ok) throw new Error('Error al cargar noticias');
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const normalized = data
            .map(normalizePost)
            .sort((a, b) => new Date(b.createdAt || b.fechaEvento) - new Date(a.createdAt || a.fechaEvento));
          setPosts(normalized);
        }
      } catch (err) {
        console.error('Error loading news:', err);
      }
    };

    loadNews();
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#f5f1ea] via-[#f1ede6] to-[#ece7df] pt-24 pb-16 px-4 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl" />
        <div className="absolute right-0 top-44 h-64 w-64 rounded-full bg-red-300/20 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-800/80">Actualizaciones Lorang</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-black leading-tight text-neutral-900">Noticias y eventos</h1>
          <p className="mt-3 max-w-2xl text-neutral-700 text-sm sm:text-base">
            Enterate de sesiones, torneos, lanzamientos y actividades de la comunidad.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {posts.map((post, index) => {
            const isEvent = post.tipo === 'evento';
            const hasDate = Boolean(post.fechaEvento);
            const hasTime = Boolean(post.horaEvento);
            const metaBadge = isEvent ? 'Evento' : (post.tipo || 'Anuncio');

            return (
            <article
              key={post.id}
              className="group overflow-hidden rounded-2xl border border-neutral-300/70 bg-white/85 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ animation: `fadeInUp 450ms ease-out ${index * 90}ms both` }}
            >
              <div className="relative h-48 w-full overflow-hidden bg-neutral-200">
                {post.imagen ? (
                  <img
                    src={post.imagen}
                    alt={post.titulo}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-orange-200 to-amber-100" />
                )}
                <div className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                  {hasDate ? formatDate(post.fechaEvento) : 'Publicacion'}
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <h2 className="text-lg sm:text-xl font-extrabold text-neutral-900 line-clamp-2">{post.titulo}</h2>
                <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{post.resumen}</p>
                <p className="mt-3 text-sm text-neutral-700 line-clamp-4">{post.contenido}</p>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                    {isEvent
                      ? (post.ubicacion || 'Ubicacion por confirmar')
                      : (post.ubicacion || 'Anuncio general')}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{metaBadge}</span>
                </div>

                {(hasDate || hasTime) && (
                  <p className="mt-3 text-xs text-neutral-500">
                    {hasDate ? formatDate(post.fechaEvento) : ''}{hasDate && hasTime ? ' · ' : ''}{hasTime ? post.horaEvento : ''}
                  </p>
                )}

                {post.enlace && (
                  <a
                    href={post.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex text-xs font-semibold text-rose-700 hover:text-rose-800"
                  >
                    Ver enlace
                  </a>
                )}
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
