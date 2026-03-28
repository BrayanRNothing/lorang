const rawBaseUrl = import.meta.env.VITE_BACKEND_URL || '';
const LORANG_API_PREFIX = '/api/lorang';

export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

export function apiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const mappedPath = normalizedPath.startsWith('/api/lorang')
    ? normalizedPath
    : normalizedPath.startsWith('/api/')
      ? `${LORANG_API_PREFIX}${normalizedPath.slice(4)}`
      : normalizedPath;
  return `${API_BASE_URL}${mappedPath}`;
}

export function getProductId(product) {
  if (!product || typeof product !== 'object') return '';
  return String(product.id || product._id || '');
}
