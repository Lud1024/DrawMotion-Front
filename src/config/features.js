/**
 * Interruptores temporales.
 *
 * Mientras resolvemos el login y la comunicacion con el backend, la app
 * funciona 100% offline: solo dibujar. Nada de esto se borro, solo se oculta.
 *
 * Para volver a activarlo: pon en true lo que corresponda y listo.
 */

// Login, registro, recuperacion de contrasena y rutas protegidas
export const AUTH_HABILITADO = false

// Boton "Guardar" en la pantalla de dibujo (POST /guardar)
export const GUARDAR_HABILITADO = false

// Galeria "Mis dibujos" (GET /guardar)
export const GALERIA_HABILITADA = false
