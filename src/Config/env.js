// Admin env helpers.
// IMPORTANT: In production on Vercel (HTTPS), direct HTTP backend calls are blocked (Mixed Content).
// We proxy through Vercel rewrites (/api/* and /uploads/*) to keep everything HTTPS.

const hardcodedDevApiFallback = 'http://13.60.82.114:5000/jetjams/v1/api';
const hardcodedDevImageFallback = 'http://13.60.82.114:5000';

const getOrigin = () => (typeof window !== 'undefined' ? window.location.origin : '');

const isHttpsPage = () =>
  typeof window !== 'undefined' && window.location && window.location.protocol === 'https:';

const isInsecureHttpUrl = (value) => typeof value === 'string' && value.trim().toLowerCase().startsWith('http://');

export const getApiBaseUrl = () => {
  const fromEnv = process.env.REACT_APP_BASE_URL;
  if (fromEnv && !(isHttpsPage() && isInsecureHttpUrl(fromEnv))) return fromEnv;

  if (process.env.NODE_ENV === 'production') return `${getOrigin()}/api`;
  return hardcodedDevApiFallback;
};

export const getImageBaseUrl = () => {
  const fromEnv = process.env.REACT_APP_IMAGE_ENDPOINT;
  if (fromEnv && !(isHttpsPage() && isInsecureHttpUrl(fromEnv))) return fromEnv.replace(/\/$/, '');

  if (process.env.NODE_ENV === 'production') return getOrigin();
  return hardcodedDevImageFallback;
};

export const imageUrl = (path) => {
  if (!path) return '';
  const p = String(path).trim().replace(/\\/g, '/');
  if (/^https?:\/\//i.test(p)) return p;

  const base = getImageBaseUrl().replace(/\/$/, '');
  const relative = p.replace(/^\/+/, '');
  return relative ? `${base}/${relative}` : base;
};

