import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import ProductDetail from './pages/ProductDetail';
import ZCADPage from './pages/ZCADPage';
import Q1Product from './pages/Q1Product';
import Features from './components/Features';
import Footer from './components/Footer';
import GenericPage from './pages/GenericPage';
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
          <Route path="/contact" element={<GenericPage title="Contact Us" description="Get in touch with our team. We're here to help with your questions and inquiries." />} />

          {/* Company Pages */}
          <Route path="/careers" element={<GenericPage title="Careers" description="Join our team and help shape the future of manufacturing technology." />} />
          <Route path="/press" element={<GenericPage title="Press" description="Latest news, press releases, and media resources from SYNTRIQ." />} />
          <Route path="/partners" element={<GenericPage title="Partners" description="Collaborate with us to deliver innovative manufacturing solutions." />} />
          <Route path="/blog" element={<GenericPage title="Blog" description="Insights, updates, and industry news from the SYNTRIQ team." />} />

          {/* Support Pages */}
          <Route path="/documentation" element={<GenericPage title="Documentation" description="Comprehensive guides and documentation for all SYNTRIQ products." />} />
          <Route path="/help" element={<GenericPage title="Help Center" description="Find answers to common questions and troubleshooting guides." />} />
          <Route path="/warranty" element={<GenericPage title="Warranty" description="Information about our warranty coverage and support programs." />} />
          <Route path="/downloads" element={<GenericPage title="Downloads" description="Access software, drivers, and documentation for your SYNTRIQ products." />} />

          {/* Legal Pages */}
          <Route path="/privacy" element={<GenericPage title="Privacy Policy" description="Learn how we collect, use, and protect your personal information." />} />
          <Route path="/terms" element={<GenericPage title="Terms of Service" description="Terms and conditions for using SYNTRIQ products and services." />} />
          <Route path="/cookies" element={<GenericPage title="Cookie Policy" description="Information about how we use cookies and similar technologies." />} />
          <Route path="/compliance" element={<GenericPage title="Compliance" description="Our commitment to regulatory compliance and industry standards." />} />
        </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
