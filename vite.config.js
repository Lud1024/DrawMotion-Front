import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { AUTH_HABILITADO, GUARDAR_HABILITADO, GALERIA_HABILITADA } from './src/config/features.js'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // Vite "hornea" VITE_API_URL dentro del bundle en tiempo de build.
  // Si se construye apuntando a localhost, el sitio desplegado queda roto
  // (el navegador del visitante intentaria llamar a SU propio localhost).
  // Mejor fallar aqui que descubrirlo en produccion.
  const usaBackend = AUTH_HABILITADO || GUARDAR_HABILITADO || GALERIA_HABILITADA

  if (command === 'build' && usaBackend) {
    const api = env.VITE_API_URL

    if (!api) {
      throw new Error(
        'VITE_API_URL no esta definida. Configurala en .env.production antes de construir.'
      )
    }

    if (/localhost|127\.0\.0\.1/.test(api)) {
      throw new Error(
        `VITE_API_URL apunta a "${api}". Un build de produccion no puede apuntar a localhost.\n` +
          'Pon la URL publica del backend en .env.production (localhost va en .env.development).'
      )
    }
  }

  return { plugins: [react()] }
})
