import { useEffect, useState } from 'react';

const teamImages = [
  { src: '/Jmario.jpeg', name: 'Ing. Jorge Mario Martínez' },
  { src: '/villalta.jpeg', name: 'Ing. Luis Antony Villalta' },
  { src: '/ludvin.jpeg', name: 'Ing. Ludvin Marco Tulio Alonzo López', descripcion: 'Desarrollador Junior en Empresa Portuaria Quetzal' },
  { src: '/carla.jpeg', name: 'Ing. Carla Reneé Pérez Suriano' },
  { src: '/sergio.jpeg', name: 'Ing. Sergio Otoniel Crocker Cristales' },
  { src: '/mamfer.jpeg', name: 'Ing. Mamfer Geraldina Zamora Mejía' },
  { src: '/kevin.jpeg', name: 'Ing. Kevin José Santos Hernández' },
  { src: '/sauly.jpeg', name: 'Ing. Sauly Estefania Cermeño Morales' },
  { src: '/diego.jpeg', name: 'Ing. Diego Hernándezz' },
  { src: '/david.jpeg', name: 'Ing. Wilson David Ortega Quezada' },
  { src: '/pedro.jpeg', name: 'Ing. Luis Pedro Melchor Martinez' },
  { src: '/chaloexpo.png', name: 'Ing. José Abraham Revolorio Chalo ' },
];

const techCards = [
  {
    title: '¿Qué es este proyecto?',
    content: 'Es una aplicación interactiva que te permite dibujar con el movimiento de tu mano, sin necesidad de usar mouse ni teclado. Solo necesitas una cámara y tu creatividad.'
  },
  {
    title: '¿Qué lo hace especial?',
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>No necesitas contacto físico.</li>
        <li>Detecta tus gestos en tiempo real.</li>
        <li>Ideal para niños, artistas y personas con movilidad reducida.</li>
        <li>Guarda tus dibujos automáticamente con tu nombre.</li>
      </ul>
    )
  },
  {
    title: '¿Cómo funciona?',
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>Coloca tu mano frente a la cámara.</li>
        <li>Junta tu índice y pulgar para empezar a dibujar.</li>
        <li>Cierra el puño para borrar lo que dibujaste.</li>
        <li>Usa un botón para guardar tu obra de arte en tu computadora.</li>
      </ul>
    )
  },
  {
    title: '¿Para quién es?',
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>Estudiantes.</li>
        <li>Educadores.</li>
        <li>Artistas digitales.</li>
        <li>Personas con discapacidades motrices.</li>
        <li>Cualquier persona curiosa o creativa</li>
      </ul>
    )
  },
  {
    title: 'Requisitos mínimos',
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>Una cámara (webcam o de laptop).</li>
        <li>Conexión a internet (para cargar la app).</li>
        <li>Un navegador moderno (Chrome o Firefox).</li>
      </ul>
    )
  },
  {
    title: '¿Qué puedes hacer con esta app?',
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>Dibujar de forma libre y divertida.</li>
        <li>Crear actividades educativas sin contacto.</li>
        <li>Usarla en exposiciones o talleres creativos.</li>
        <li>Desarrollar la motricidad fina a través del juego.</li>
      </ul>
    )
  }
];

const techList = [
  {
    nombre: 'React',
    color: 'border-blue-500 text-blue-800',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    descripcion: 'Librería de JavaScript para construir interfaces de usuario interactivas y reactivas.',
  },
  {
    nombre: 'Node.js',
    color: 'border-green-600 text-green-700',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg',
    descripcion: 'Entorno de ejecución para JavaScript del lado del servidor, ideal para apps escalables.',
  },
  {
    nombre: 'MediaPipe',
    color: 'border-red-400 text-red-600',
    logo: '/pipe.png',
    descripcion: 'Framework de Google para visión por computadora como reconocimiento de manos.',
  },
  {
    nombre: 'Tailwind CSS',
    color: 'border-cyan-500 text-cyan-700',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg',
    descripcion: 'Framework de utilidades CSS para diseñar directamente en el HTML de forma rápida.',
  },
  {
    nombre: 'MongoDB',
    color: 'border-green-700 text-green-800',
    logo: '/mongodb.jpg',
    descripcion: 'Base de datos NoSQL orientada a documentos, ideal para trabajar con datos en JSON.',
  },
];

