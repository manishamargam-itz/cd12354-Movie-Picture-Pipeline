export function getMovieApiUrl() {
  const baked = process.env.REACT_APP_MOVIE_API_URL || '';
  let runtime = typeof window !== 'undefined' ? window.MOVIE_API_URL || '' : '';
  const host = typeof window !== 'undefined' ? window.location.hostname : '';
  const pageIsLocal = host === 'localhost' || host === '127.0.0.1';
  const apiIsLocal = /localhost|127\.0\.0\.1/.test(String(runtime || baked));

  // The browser cannot reach Flask on the user's laptop from the LoadBalancer URL.
  if (!pageIsLocal && apiIsLocal) {
    runtime = '';
  }

  const url = runtime || baked || 'http://localhost:5000';
  return String(url).replace(/\/$/, '');
}
