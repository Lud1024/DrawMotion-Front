import { Link } from 'react-router-dom';
import {
  Hand,
  Sparkles,
  Palette,
  Camera,
  ImagePlus,
  ShieldCheck,
  Smile,
  Rocket,
  MousePointerClick,
} from 'lucide-react';

const pasos = [
  {
    icon: Camera,
    color: 'from-brand-cyan to-sky-500',
    titulo: 'Enciende la cámara',
    texto: 'Abre DrawMotion en el navegador y dale permiso a tu cámara. Nada que instalar.',
  },
  {
    icon: Hand,
    color: 'from-brand-violet to-indigo-500',
    titulo: 'Muestra tu mano',
    texto: 'Un puntero mágico sigue tu dedo índice apenas lo pones frente a la pantalla.',
  },
  {
    icon: MousePointerClick,
    color: 'from-brand-pink to-fuchsia-600',
    titulo: 'Junta o separa',
    texto: 'Une índice y pulgar para dibujar, sepáralos para levantar el lápiz. Cierra el puño y borra.',
  },
  {
    icon: ImagePlus,
    color: 'from-brand-amber to-orange-500',
    titulo: 'Guarda tu obra',
    texto: 'Ponle nombre a tu dibujo y guárdalo en tu galería para verlo cuando quieras.',
  },
];

const features = [
  {
    icon: Sparkles,
    color: 'text-brand-cyan',
    titulo: 'Creatividad sin límites',
    texto: 'No se acaba la hoja ni el color: puedes intentar, borrar y volver a intentarlo las veces que quieras.',
  },
  {
    icon: Rocket,
    color: 'text-brand-violet',
    titulo: 'Cero instalación',
    texto: 'Funciona directo en el navegador, desde una computadora, tablet o celular con cámara.',
  },
  {
    icon: ShieldCheck,
    color: 'text-brand-pink',
    titulo: 'Tu galería, privada',
    texto: 'Cada cuenta guarda solo sus propios dibujos. Nadie más puede verlos ni tocarlos.',
  },
  {
    icon: Smile,
    color: 'text-brand-amber',
    titulo: 'Para todas las manos',
    texto: 'Ideal para niños, curiosos y personas a las que sostener un lápiz o usar el mouse se les complica.',
  },
];

const Home = () => {
  return (
    <div className="w-full bg-ink-950">
      {/* ───────── HERO ───────── */}
      <section className="relative isolate overflow-hidden px-4 pb-20 pt-16 text-center sm:px-6 sm:pb-24 sm:pt-20">
        {/* Manchas de color de fondo */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-blob absolute -left-24 -top-24 h-64 w-64 rounded-full bg-brand-violet/25 blur-3xl sm:h-96 sm:w-96" />
          <div className="animate-blob absolute -right-24 top-1/3 h-64 w-64 rounded-full bg-brand-cyan/20 blur-3xl sm:h-96 sm:w-96" />
          <div className="animate-blob absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-brand-amber/15 blur-3xl sm:h-72 sm:w-72" />
        </div>

        <span className="mx-auto inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 backdrop-blur sm:text-sm">
          <Hand size={16} className="shrink-0 text-brand-cyan" />
          <span className="truncate">Dibuja moviendo la mano en el aire</span>
        </span>

        <h1 className="mx-auto mt-6 max-w-4xl text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Tu mano es el
          <span className="text-gradient mt-1 block">único pincel que necesitas</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg md:text-xl">
          Sin lápiz, sin mouse, sin nada que instalar. Solo tu cámara, tu imaginación y ganas de crear.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link to="/pintar" className="btn-primary w-full sm:w-auto">
            <Palette size={20} />
            Empezar a dibujar
          </Link>
          <Link to="/consultar" className="btn-ghost w-full sm:w-auto">
            <ImagePlus size={20} />
            Ver mi galería
          </Link>
        </div>
      </section>

      {/* ───────── CÓMO FUNCIONA ───────── */}
      <section className="border-t border-white/5 bg-ink-900 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center sm:mb-14">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Dibujar nunca fue tan fácil</h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">Cuatro gestos y ya estás creando.</p>
          </div>

          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pasos.map(({ icon: Icon, color, titulo, texto }, i) => (
              <li
                key={titulo}
                className="card group relative p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <span
                  aria-hidden
                  className="absolute right-4 top-3 select-none font-display text-5xl font-black text-white/[0.06]"
                >
                  {i + 1}
                </span>
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg`}
                >
                  <Icon size={22} className="text-ink-950" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{titulo}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── BENEFICIOS ───────── */}
      <section className="border-t border-white/5 bg-gradient-to-b from-ink-950 to-ink-900 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center sm:mb-14">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Hecho para jugar, pensado para aprender
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              Detrás de cada trazo hay coordinación, atención y mucha imaginación.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {features.map(({ icon: Icon, color, titulo, texto }) => (
              <div key={titulo} className="card flex items-start gap-4 p-6 sm:gap-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink-950">
                  <Icon size={20} className={color} />
                </div>
                <div className="min-w-0">
                  <h3 className="mb-1 text-lg font-bold">{titulo}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA FINAL ───────── */}
      <section className="relative isolate overflow-hidden border-t border-white/5 px-4 py-20 text-center sm:px-6">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-blob absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-brand-pink/20 blur-3xl sm:h-80 sm:w-80" />
          <div className="animate-blob absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-brand-cyan/20 blur-3xl sm:h-80 sm:w-80" />
        </div>

        <h2 className="text-3xl font-extrabold sm:text-4xl">¿Listo para mover las manos?</h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-300">
          Abre la cámara, junta el índice con el pulgar y deja que tu creatividad haga el resto.
        </p>
        <Link to="/pintar" className="btn-primary mt-8 w-full sm:w-auto">
          <Palette size={20} />
          Crear mi primer dibujo
        </Link>
      </section>
    </div>
  );
};

export default Home;
