import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/HomePage.jsx'
import About from './components/AboutPage.jsx'
import Services from './components/Services.jsx'
import Contact from './components/Contact.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f1f5f9' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '24px 20px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
