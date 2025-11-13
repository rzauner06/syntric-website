import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import ProductDetail from './pages/ProductDetail';
import ZCADPage from './pages/ZCADPage';
import Q1Product from './pages/Q1Product';
import Features from './components/Features';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/zcad" element={<ZCADPage />} />
          <Route path="/products/q1" element={<Q1Product />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/features" element={<div className="pt-20"><Features /><Footer /></div>} />
          <Route path="/about" element={
            <div className="min-h-screen pt-32 px-6 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">About SYNTRIQ</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">Coming soon...</p>
              </div>
              <Footer />
            </div>
          } />
          <Route path="/contact" element={
            <div className="min-h-screen pt-32 px-6 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Contact Us</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">Coming soon...</p>
              </div>
              <Footer />
            </div>
          } />
        </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
