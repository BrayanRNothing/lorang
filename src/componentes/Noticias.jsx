import { useEffect, useState } from 'react';
import { apiUrl } from '../lib/api';

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

  const clean = String(value).trim();
  let d;

  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
    d = new Date(`${clean}T00:00:00`);
  } else {
    d = new Date(clean);
  }

  if (Number.isNaN(d.getTime())) {
    return clean.includes('T') ? clean.split('T')[0] : clean;
  }

  return d.toLocaleDateString('es-PE', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatTime(value) {
  if (!value) return '';

  const clean = String(value).trim();
  const match = clean.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (!match) return clean;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (Number.isNaN(hours) || Number.isNaN(minutes) || hours > 23 || minutes > 59) {
    return clean;
  }

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

function getTypeBadge(type) {
  if (type === 'evento') {
    return {
      label: 'Evento',
      className: 'border border-blue-200 bg-blue-50 text-blue-700'
    };
  }

  if (type === 'lanzamiento') {
    return {
      label: 'Lanzamiento',
      className: 'border border-emerald-200 bg-emerald-50 text-emerald-700'
    };
  }

  if (type === 'comunicado') {
    return {
      label: 'Comunicado',
      className: 'border border-slate-300 bg-slate-100 text-slate-700'
    };
  }

  return {
    label: 'Anuncio',
    className: 'border border-amber-200 bg-amber-50 text-amber-700'
  };
}

export default function Noticias() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch(apiUrl('/api/news'));
        if (!response.ok) throw new Error('Error al cargar noticias');
        const data = await response.json();

        if (!Array.isArray(data)) return;

        const normalized = data
          .map(normalizePost)
          .sort((a, b) => new Date(b.createdAt || b.fechaEvento) - new Date(a.createdAt || a.fechaEvento));
        setPosts(normalized);
      } catch (err) {
        console.error('Error loading news:', err);
      }
    };

    loadNews();
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50 pt-22 pb-14 px-3 sm:px-5 lg:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-80" aria-hidden>
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute right-0 top-44 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[92rem]">
        <header className="mb-6 rounded-2xl border border-slate-200 bg-white/85 p-4 sm:p-6 shadow-sm backdrop-blur-sm">
          <div className="mx-auto w-full max-w-4xl text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-blue-700/80">Actualizaciones Lorang</p>
            <h1 className="mt-2 text-2xl sm:text-4xl font-black leading-tight text-slate-900">Noticias y eventos</h1>
            <p className="mt-2 max-w-3xl text-slate-600 text-sm sm:text-base">
            Enterate de sesiones, torneos, lanzamientos y actividades de la comunidad. Toda la información se actualiza
            desde el panel de administración.
            </p>
          </div>
        </header>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Aún no hay noticias publicadas</h2>
            <p className="mt-2 text-slate-600">En cuanto publiquen contenido desde el panel admin aparecerá aquí.</p>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {posts.map((post, index) => {
            const isEvent = post.tipo === 'evento';
            const hasDate = Boolean(post.fechaEvento);
            const hasTime = Boolean(post.horaEvento);
            const hasImage = Boolean(post.imagen && String(post.imagen).trim());
            const dateLabel = hasDate ? formatDate(post.fechaEvento) : 'Publicacion';
            const timeLabel = hasTime ? formatTime(post.horaEvento) : (isEvent ? 'Hora por confirmar' : '');
            const typeBadge = getTypeBadge(post.tipo || 'anuncio');
            const locationLabel = isEvent
              ? (post.ubicacion || 'Ubicacion por confirmar')
              : (post.ubicacion || 'Anuncio general');

            return (
            <article
              key={post.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
              style={{ animation: `fadeInUp 450ms ease-out ${index * 90}ms both` }}
            >
              {hasImage ? (
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={post.imagen}
                    alt={post.titulo}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ) : (
                <div className="px-4 pt-4 sm:px-5 sm:pt-5">
                  <div className="rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Actualizacion Lorang
                  </div>
                </div>
              )}

              <div className="p-4 sm:p-5">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${typeBadge.className}`}>
                    {typeBadge.label}
                  </span>
                  <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                    {dateLabel}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 line-clamp-2">{post.titulo}</h2>
                <p className="mt-2 text-sm text-slate-700 line-clamp-4">{post.contenido}</p>

                {isEvent ? (
                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700 space-y-1">
                    <p>
                      <span className="font-semibold text-slate-900">Lugar del evento:</span> {locationLabel}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Hora del evento:</span> {timeLabel || 'Hora por confirmar'}
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 max-w-full truncate">
                      {locationLabel}
                    </span>
                  </div>
                )}

                {!isEvent && timeLabel && (
                  <p className="mt-3 text-xs text-slate-500">
                    {timeLabel}
                  </p>
                )}

                {post.enlace && (
                  <a
                    href={post.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center text-xs font-semibold text-blue-700 hover:text-blue-800"
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
