DrawMotion - Frontend

Este es el frontend de la aplicación DrawMotion, desarrollado con React y Vite. Permite a los usuarios dibujar usando

gestos capturados por la cmara (gracias a MediaPipe), guardar sus dibujos, y consultar el historial.

 Tecnologías utilizadas

- React

- Vite

- MediaPipe Hands

- CSS personalizado

- Axios

- Flaticon (conos)

 Estructura del proyecto

DrawMotion-Front/

 components/ # Componentes UI como Cmara, Dibujo, Modales

 pages/ # Pginas principales (Login, Registro, Galera, Pintar)

 assets/ # conos y estilos

 App.jsx # Enrutamiento general

 main.jsx # Entrada de la app

 .env.example # Variables de entorno para la API

 vite.config.js # Configuracin de Vite

 Instalación y uso

1. Clona el repositorio:

git clone https://github.com/tu-usuario/DrawMotion-Front.git

cd DrawMotion-Front

2. Instala las dependencias:

npm install

3. Crea el archivo .env basado en .env.example:

cp .env.example .env

4. Llena el archivo .env con la URL de tu backend:

VITE_API_URL=http://localhost:5000

5. Ejecuta la app:

npm run dev

 Funcionalidades

 Deteccin de gestos: dibujar (pinza) y borrar (puo)

- Guardado de dibujos en el backend

- Registro e inicio de sesin de usuarios

- Galera con miniaturas, autores y fechas

- Navegación protegida por token JWT

 Construcción para producción 

npm run build

Para previsualizar:

npm run preview

 Creditos 

- MediaPipe Hands (Google)

- Flaticon

- React + Vite
