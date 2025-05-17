import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Paint from './pages/Paint'
import Consult from './pages/Consult'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow p-4 overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pintar" element={<Paint />} />
            <Route path="/consultar" element={<Consult />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
