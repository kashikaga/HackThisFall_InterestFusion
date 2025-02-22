import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronDown 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'About',
      href: '/about',
    },
    {
      name: 'Services',
      dropdownItems: [
        { name: 'Interest Matching', href: '/services/matching' },
        { name: 'Community Events', href: '/services/events' },
        { name: 'Study Groups', href: '/services/groups' },
      ],
    },
    {
      name: 'Resources',
      dropdownItems: [
        { name: 'Blog', href: '/blog' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Support', href: '/support' },
      ],
    },
    {
      name:'FusionCommunity',
      href: '/community'
    },
    {
      name: 'Contact',
      href: '/contact',
    },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span
                className={`text-2xl font-bold ${
                  scrolled ? 'text-blue-600 dark:text-blue-400' : 'text-white'
                }`}
              >
                InterestFusion
              </span>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.dropdownItems ? (
                    <button
                      onClick={() =>
                        setActiveDropdown(activeDropdown === index ? null : index)
                      }
                      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 ${
                        scrolled
                          ? 'text-gray-800 dark:text-gray-200'
                          : 'text-white'
                      } hover:bg-blue-500/10 transition-colors duration-200`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        scrolled
                          ? 'text-gray-800 dark:text-gray-200'
                          : 'text-white'
                      } hover:bg-blue-500/10 transition-colors duration-200`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {item.dropdownItems && (
                    <div
                      className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 
                      transition-all duration-200 transform origin-top-right ${
                        activeDropdown === index
                          ? 'scale-100 opacity-100'
                          : 'scale-95 opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="py-1">
                        {item.dropdownItems.map((dropdownItem, idx) => (
                          <Link
                            key={idx}
                            to={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                scrolled ? 'text-gray-800 dark:text-gray-200' : 'text-white'
              } hover:bg-blue-500/10 transition-colors duration-200`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 shadow-lg">
          {navItems.map((item, index) => (
            <div key={index}>
              <Link
                to={item.href || '#'}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-blue-500/10"
              >
                {item.name}
              </Link>
              {item.dropdownItems && (
                <div className="pl-4 space-y-1">
                  {item.dropdownItems.map((dropdownItem, idx) => (
                    <Link
                      key={idx}
                      to={dropdownItem.href}
                      className="block px-3 py-2 rounded-md text-sm text-gray-600 dark:text-gray-400 hover:bg-blue-500/10"
                    >
                      {dropdownItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
