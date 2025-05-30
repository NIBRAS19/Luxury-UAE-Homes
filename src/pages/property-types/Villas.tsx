
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Villas = () => {
  const { ref: introRef, animationClasses: introAnimation } = useScrollAnimation('fadeInUp');
  
  return (
    <PageLayout 
      title="Luxury Villas"
      breadcrumbs={[
        { label: "Properties", href: "/properties" },
        { label: "Villas" }
      ]}
    >
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div ref={introRef} className={`${introAnimation} mb-12`}>
            <h2 className="text-3xl font-bold mb-4 text-deep-blue">Exclusive Villa Collection</h2>
            <p className="text-gray-600 max-w-3xl">
              Explore our handpicked selection of magnificent villas in Dubai's most prestigious communities.
              Each villa offers unparalleled luxury, privacy, and bespoke amenities for the most discerning clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={`https://source.unsplash.com/random/800x600/?villa,luxury,${index}`} 
                    alt="Luxury Villa"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                    For Sale
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-deep-blue">
                    {['Signature', 'Premium', 'Executive'][index % 3]} {index + 4} Bedroom Villa
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {['Emirates Hills', 'Palm Jumeirah', 'Al Barari', 'Dubai Hills Estate', 'Jumeirah Golf Estates', 'Jumeirah Islands'][index]}
                  </p>
                  
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-500">Size</span>
                      <p className="font-semibold">{(index + 1) * 1500 + 5000} sq.ft</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Bedrooms</span>
                      <p className="font-semibold">{index + 4}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Bathrooms</span>
                      <p className="font-semibold">{index + 5}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Plot</span>
                      <p className="font-semibold">{(index + 1) * 2000 + 8000} sq.ft</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-500">Price</span>
                        <p className="text-xl font-bold text-deep-blue">AED {(index + 1) * 5 + 15}M</p>
                      </div>
                      <Button className="bg-deep-blue hover:bg-deep-blue/90 text-white">
                        View Details
                      </Button>
                    </div>
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

export default Villas;
