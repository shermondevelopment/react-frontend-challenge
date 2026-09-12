import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'

export const TMDB_BASE_URL =
  import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3'
export const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN || ''
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export function getTmdbImageUrl(
  path: string | null | undefined,
  size: 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'
): string {
  if (!path) {
    return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80'
  }
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export const tmdbApiClient: AxiosInstance = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Accept: 'application/json',
  },
  params: {
    language: 'pt-BR',
  },
})

tmdbApiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = import.meta.env.VITE_TMDB_ACCESS_TOKEN || TMDB_ACCESS_TOKEN
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

tmdbApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.status_message ||
      error.response?.data?.message ||
      error.message ||
      'Erro ao comunicar com o serviço do TMDB'
    return Promise.reject(new Error(message))
  }
)
