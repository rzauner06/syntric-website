import Hero from '../components/Hero';
import Products from '../components/Products';
import Features from '../components/Features';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Hero />
      <Products />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
