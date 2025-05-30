
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Apartments = () => {
  const { ref: introRef, animationClasses: introAnimation } = useScrollAnimation('fadeInUp');
  
  return (
    <PageLayout 
      title="Luxury Apartments"
      breadcrumbs={[
        { label: "Properties", href: "/properties" },
        { label: "Apartments" }
      ]}
    >
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div ref={introRef} className={`${introAnimation} mb-12`}>
            <h2 className="text-3xl font-bold mb-4 text-deep-blue">Dubai's Finest Apartments</h2>
            <p className="text-gray-600 max-w-3xl">
              Discover our exclusive collection of luxury apartments in Dubai's most prestigious locations.
              From sleek studios to expansive penthouses, our portfolio includes the finest residences the city has to offer.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => {
              // Generate UUID-style IDs for demo purposes
              const uuid = `apartment-${index}-${Math.random().toString(36).substring(2, 9)}`;
              
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={`https://source.unsplash.com/random/600x400/?apartment,luxury,${index}`} 
                      alt="Luxury Apartment"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                      For Sale
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-deep-blue">
                      Luxury {index % 2 === 0 ? '2' : '3'} Bedroom Apartment
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {['Downtown Dubai', 'Dubai Marina', 'Palm Jumeirah'][index % 3]}
                    </p>
                    
                    <div className="flex justify-between mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Size</span>
                        <p className="font-semibold">{(index + 1) * 500 + 1000} sq.ft</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Bedrooms</span>
                        <p className="font-semibold">{index % 2 === 0 ? '2' : '3'}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Bathrooms</span>
                        <p className="font-semibold">{index % 2 === 0 ? '2.5' : '3.5'}</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm text-gray-500">Price</span>
                          <p className="text-xl font-bold text-deep-blue">AED {(index + 1) * 1.5 + 2}M</p>
                        </div>
                        <Button asChild className="bg-deep-blue hover:bg-deep-blue/90 text-white">
                          <Link to={`/properties/apartments/${uuid}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Apartments;
