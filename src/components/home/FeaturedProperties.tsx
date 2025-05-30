import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import PropertyCard from '@/components/property/PropertyCard';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

// Enhanced sample data for featured properties with images array
const featuredProperties = [
  {
    id: 1,
    title: "Luxury Penthouse with Dubai Marina View",
    location: "Dubai Marina, Dubai",
    price: 12500000,
    currency: "AED",
    bedrooms: 4,
    bathrooms: 5,
    area: 4500,
    type: "Penthouse",
    status: "For Sale",
    badge: "premium" as const,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1594540046682-7d5a71ed7a8f?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    ]
  },
  {
    id: 2,
    title: "Exclusive Villa in Palm Jumeirah",
    location: "Palm Jumeirah, Dubai",
    price: 25000000,
    currency: "AED",
    bedrooms: 6,
    bathrooms: 7,
    area: 8500,
    type: "Villa",
    status: "For Sale",
    badge: "new" as const,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1629236714692-25e9eb4d518c?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    ]
  },
  {
    id: 3,
    title: "Modern Apartment in Downtown Dubai",
    location: "Downtown Dubai, Dubai",
    price: 45000,
    currency: "AED",
    perPeriod: "/month",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: "Apartment",
    status: "For Rent",
    badge: "reduced" as const,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1560448075-57d0285fc9e7?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448087-5d9076e1e278?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    ]
  },
  {
    id: 4,
    title: "Beachfront Villa with Private Pool",
    location: "Jumeirah, Dubai",
    price: 18500000,
    currency: "AED",
    bedrooms: 5,
    bathrooms: 6,
    area: 7200,
    type: "Villa",
    status: "For Sale",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600607687644-c7f65e8f4700?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    ]
  },
  {
    id: 5,
    title: "Luxurious Waterfront Mansion",
    location: "Emirates Hills, Dubai",
    price: 42000000,
    currency: "AED",
    bedrooms: 8,
    bathrooms: 10,
    area: 15000,
    type: "Mansion",
    status: "For Sale",
    badge: "premium" as const,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1175&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1175&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600607687920-4e4a92afd1bc?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    ]
  },
  {
    id: 6,
    title: "Designer Apartment with Sea View",
    location: "Bluewaters Island, Dubai",
    price: 38000,
    currency: "AED",
    perPeriod: "/month",
    bedrooms: 3,
    bathrooms: 3.5,
    area: 2800,
    type: "Apartment",
    status: "For Rent",
    badge: "new" as const,
    image: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    images: [
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    ]
  },
];

const FeaturedProperties = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { ref, animationClasses } = useScrollAnimation('fadeInUp', { threshold: 0.1 });
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  
  // Handle property card click to navigate to detail page
  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };
  
  // Function to navigate to all properties page
  const handleViewAllProperties = () => {
    setIsLoading(true);
    // Small delay to show loading state before navigating
    setTimeout(() => {
      setIsLoading(false);
      navigate('/properties');
    }, 300);
  };

  // Custom carousel navigation
  const handlePrevious = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -window.innerWidth / 2, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: window.innerWidth / 2, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-sand-light" id="featured-properties">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`text-center mb-16 ${animationClasses}`}>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6 font-serif"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Featured Properties
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gold mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Explore our handpicked selection of premium properties across the UAE's most desirable locations.
            Each property represents the pinnacle of luxury living.
          </motion.p>
        </div>

        {/* Carousel Implementation with improved controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 relative"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-white shadow-lg hover:bg-gold/10 hover:text-gold"
                onClick={handlePrevious}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>
            
            <CarouselContent className="-ml-2 md:-ml-4" ref={carouselRef}>
              {featuredProperties.map((property, index) => (
                <CarouselItem key={property.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 cursor-pointer" onClick={() => handlePropertyClick(property.id)}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-white shadow-lg hover:bg-gold/10 hover:text-gold"
                onClick={handleNext}
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Mobile navigation controls */}
            <div className="flex items-center justify-center mt-8 gap-4 md:hidden">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-white shadow-lg hover:bg-gold/10 hover:text-gold"
                onClick={handlePrevious}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-white shadow-lg hover:bg-gold/10 hover:text-gold"
                onClick={handleNext}
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </Carousel>
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Button 
              onClick={handleViewAllProperties} 
              disabled={isLoading}
              className="btn-premium bg-deep-blue hover:bg-deep-blue/90 text-white px-10 py-7 text-lg shadow-premium hover:shadow-premium-hover transition-all duration-300"
            >
              {isLoading ? 'Loading...' : (
                <>
                  View All Properties 
                  <ArrowRight size={18} className="ml-2 animate-shine" />
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
