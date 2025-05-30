import React, { useEffect, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effect for background elements
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);
  
  useEffect(() => {
    // Mark hero as loaded after a short delay for animation sequencing
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen">
      {/* Hero Background Video with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ y: backgroundY }}
      >
        <video 
          className="absolute inset-0 w-full h-full object-cover scale-105"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Enhanced Overlay with Gradient and Texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-blue/40 via-deep-blue/30 to-deep-blue/50 backdrop-blur-[1px]">
        </div>
      </motion.div>

      {/* Hero Content with Staggered Animation */}
      <motion.div 
        className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center"
        style={{ opacity: opacityHero }}
      >
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bold mb-6 font-serif leading-tight tracking-tight">
            <span className="block">Discover</span> 
            <span className="block">Luxury Living</span>
            <span className="block">
              in <span className="text-gold animate-shine bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent bg-[length:200%_auto]">the UAE</span>
            </span>
          </h1>
          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          >
            Browse through our exclusive selection of premium properties in the most sought-after locations across the UAE.
          </motion.p>
        </motion.div>

        {/* Enhanced Search Bar */}
        <motion.div 
          className="hero-search-bar rounded-xl p-8 max-w-5xl shadow-premium backdrop-blur-md bg-white/90 border border-white/20"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40, scale: isLoaded ? 1 : 0.98 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <div className="mb-2 text-deep-blue font-medium">Looking to</div>
              <div className="relative group">
                <select className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-6 py-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300 group-hover:border-gold">
                  <option>Buy</option>
                  <option>Rent</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-gold transition-colors" size={18} />
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-2 text-deep-blue font-medium">Property Type</div>
              <div className="relative group">
                <select className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-6 py-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300 group-hover:border-gold">
                  <option>Any Type</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Penthouse</option>
                  <option>Townhouse</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-gold transition-colors" size={18} />
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-2 text-deep-blue font-medium">Location</div>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full bg-white border border-gray-300 rounded-lg px-6 py-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300 group-hover:border-gold"
                />
              </div>
            </div>

            <div className="flex-initial mt-8 md:mt-7">
              <Button className="w-full md:w-auto btn-premium bg-gold hover:bg-gold/90 text-white px-10 py-6 shadow-md hover:shadow-xl transition-all duration-300 rounded-lg hover:scale-[1.02]">
                <Search className="mr-2 h-5 w-5" /> Search
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="flex justify-center mt-5">
            <button className="flex items-center text-deep-blue hover:text-gold transition-colors group">
              <span className="mr-1 group-hover:underline">Advanced Filters</span>
              <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-white/80 text-sm mb-2 tracking-wide">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/80 rounded-full flex justify-center">
            <motion.div 
              className="w-1.5 h-1.5 bg-gold rounded-full mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
