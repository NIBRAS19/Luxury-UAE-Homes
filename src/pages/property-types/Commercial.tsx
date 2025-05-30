
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const Commercial = () => {
  const { ref: introRef, animationClasses: introAnimation } = useScrollAnimation('fadeInUp');
  
  const commercialProperties = [
    {
      type: "Office Space",
      title: "Premium Office in Business Bay",
      location: "Business Bay",
      size: "5,000 sq.ft",
      price: "AED 8.5M",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      type: "Retail",
      title: "Prime Retail Space in Dubai Mall",
      location: "Downtown Dubai",
      size: "3,200 sq.ft",
      price: "AED 15M",
      image: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      type: "Office Space",
      title: "Full Floor Office in DIFC",
      location: "DIFC",
      size: "12,000 sq.ft",
      price: "AED 24M",
      image: "https://images.unsplash.com/photo-1605204376500-8150f8acb69d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      type: "Warehouse",
      title: "Modern Warehouse in Dubai Industrial City",
      location: "Dubai Industrial City",
      size: "20,000 sq.ft",
      price: "AED 12M",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      type: "Mixed-Use",
      title: "Mixed-Use Building in JLT",
      location: "Jumeirah Lakes Towers",
      size: "30,000 sq.ft",
      price: "AED 45M",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      type: "Retail",
      title: "Waterfront Restaurant Space in Dubai Marina",
      location: "Dubai Marina",
      size: "4,500 sq.ft",
      price: "AED 18M",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    }
  ];
  
  return (
    <PageLayout 
      title="Commercial Properties"
      breadcrumbs={[
        { label: "Properties", href: "/properties" },
        { label: "Commercial" }
      ]}
    >
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div ref={introRef} className={`${introAnimation} mb-12`}>
            <h2 className="text-3xl font-bold mb-4 text-deep-blue">Premium Commercial Properties</h2>
            <p className="text-gray-600 max-w-3xl">
              Discover exceptional commercial real estate opportunities across Dubai. Our portfolio includes 
              premium office spaces, retail properties, warehouses, and mixed-use developments in strategic locations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commercialProperties.map((property, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-deep-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                    {property.type}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-deep-blue">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {property.location}
                  </p>
                  
                  <div className="flex justify-between mb-6">
                    <div>
                      <span className="text-sm text-gray-500">Size</span>
                      <p className="font-semibold">{property.size}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Price</span>
                      <p className="font-semibold text-deep-blue">{property.price}</p>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <Button className="w-full bg-deep-blue hover:bg-deep-blue/90 text-white">
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Commercial Services Section */}
      <section className="py-16 bg-sand-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-deep-blue">Our Commercial Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Investment Advisory</CardTitle>
                <CardDescription>Strategic guidance for commercial investments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Our team provides expert advice on commercial property investments, helping you 
                  maximize returns and minimize risks in Dubai's dynamic market.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Property Management</CardTitle>
                <CardDescription>Comprehensive management solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  From tenant acquisition to maintenance and financial reporting, we ensure 
                  your commercial property performs optimally with minimal involvement.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Corporate Leasing</CardTitle>
                <CardDescription>Tailored solutions for businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We help businesses find the perfect commercial space that aligns with their 
                  operational needs, budget, and growth plans in prime Dubai locations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Commercial;
