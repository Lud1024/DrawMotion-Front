// src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Header from './components/Header';
import Paint from './pages/Paint';

function Layout() {
  // Ya no ocultamos el Header en "/"
  return (
    <>
      {/* Siempre muestro el Header */}
      <Header />

      <Routes>
        <Route path="/" element={<Paint />} />
        {/* añade aquí más rutas si las necesitas */}
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
