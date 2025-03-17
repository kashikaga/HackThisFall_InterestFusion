import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Lightbulb, Rocket, Star, Heart, Shield, MessageCircle, Moon, Sun } from 'lucide-react';

const StatsCard = ({ icon: Icon, value, label, isDark }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`${isDark ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-100 hover:border-purple-300'} rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300 border`}
  >
    <div className={`${isDark ? 'bg-blue-900' : 'bg-blue-100'} p-3 rounded-full mb-4 transform transition-transform group-hover:rotate-12`}>
      <Icon className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
    </div>
    <h3 className={`text-3xl font-bold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{value}</h3>
    <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
  </motion.div>
);

const ContentCard = ({ icon: Icon, title, content, isDark }) => (
  <motion.section
    className={`${isDark ? 'bg-gray-800 border-purple-800 hover:border-purple-600' : 'bg-white border-purple-100 hover:border-purple-300'} rounded-xl shadow-lg p-8 border-2 transition-all duration-300`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.02 }}
  >
    <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
      <Icon className={isDark ? 'text-purple-400' : 'text-purple-500'} />
      {title}
    </h2>
    <div className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
      {content}
    </div>
  </motion.section>
);

const FeatureCard = ({ icon: Icon, title, description, isDark }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`${isDark ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-100 hover:border-purple-300'} rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border group`}
  >
    <div className={`${isDark ? 'bg-purple-900 group-hover:bg-purple-800' : 'bg-purple-100 group-hover:bg-purple-200'} w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-colors duration-300`}>
      <Icon className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
    </div>
    <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{title}</h3>
    <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
  </motion.div>
);

const About = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check localStorage for theme preference on component mount
    const savedTheme = localStorage.getItem('theme');
    setIsDark(savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-b from-gray-900 to-purple-900' : 'bg-gradient-to-b from-white to-purple-50'}`}>
      <motion.div 
        className={`${isDark ? 'bg-gradient-to-r from-purple-900 to-purple-800' : 'bg-gradient-to-r from-purple-600 to-purple-100'} text-white py-16 relative`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.button
          onClick={toggleTheme}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-opacity-20 hover:bg-white transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </motion.button>
      </motion.div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <ContentCard 
            icon={Lightbulb}
            title="Welcome to InterestFusion"
            content="InterestFusion is a platform designed to connect individuals based on shared interests. We empower students, professionals, and innovators to bridge the gap between ideas and real-world applications."
            isDark={isDark}
          />
          <ContentCard 
            icon={Rocket}
            title="Our Mission"
            content="To inspire creativity, enable collaboration, and provide resources for transforming academic projects, entrepreneurial ideas, and personal interests into impactful solutions."
            isDark={isDark}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <StatsCard icon={Users} value="10,000" label="Active Users" isDark={isDark} />
          <StatsCard icon={Heart} value="25,000" label="Connections Made" isDark={isDark} />
          <StatsCard icon={Star} value="5,000" label="Interests Shared" isDark={isDark} />
        </div>

        <motion.h2 
          className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Why Choose InterestFusion?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            icon={Lightbulb}
            title="Smart Matching"
            description="Our AI-powered algorithm connects you with like-minded individuals who share your passions and interests."
            isDark={isDark}
          />
          <FeatureCard 
            icon={Shield}
            title="Enhanced Security"
            description="Advanced privacy controls and verification systems ensure a safe and trusted environment for all users."
            isDark={isDark}
          />
          <FeatureCard 
            icon={MessageCircle}
            title="Real-time Chat"
            description="Instantly connect with your matches through our seamless real-time messaging platform."
            isDark={isDark}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <ContentCard 
            icon={Star}
            title="Our Vision"
            content="We envision a world where curiosity drives innovation, collaboration fuels growth, and everyone has the opportunity to bring their ideas to life."
            isDark={isDark}
          />
          <ContentCard 
            icon={Users}
            title="What We Do"
            content={
              <ul className="list-disc list-inside space-y-3">
                <li><strong className={isDark ? 'text-gray-200' : ''}>Empowering Students:</strong> We help students transform academic ideas into real-world projects.</li>
                <li><strong className={isDark ? 'text-gray-200' : ''}>Fostering Innovation:</strong> We connect individuals to resources that enhance their learning and problem-solving skills.</li>
                <li><strong className={isDark ? 'text-gray-200' : ''}>Building Connections:</strong> We encourage interdisciplinary collaborations to create unique solutions.</li>
              </ul>
            }
            isDark={isDark}
          />
        </div>
      </div>

      <motion.div 
        className={`${isDark ? 'bg-purple-900' : 'bg-purple-600'} text-white text-center py-16`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-6">Join Us Today</h2>
        <p className="mb-8 text-lg">Be part of our growing community that values creativity, collaboration, and innovation.</p>
        <motion.button 
          className={`${isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-purple-600 hover:bg-purple-50'} px-8 py-3 rounded-lg font-semibold transition-all duration-300`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
};

export default About;