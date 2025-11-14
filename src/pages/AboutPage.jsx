import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Footer from '../components/Footer';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import GroupsIcon from '@mui/icons-material/Groups';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const AboutPage = () => {
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isMissionInView = useInView(missionRef, { once: true, margin: '-100px' });
  const isValuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const isTeamInView = useInView(teamRef, { once: true, margin: '-100px' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: <LightbulbIcon sx={{ fontSize: 'inherit' }} />,
      title: 'Innovation First',
      description: 'We push the boundaries of technology to create solutions that don\'t just meet needs—they anticipate them.'
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 'inherit' }} />,
      title: 'Quality Excellence',
      description: 'Every product we create meets the highest standards of precision, reliability, and performance.'
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 'inherit' }} />,
      title: 'Customer Success',
      description: 'Your success is our mission. We provide world-class support and continuously evolve our products based on your feedback.'
    },
    {
      icon: <RocketLaunchIcon sx={{ fontSize: 'inherit' }} />,
      title: 'Future Ready',
      description: 'We design for tomorrow, ensuring our solutions scale and adapt to your evolving needs.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
        className="pt-32 pb-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About <span className="text-gradient">SYNTRIC</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Pioneering the future of manufacturing technology through innovation, precision, and unwavering commitment to excellence.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <section ref={missionRef} className="py-20 px-6 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={isMissionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Our Mission
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={isMissionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
              >
                At SYNTRIC, we're on a mission to democratize advanced manufacturing technology. We believe that cutting-edge tools shouldn't be reserved for large corporations—they should be accessible to innovators, makers, and engineers everywhere.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={isMissionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
              >
                We combine hardware excellence with intelligent software to create integrated manufacturing solutions that are powerful, intuitive, and future-ready.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isMissionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl flex items-center justify-center">
                  <RocketLaunchIcon
                    sx={{ fontSize: 200 }}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.15)',
                  y: -5
                }}
                className="p-8 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 shadow-sm"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="text-6xl text-blue-600 dark:text-blue-400 mb-4 inline-block"
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={teamRef} className="py-20 px-6 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-left">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                SYNTRIC was born from a simple observation: manufacturing technology was becoming increasingly powerful, but also increasingly complex and expensive. We saw talented engineers and innovators held back not by lack of skill or vision, but by lack of access to the right tools.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Founded by a team of engineers, software developers, and manufacturing experts, we set out to change that. We combined decades of experience in industrial automation, electronic design, and software development to create products that are both powerful and accessible.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Today, SYNTRIC products are used by makers, startups, and established manufacturers around the world. From our precision 3D printers and CNC machines to our revolutionary EDA software, every product we create reflects our commitment to making professional-grade manufacturing technology accessible to everyone.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Join Us on Our Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-blue-100 mb-8"
          >
            Be part of the future of manufacturing technology
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="/products"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg inline-block"
            >
              Explore Our Products
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
