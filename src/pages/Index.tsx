
import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import AreaGuides from '@/components/home/AreaGuides';
import LuxuryLiving from '@/components/home/LuxuryLiving';
import Testimonials from '@/components/home/Testimonials';
import MarketInsights from '@/components/home/MarketInsights';
import CallToAction from '@/components/home/CallToAction';
import { motion, useScroll, useSpring } from 'framer-motion';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Create a smooth scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Scrollbar Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-0.5 bg-gold z-[100] origin-left"
        style={{ scaleX }}
      />
      
      <Header />
      
      <main>
        <HeroSection />
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
            hidden: {}
          }}
        >
          <FeaturedProperties />
          <LuxuryLiving />
          <AreaGuides />
          <MarketInsights />
          <Testimonials />
          <CallToAction />
        </motion.div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Index;