const Home = () => {
  const [teamIndex, setTeamIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [techIndex, setTechIndex] = useState(0);

  useEffect(() => {
    const teamInterval = setInterval(() => {
      setTeamIndex((prev) => (prev + 1) % teamImages.length);
    }, 3000);
    return () => clearInterval(teamInterval);
  }, []);

  useEffect(() => {
    const cardInterval = setInterval(() => {
      setCardIndex((prev) => (prev + 2) % techCards.length);
    }, 10000);
    return () => clearInterval(cardInterval);
  }, []);

  useEffect(() => {
    const techInterval = setInterval(() => {
      setTechIndex((prev) => (prev + 1) % techList.length);
    }, 4000);
    return () => clearInterval(techInterval);
  }, []);

  return (
    <div className="h-screen w-full flex flex-row text-white m-0 p-0 overflow-hidden">
      {/* Sección 1: EQUIPO */}
<section className="w-1/3 h-full p-6 flex flex-col items-center text-center space-y-2" style={{ backgroundColor: '#e4fbfb' }}>
  <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-cyan-500 tracking-wide uppercase drop-shadow-lg">
    Equipo de Desarrollo
  </h2>
  <p className="text-lg leading-snug text-gray-800 px-4 font-medium">
    Alumnos del noveno semestre de ingeniería en sistemas de la Universidad Mariano Gálvez.
  </p>

  <div className="flex flex-col items-center justify-center relative overflow-hidden h-[28rem] w-full">
    {teamImages.map((member, i) => {
      const isActive = i === teamIndex;
      return (
        <div
          key={i}
          className={`absolute flex flex-col items-center transition-all duration-[2000ms] ease-in-out
            ${isActive ? 'opacity-100 blur-0 z-10 scale-100' : 'opacity-0 blur-md scale-95 z-0'}`}
        >
          <img
            src={member.src}
            alt={member.name}
            className="w-80 h-80 object-cover rounded-3xl border-4 transform transition-transform duration-700 hover:scale-110 z-20"
            style={{ borderColor: '#1e293b' }}
          />
          <p className="mt-3 text-sm font-semibold text-white text-center bg-[#1e293b] px-3 py-1 rounded-md shadow">
            {member.name}
          </p>
          {member.descripcion && (
            <p className="mt-1 text-xs text-gray-200 bg-gray-800 bg-opacity-80 px-3 py-1 rounded-md max-w-xs">
              {member.descripcion}
            </p>
          )}
        </div>
      );
    })}
  </div>
</section>


      {/* Sección 2: TECNOLOGÍA */}
      <section className="w-1/3 h-full relative overflow-hidden flex items-center justify-center bg-red-500/50">

  {/* Título fijo */}
  <div className="absolute top-6 w-full text-center z-20">
<h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-500 tracking-wide drop-shadow-xl">
  ¿DrawMotion?
</h2>

  </div>

  {/* Tarjetas tipo carrusel en pares */}
  {[0, 1].map((offset) => {
    const i = (cardIndex + offset) % techCards.length;
    const card = techCards[i];
    return (
      <div
        key={i}
        className={`absolute ${offset === 0 ? 'top-24' : 'top-[22rem]'} left-6 right-6 transition-opacity duration-[2000ms] ease-in-out z-10`}
      >
       <div className="bg-white bg-opacity-90 rounded-3xl p-6 border-4 border-red-600 shadow-2xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transform hover:scale-105 transition-transform duration-500 text-red-700 min-h-[220px]">


          <h3 className="text-lg font-bold text-red-800 mb-3">{card.title}</h3>
          <div>{card.content}</div>
        </div>
      </div>
    );
  })}
</section>


      {/* Sección 3: INTERACCIÓN como carrusel */}
      <section className="w-1/3 h-full p-6 overflow-hidden" style={{ backgroundColor: '#c9d3d3' }}>
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-500 tracking-wide uppercase drop-shadow-xl text-center mb-6">
          Tecnologías
        </h2>
        <div className="relative h-[17rem]">
          {techList.map((tech, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out 
                ${i === techIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <div className={`bg-white bg-opacity-90 rounded-3xl p-4 border-4 ${tech.color} shadow-xl transform transition duration-500 w-full h-full flex flex-col justify-center items-center text-center`}>
                <img src={tech.logo} alt={tech.nombre} className="w-16 h-16 object-contain mb-2" />
                <span className={`text-xl font-bold mb-2 ${tech.color}`}>{tech.nombre}</span>
                <p className="text-sm text-gray-700 max-w-xs">{tech.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

