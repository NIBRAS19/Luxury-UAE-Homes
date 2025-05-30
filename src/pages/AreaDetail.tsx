import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MapPin, Building2, TrendingUp } from 'lucide-react';
import { areaService } from '@/services/api';
import useFetch from '@/hooks/useFetch';

const AreaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { ref: introRef, animationClasses: introAnimation } = useScrollAnimation('fadeInUp');
  
  const { data: area, loading } = useFetch(
    () => areaService.getAreaById(id || ''),
    {
      onError: (error) => {
        console.error('Error fetching area details:', error);
      },
      enabled: !!id
    }
  );

  if (loading) {
    return (
      <PageLayout 
        title="Area Details"
        breadcrumbs={[
          { label: "Areas", href: "/areas" },
          { label: "Loading..." }
        ]}
      >
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!area) {
    return (
      <PageLayout 
        title="Area Not Found"
        breadcrumbs={[
          { label: "Areas", href: "/areas" },
          { label: "Not Found" }
        ]}
      >
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Area not found</h2>
          <p className="mb-6">The area you are looking for does not exist or has been removed.</p>
          <Button asChild>
            <a href="/areas">Return to Areas</a>
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title={area.name}
      breadcrumbs={[
        { label: "Areas", href: "/areas" },
        { label: area.name }
      ]}
    >
      {/* Hero Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="h-80 md:h-96 lg:h-[500px] w-full rounded-lg overflow-hidden mb-8">
            <img 
              src={area.image || "https://images.unsplash.com/photo-1582538885592-e70463ae380f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"} 
              alt={area.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div ref={introRef} className={`${introAnimation} mb-12`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-deep-blue">{area.name}</h2>
              {area.average_price && (
                <div className="mt-4 md:mt-0 bg-sand-light px-6 py-3 rounded-lg">
                  <p className="text-sm text-gray-500">Average Price</p>
                  <p className="font-bold text-xl text-deep-blue">AED {area.average_price.toLocaleString()}</p>
                </div>
              )}
            </div>
            
            <div className="flex items-center text-gray-600 mb-8">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{area.city}, UAE</span>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700">
                {area.description || `${area.name} is one of the most prestigious areas in ${area.city}, known for its luxury properties and prime location.`}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-center">Key Features of {area.name}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Building2 className="h-8 w-8 text-gold" />,
                title: "Premium Properties",
                description: "Access to high-end residential properties with exceptional amenities and finishes."
              },
              {
                icon: <MapPin className="h-8 w-8 text-gold" />,
                title: "Strategic Location",
                description: "Centrally located with easy access to major roads, attractions and business districts."
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-gold" />,
                title: "Strong Investment",
                description: "Consistent property value appreciation and attractive rental yields for investors."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h4 className="text-lg font-semibold mb-2 text-deep-blue">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Properties in this Area Section - Updated to use UUID-style links */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8">Properties in {area.name}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => {
              // Generate UUID-style IDs for demo purposes
              const uuid = `area-property-${area.id}-${index}-${Math.random().toString(36).substring(2, 9)}`;
              
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
                      src={`https://source.unsplash.com/random/600x400/?property,luxury,${index}`} 
                      alt="Property"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                      For Sale
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-deep-blue">
                      Luxury {index % 2 === 0 ? 'Apartment' : 'Villa'} in {area.name}
                    </h3>
                    
                    <div className="flex justify-between mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Size</span>
                        <p className="font-semibold">{(index + 1) * 500 + 1000} sq.ft</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Bedrooms</span>
                        <p className="font-semibold">{index + 2}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Bathrooms</span>
                        <p className="font-semibold">{index + 1}.5</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm text-gray-500">Price</span>
                          <p className="text-xl font-bold text-deep-blue">AED {(index + 1) * 1.5 + 2}M</p>
                        </div>
                        <Button asChild className="bg-deep-blue hover:bg-deep-blue/90 text-white">
                          <Link to={`/areas/properties/${uuid}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <div className="text-center mt-10">
            <Button className="bg-gold hover:bg-gold/90 text-white">
              View All Properties in {area.name}
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AreaDetail;
