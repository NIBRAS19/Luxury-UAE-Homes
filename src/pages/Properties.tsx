
import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdvancedSearch from '@/components/search/AdvancedSearch';
import { propertyService } from '@/services/api';
import useFetch from '@/hooks/useFetch';

const propertyTypes = [
  {
    title: "Apartments",
    description: "Modern living spaces in the heart of the city",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    link: "/properties/apartments"
  },
  {
    title: "Villas",
    description: "Luxurious standalone homes with private amenities",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    link: "/properties/villas"
  },
  {
    title: "Penthouses",
    description: "Exclusive top-floor residences with panoramic views",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    link: "/properties/penthouses"
  },
  {
    title: "Commercial",
    description: "Premium office and retail spaces for businesses",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    link: "/properties/commercial"
  },
  {
    title: "Off-Plan",
    description: "Invest early in upcoming development projects",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    link: "/properties/off-plan"
  }
];

const Properties = () => {
  const { ref: featuredRef, animationClasses: featuredAnimation } = useScrollAnimation('fadeInUp');
  const location = useLocation();
  const [searchParams, setSearchParams] = useState({});
  
  // Use our custom hook to fetch featured properties
  const { data: featuredProperties, loading: loadingProperties } = useFetch(
    () => propertyService.getProperties({ is_featured: true }),
    { 
      onError: (error) => {
        console.error('Failed to fetch featured properties:', error);
      }
    }
  );
  
  // Parse any search parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paramObj = {};
    
    for(const [key, value] of params.entries()) {
      paramObj[key] = value;
    }
    
    setSearchParams(paramObj);
  }, [location]);
  
  return (
    <PageLayout 
      title="Our Properties"
      breadcrumbs={[
        { label: "Properties" }
      ]}
    >
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Advanced Search Filter */}
          <div className="mb-10">
            <AdvancedSearch />
          </div>

          <div ref={featuredRef} className={`${featuredAnimation} mb-12`}>
            <h2 className="text-3xl font-bold mb-2">Discover Our Property Types</h2>
            <p className="text-gray-600 max-w-3xl">
              Browse through our diverse portfolio of premium properties across Dubai and the UAE.
              From modern apartments to luxurious villas, we have the perfect property for you.
              {Object.keys(searchParams).length > 0 && (
                <span className="block mt-2 text-gold">
                  Currently filtering: {Object.entries(searchParams).map(([key, value]) => (
                    `${key}: ${value}`
                  )).join(', ')}
                </span>
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {propertyTypes.map((type, index) => (
              <motion.div
                key={type.title}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={type.image} 
                    alt={type.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{type.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <Button asChild className="bg-gold hover:bg-gold/90 text-white w-full">
                    <Link to={type.link}>Explore {type.title}</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Properties;
