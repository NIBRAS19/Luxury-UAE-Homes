
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Penthouses = () => {
  const { ref: introRef, animationClasses: introAnimation } = useScrollAnimation('fadeInUp');
  
  return (
    <PageLayout 
      title="Luxury Penthouses"
      breadcrumbs={[
        { label: "Properties", href: "/properties" },
        { label: "Penthouses" }
      ]}
    >
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div ref={introRef} className={`${introAnimation} mb-12`}>
            <h2 className="text-3xl font-bold mb-4 text-deep-blue">Exclusive Penthouse Collection</h2>
            <p className="text-gray-600 max-w-3xl">
              Experience the pinnacle of luxury living with our collection of prestigious penthouses in Dubai's most iconic towers.
              Featuring panoramic views, private terraces, and unparalleled amenities, these residences represent the ultimate in exclusivity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-12">
            {Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-2/3 relative">
                    <img 
                      src={`https://source.unsplash.com/random/1200x800/?penthouse,luxury,${index}`} 
                      alt="Luxury Penthouse"
                      className="w-full h-full object-cover max-h-[400px] lg:max-h-none"
                    />
                    <div className="absolute top-4 left-4 bg-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                      For Sale
                    </div>
                  </div>
                  
                  <div className="lg:w-1/3 p-8">
                    <h3 className="text-2xl font-bold mb-3 text-deep-blue">
                      {['Sky', 'Royal', 'Signature'][index]} Penthouse
                    </h3>
                    <p className="text-lg text-gray-600 mb-3">
                      {['Downtown Dubai', 'Dubai Marina', 'Palm Jumeirah'][index]}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <span className="text-sm text-gray-500">Size</span>
                        <p className="font-semibold">{(index + 1) * 1000 + 6000} sq.ft</p>
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
                        <span className="text-sm text-gray-500">Floor</span>
                        <p className="font-semibold">{(index + 1) * 10 + 60}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <h4 className="font-semibold text-deep-blue">Highlights:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                          <span className="text-gray-700">Private pool and terrace</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                          <span className="text-gray-700">360° panoramic views</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                          <span className="text-gray-700">Smart home technology</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                          <span className="text-gray-700">Private elevator access</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm text-gray-500">Price</span>
                          <p className="text-2xl font-bold text-deep-blue">AED {(index + 1) * 10 + 25}M</p>
                        </div>
                        <Button className="bg-gold hover:bg-gold/90 text-white">
                          View Details
                        </Button>
                      </div>
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

export default Penthouses;
