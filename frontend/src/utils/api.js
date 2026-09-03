const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

export const apiFetch = (path, options) => fetch(`${API_BASE_URL}${path}`, options);