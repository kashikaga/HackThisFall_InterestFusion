import React, { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  ArrowRight,
  Shield,
  Users,
  Rocket,
  Heart,
  Book,
  Star,
  MessageCircle,
  Trophy,
  Target,
} from "lucide-react";
import Footer from "../Footer";
import Navbar1 from "../Navbar/Navbar1";

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isVisible, setIsVisible] = useState({});
  const [stats, setStats] = useState({
    users: 0,
    connections: 0,
    interests: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-animate]");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.75;
        setIsVisible((prev) => ({ ...prev, [section.id]: isInView }));
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Animate stats
    const interval = setInterval(() => {
      setStats((prev) => ({
        users: Math.min(prev.users + 123, 10000),
        connections: Math.min(prev.connections + 234, 25000),
        interests: Math.min(prev.interests + 51, 5000),
      }));
    }, 50);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      content:
        "InterestFusion helped me find study partners who share my passion for AI and machine learning.",
      avatar: "SJ",
    },
    {
      name: "Mike Chen",
      role: "Art History Major",
      content:
        "I connected with fellow art enthusiasts and now we organize weekly museum visits!",
      avatar: "MC",
    },
    {
      name: "Emily Rodriguez",
      role: "Biology Researcher",
      content:
        "Found my research partner through InterestFusion. We're now collaborating on a paper!",
      avatar: "ER",
    },
  ];

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-b from-blue-50 to-white"
      }`}
    >
      <Navbar1 />

      {/* Hero Section with Floating Elements */}
      <header
        className={`relative overflow-hidden py-24 px-4 ${
          darkMode
            ? "bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900"
            : "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"
        }`}
      >
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: 0.1,
              }}
            >
              <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm" />
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="animate-fadeIn">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                InterestFusion
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100/90 max-w-2xl mx-auto mb-8 leading-relaxed">
              Where Passions Connect and Communities Thrive
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slideUp">
            <button
              onClick={() => {
                window.location.href = "/home";
              }}
              className="group relative px-8 py-4 text-lg font-medium bg-white text-blue-600 rounded-full overflow-hidden shadow-xl transition-all duration-300 hover:shadow-blue-500/25 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started{" "}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
            <button
              onClick={toggleDarkMode}
              className={`p-4 rounded-full transition-colors duration-300 ${
                darkMode
                  ? "bg-blue-100 text-blue-900 hover:bg-blue-200"
                  : "bg-blue-900 text-blue-100 hover:bg-blue-800"
              }`}
            >
              {darkMode ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 px-4" data-animate id="stats">
        <div
          className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 ${
            isVisible.stats ? "animate-fadeIn" : "opacity-0"
          }`}
        >
          <StatCard
            icon={<Users className="w-8 h-8" />}
            value={stats.users.toLocaleString()}
            label="Active Users"
            darkMode={darkMode}
          />
          <StatCard
            icon={<Heart className="w-8 h-8" />}
            value={stats.connections.toLocaleString()}
            label="Connections Made"
            darkMode={darkMode}
          />
          <StatCard
            icon={<Star className="w-8 h-8" />}
            value={stats.interests.toLocaleString()}
            label="Interests Shared"
            darkMode={darkMode}
          />
        </div>
      </section>

      {/* Features Grid with Hover Effects */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-blue-50 dark:to-gray-300">
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Why Choose InterestFusion?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "Smart Matching",
                description:
                  "Our AI-powered algorithm connects you with peers who share your specific interests and academic goals.",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Enhanced Security",
                description:
                  "Advanced privacy controls and verification systems ensure safe and authentic connections.",
              },
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: "Real-time Chat",
                description:
                  "Instantly connect with your matches through our secure messaging platform.",
              },
              {
                icon: <Book className="w-8 h-8" />,
                title: "Study Groups",
                description:
                  "Form and join study groups based on your courses and interests.",
              },
              {
                icon: <Trophy className="w-8 h-8" />,
                title: "Achievement System",
                description:
                  "Earn badges and rewards as you engage with the community and make connections.",
              },
              {
                icon: <Rocket className="w-8 h-8" />,
                title: "Continuous Growth",
                description:
                  "Regular updates and new features to enhance your experience.",
              },
            ].map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                darkMode={darkMode}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4" data-animate id="testimonials">
        <div
          className={`max-w-6xl mx-auto ${
            isVisible.testimonials ? "animate-fadeIn" : "opacity-0"
          }`}
        >
          <h2
            className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                {...testimonial}
                darkMode={darkMode}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const StatCard = ({ icon, value, label, darkMode }) => (
  <div
    className={`p-8 rounded-2xl text-center transition-all duration-300 ${
      darkMode ? "bg-gray-800" : "bg-white shadow-xl"
    }`}
  >
    <div
      className={`inline-flex p-3 rounded-xl mb-4 ${
        darkMode ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-600"
      }`}
    >
      {icon}
    </div>
    <h3
      className={`text-3xl font-bold mb-2 ${
        darkMode ? "text-white" : "text-gray-800"
      }`}
    >
      {value}
    </h3>
    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
      {label}
    </p>
  </div>
);

const FeatureCard = ({ icon, title, description, darkMode, delay }) => (
  <div
    className={`p-8 rounded-2xl transition-all duration-300 hover:scale-105 animate-fadeIn`}
    style={{ animationDelay: `${delay}s` }}
  >
    <div
      className={`inline-flex p-3 rounded-xl mb-4 ${
        darkMode ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-600"
      }`}
    >
      {icon}
    </div>
    <h3
      className={`text-xl font-semibold mb-3 ${
        darkMode ? "text-white" : "text-gray-800"
      }`}
    >
      {title}
    </h3>
    <p
      className={`text-base leading-relaxed ${
        darkMode ? "text-black" : "text-gray-600"
      }`}
    >
      {description}
    </p>
  </div>
);

const TestimonialCard = ({ name, role, content, avatar, darkMode, delay }) => (
  <div
    className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
      darkMode ? "bg-gray-800" : "bg-white shadow-xl"
    }`}
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="flex items-center mb-4">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${
          darkMode
            ? "bg-blue-500/20 text-blue-300"
            : "bg-blue-100 text-blue-600"
        }`}
      >
        {avatar}
      </div>
      <div className="ml-4">
        <h4
          className={`font-semibold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {name}
        </h4>
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          {role}
        </p>
      </div>
    </div>
    <p
      className={`text-base italic ${
        darkMode ? "text-gray-300" : "text-gray-600"
      }`}
    >
      "{content}"
    </p>
  </div>
);

export default LandingPage;
