import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import ProductDetail from './pages/ProductDetail';
import ZCADPage from './pages/ZCADPage';
import Q1Product from './pages/Q1Product';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/ShopPage';
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
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
