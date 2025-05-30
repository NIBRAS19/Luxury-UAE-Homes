
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, Search, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Helper function for smooth scroll to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };
  
  // Navigation handlers
  const handleLoginClick = () => {
    navigate('/auth');
    setMobileMenuOpen(false);
  };
  
  const handleListPropertyClick = () => {
    navigate('/admin/properties');
    setMobileMenuOpen(false);
  };
  
  return <motion.header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`} initial={{
    y: -100,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1]
  }}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold relative">
            <span className="text-gold">Elite</span>
            <span className={isScrolled ? 'text-deep-blue' : 'text-white'}>Estates</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`font-medium transition-colors group relative ${isActive('/') ? 'text-gold' : isScrolled ? 'text-deep-blue hover:text-gold' : 'text-white hover:text-gold'}`}>
            Home
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
          
          <div className="relative group">
            <button className={`flex items-center font-medium transition-colors ${isActive('/properties') ? 'text-gold' : isScrolled ? 'text-deep-blue hover:text-gold' : 'text-white hover:text-gold'}`}>
              Properties <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            <div className="absolute left-0 mt-2 w-64 rounded-lg shadow-premium bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left">
              <div className="py-1 rounded-lg overflow-hidden">
                <Link to="/properties" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sand-light hover:text-deep-blue transition-colors">All Properties</Link>
                <Link to="/properties/apartments" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sand-light hover:text-deep-blue transition-colors">Apartments</Link>
                <Link to="/properties/villas" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sand-light hover:text-deep-blue transition-colors">Villas</Link>
                <Link to="/properties/penthouses" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sand-light hover:text-deep-blue transition-colors">Penthouses</Link>
                <Link to="/properties/commercial" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sand-light hover:text-deep-blue transition-colors">Commercial</Link>
                <Link to="/properties/off-plan" className="block px-4 py-3 text-sm text-gray-700 hover:bg-sand-light hover:text-deep-blue transition-colors">Off-Plan</Link>
              </div>
            </div>
          </div>

          <Link to="/areas" className={`font-medium transition-colors group relative ${isActive('/areas') ? 'text-gold' : isScrolled ? 'text-deep-blue hover:text-gold' : 'text-white hover:text-gold'}`}>
            Areas
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${isActive('/areas') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
          
          <Link to="/agents" className={`font-medium transition-colors group relative ${isActive('/agents') ? 'text-gold' : isScrolled ? 'text-deep-blue hover:text-gold' : 'text-white hover:text-gold'}`}>
            Agents
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${isActive('/agents') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
          
          <Link to="/about" className={`font-medium transition-colors group relative ${isActive('/about') ? 'text-gold' : isScrolled ? 'text-deep-blue hover:text-gold' : 'text-white hover:text-gold'}`}>
            About
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${isActive('/about') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
          
          <Link to="/contact" className={`font-medium transition-colors group relative ${isActive('/contact') ? 'text-gold' : isScrolled ? 'text-deep-blue hover:text-gold' : 'text-white hover:text-gold'}`}>
            Contact
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${isActive('/contact') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="" onClick={handleLoginClick}>
            Login
          </Button>
          <Button className="bg-gold text-white hover:bg-gold/90 shadow-md hover:shadow-lg transition-all duration-300" 
                onClick={handleListPropertyClick}>
            List Property
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <motion.button className="md:hidden p-2 rounded-full bg-white/10 backdrop-blur-sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} whileTap={{
        scale: 0.9
      }}>
          {mobileMenuOpen ? <X className={isScrolled ? 'text-deep-blue' : 'text-white'} /> : <Menu className={isScrolled ? 'text-deep-blue' : 'text-white'} />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && <motion.div className="md:hidden bg-white shadow-premium absolute w-full" initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}>
            <motion.div className="py-4 px-4 space-y-2" initial="hidden" animate="visible" variants={{
          visible: {
            transition: {
              staggerChildren: 0.05
            }
          },
          hidden: {}
        }}>
              <motion.div variants={{
            visible: {
              opacity: 1,
              x: 0
            },
            hidden: {
              opacity: 0,
              x: -20
            }
          }}>
                <Link to="/" className={`block text-deep-blue font-medium py-3 px-4 hover:bg-sand-light rounded-lg transition-colors ${isActive('/') ? 'bg-sand-light text-gold' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
              </motion.div>
              
              <motion.div variants={{
            visible: {
              opacity: 1,
              x: 0
            },
            hidden: {
              opacity: 0,
              x: -20
            }
          }}>
                <Link to="/properties" className={`block text-deep-blue font-medium py-3 px-4 hover:bg-sand-light rounded-lg transition-colors ${isActive('/properties') && location.pathname === '/properties' ? 'bg-sand-light text-gold' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                  All Properties
                </Link>
              </motion.div>
              
              {['apartments', 'villas', 'penthouses', 'commercial', 'off-plan'].map((type, index) => <motion.div key={type} variants={{
            visible: {
              opacity: 1,
              x: 0
            },
            hidden: {
              opacity: 0,
              x: -20
            }
          }}>
                  <Link to={`/properties/${type}`} className={`block text-deep-blue font-medium py-3 px-4 pl-8 hover:bg-sand-light rounded-lg transition-colors ${isActive(`/properties/${type}`) ? 'bg-sand-light text-gold' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Link>
                </motion.div>)}
              
              {[{
            path: '/areas',
            label: 'Areas'
          }, {
            path: '/agents',
            label: 'Agents'
          }, {
            path: '/about',
            label: 'About'
          }, {
            path: '/blog',
            label: 'Blog'
          }, {
            path: '/contact',
            label: 'Contact'
          }].map(item => <motion.div key={item.path} variants={{
            visible: {
              opacity: 1,
              x: 0
            },
            hidden: {
              opacity: 0,
              x: -20
            }
          }}>
                  <Link to={item.path} className={`block text-deep-blue font-medium py-3 px-4 hover:bg-sand-light rounded-lg transition-colors ${isActive(item.path) ? 'bg-sand-light text-gold' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                    {item.label}
                  </Link>
                </motion.div>)}
              
              <motion.div className="pt-4 flex flex-col space-y-3" variants={{
            visible: {
              opacity: 1,
              y: 0
            },
            hidden: {
              opacity: 0,
              y: 20
            }
          }}>
                <Button variant="outline" className="border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-white w-full transition-colors"
                onClick={handleLoginClick}>
                  Login
                </Button>
                <Button className="bg-gold text-white hover:bg-gold/90 w-full shadow-md hover:shadow-lg transition-all duration-300"
                onClick={handleListPropertyClick}>
                  List Property
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </motion.header>;
};
export default Header;
