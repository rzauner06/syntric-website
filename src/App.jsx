import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import Features from './components/Features'
import Footer from './components/Footer'
import Q1Product from './pages/Q1Product'

function HomePage() {
  return (
    <>
      <Hero />
      <Products />
      <Features />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/q1" element={<Q1Product />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
