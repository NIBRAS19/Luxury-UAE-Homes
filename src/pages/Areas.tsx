
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const popularAreas = [
  {
    id: 1,
    name: "Downtown Dubai",
    description: "The heart of Dubai featuring the iconic Burj Khalifa and Dubai Mall",
    image: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 2,
    name: "Palm Jumeirah",
    description: "An artificial archipelago featuring luxury hotels and residences",
    image: "https://images.unsplash.com/photo-1622151834677-70f982c9adef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 3,
    name: "Dubai Marina",
    description: "A modern waterfront community with luxury high-rise apartments",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 4,
    name: "Jumeirah Beach Residence",
    description: "Beachfront living with stunning views of the Arabian Gulf",
    image: "https://images.unsplash.com/photo-1570007026088-3945e22c8391?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 5,
    name: "Business Bay",
    description: "A central business district with a mix of residential and commercial properties",
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 6,
    name: "Emirates Hills",
    description: "An exclusive gated community featuring luxury villas",
    image: "https://images.unsplash.com/photo-1592595896616-c37162298647?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  }
];

const Areas = () => {
  const { ref: introRef, animationClasses: introAnimation } = useScrollAnimation('fadeInUp');
  
  return (
    <PageLayout 
      title="Area Guides"
      breadcrumbs={[
        { label: "Areas" }
      ]}
    >
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div ref={introRef} className={`${introAnimation} mb-12`}>
            <h2 className="text-3xl font-bold mb-2">Discover Dubai's Premier Locations</h2>
            <p className="text-gray-600 max-w-3xl">
              Explore our comprehensive guides to Dubai's most sought-after neighborhoods and communities.
              Find detailed information about amenities, lifestyle, property types, and investment potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularAreas.map((area, index) => (
              <motion.div
                key={area.name}
                className="rounded-lg overflow-hidden shadow-lg relative group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-80 relative overflow-hidden">
                  <img 
                    src={area.image} 
                    alt={area.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{area.name}</h3>
                    <p className="text-white/90 mb-6">{area.description}</p>
                    <Button asChild className="bg-gold hover:bg-gold/90 text-white">
                      <Link to={`/areas/${area.id}`}>Explore Area</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Areas;
