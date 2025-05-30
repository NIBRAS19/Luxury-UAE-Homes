
import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MapPin, Bed, Bath, Move, Calendar, Building2, CheckCircle } from 'lucide-react';
import { propertyService } from '@/services/api';
import useFetch from '@/hooks/useFetch';
import { toast } from "@/components/ui/use-toast";

// Helper to determine property type from URL
const getPropertyTypeFromUrl = (pathname: string) => {
  if (pathname.includes('/apartments/')) return 'Apartment';
  if (pathname.includes('/villas/')) return 'Villa';
  if (pathname.includes('/penthouses/')) return 'Penthouse';
  if (pathname.includes('/commercial/')) return 'Commercial';
  if (pathname.includes('/off-plan/')) return 'Off-Plan';
  if (pathname.includes('/areas/properties/')) return 'Area Property';
  return 'Property';
};

const SinglePropertyPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { ref: introRef, animationClasses: introAnimation } = useScrollAnimation('fadeInUp');
  const propertyType = getPropertyTypeFromUrl(location.pathname);
  const [isFavorited, setIsFavorited] = React.useState(false);
  
  const { data: property, loading } = useFetch(
    () => propertyService.getPropertyById(id || ''),
    {
      onError: (error) => {
        console.error(`Error fetching ${propertyType.toLowerCase()} details:`, error);
        toast({
          title: "Error",
          description: `Could not load ${propertyType.toLowerCase()} details. Please try again.`,
          variant: "destructive"
        });
      },
      enabled: !!id
    }
  );

  const toggleFavorite = async () => {
    if (!id) return;
    
    try {
      const response = await propertyService.toggleFavorite(id);
      setIsFavorited(!isFavorited);
      toast({
        title: "Success",
        description: response.detail
      });
    } catch (error) {
      console.error('Error toggling favorite status:', error);
      toast({
        title: "Error",
        description: "Failed to update favorite status. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <PageLayout 
        title={`${propertyType} Details`}
        breadcrumbs={[
          { label: "Properties", href: "/properties" },
          { label: `${propertyType}s`, href: `/properties/${propertyType.toLowerCase()}s` },
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

  if (!property) {
    return (
      <PageLayout 
        title={`${propertyType} Not Found`}
        breadcrumbs={[
          { label: "Properties", href: "/properties" },
          { label: `${propertyType}s`, href: `/properties/${propertyType.toLowerCase()}s` },
          { label: "Not Found" }
        ]}
      >
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">{propertyType} not found</h2>
          <p className="mb-6">The {propertyType.toLowerCase()} you are looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link to={`/properties/${propertyType.toLowerCase()}s`}>Return to {propertyType}s</Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  // Mock data to supplement API data
  const mockImages = [
    `https://source.unsplash.com/random/1200x800/?${propertyType.toLowerCase()},luxury,1`,
    `https://source.unsplash.com/random/1200x800/?${propertyType.toLowerCase()},interior,2`,
    `https://source.unsplash.com/random/1200x800/?${propertyType.toLowerCase()},bedroom,3`,
    `https://source.unsplash.com/random/1200x800/?${propertyType.toLowerCase()},bathroom,4`,
    `https://source.unsplash.com/random/1200x800/?${propertyType.toLowerCase()},kitchen,5`,
  ];
  
  const amenities = [
    "Swimming Pool", 
    "Gym", 
    "24/7 Security", 
    "Covered Parking", 
    "Children's Play Area", 
    "BBQ Area",
    "Smart Home System", 
    "Concierge Service"
  ];

  const locationDetails = {
    nearbyAmenities: [
      "Dubai Mall (10 minutes)",
      "Dubai International Airport (15 minutes)",
      "Public Beach (5 minutes)",
      "Premium Schools (5-10 minutes)",
      "Hospitals and Clinics (8 minutes)"
    ]
  };
  
  // Safe access to property_type with fallback to avoid errors
  const propertyTypeDisplay = property.property_type ? property.property_type.toLowerCase() : propertyType.toLowerCase();

  return (
    <PageLayout 
      title={property.title}
      breadcrumbs={[
        { label: "Properties", href: "/properties" },
        { label: `${propertyType}s`, href: `/properties/${propertyType.toLowerCase()}s` },
        { label: property.title }
      ]}
    >
      {/* Property Gallery */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 row-span-2">
              <div className="rounded-lg overflow-hidden h-full">
                <img 
                  src={mockImages[0]} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {mockImages.slice(1, 5).map((img, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <img 
                  src={img} 
                  alt={`${property.title} - Image ${index + 2}`} 
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Property Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div ref={introRef} className={introAnimation}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-deep-blue mb-2">{property.title}</h1>
                  <Button 
                    variant="outline" 
                    className="border-gold text-gold hover:bg-gold hover:text-white flex items-center"
                    onClick={toggleFavorite}
                  >
                    <Heart className="mr-2" fill={isFavorited ? "currentColor" : "none"} />
                    {isFavorited ? 'Saved to Favorites' : 'Save to Favorites'}
                  </Button>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{property.address || "Dubai, UAE"}</span>
                </div>
                
                <div className="flex flex-wrap gap-6 mb-8">
                  {property.bedrooms && (
                    <div className="flex items-center">
                      <Bed className="h-5 w-5 text-gold mr-2" />
                      <span><strong>{property.bedrooms}</strong> Bedrooms</span>
                    </div>
                  )}
                  
                  {property.bathrooms && (
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 text-gold mr-2" />
                      <span><strong>{property.bathrooms}</strong> Bathrooms</span>
                    </div>
                  )}
                  
                  {property.area_sqm && (
                    <div className="flex items-center">
                      <Move className="h-5 w-5 text-gold mr-2" />
                      <span><strong>{property.area_sqm}</strong> sq.m</span>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <Building2 className="h-5 w-5 text-gold mr-2" />
                    <span><strong>{propertyTypeDisplay}</strong></span>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gold mr-2" />
                    <span>Built in <strong>2021</strong></span>
                  </div>
                </div>
                
                <div className="prose max-w-none mb-10">
                  <h2 className="text-2xl font-bold mb-4 text-deep-blue">Description</h2>
                  <p className="text-gray-700">
                    {property.description || 
                      `This exclusive ${propertyType.toLowerCase()} offers unparalleled luxury and comfort in one of Dubai's most prestigious locations. 
                      Featuring premium finishes, spacious layouts, and world-class amenities, this property represents the pinnacle of sophisticated living.
                      The property boasts breathtaking views, state-of-the-art facilities, and is within close proximity to key attractions and business districts.
                      An exceptional investment opportunity or dream home awaits the most discerning buyer.`
                    }
                  </p>
                </div>
                
                <Tabs defaultValue="features" className="mb-12">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="features">Features & Amenities</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                    <TabsTrigger value="payment">Payment Plan</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="features" className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-gold mr-3" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="location" className="pt-6">
                    <div className="aspect-video bg-gray-200 rounded-lg mb-4">
                      {/* Map would go here */}
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-gray-500">Interactive map loading...</p>
                      </div>
                    </div>
                    <div className="prose max-w-none">
                      <h3 className="text-xl font-bold mb-2">Neighborhood</h3>
                      <p className="text-gray-700">
                        This property is situated in a prime location with easy access to major roads and attractions.
                        Nearby points of interest include shopping centers, restaurants, schools, and parks, all within a short distance.
                      </p>
                      
                      <h4 className="text-lg font-semibold mt-4 mb-2">Nearby Amenities:</h4>
                      <ul className="list-disc pl-5 text-gray-700">
                        {locationDetails.nearbyAmenities.map((amenity, index) => (
                          <li key={index}>{amenity}</li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="payment" className="pt-6">
                    {propertyTypeDisplay === 'off-plan' ? (
                      <div>
                        <h3 className="text-xl font-bold mb-4">Flexible Payment Plan</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between p-4 bg-sand-light rounded-lg">
                            <span className="font-medium">Booking Amount</span>
                            <span className="font-bold">10%</span>
                          </div>
                          <div className="flex justify-between p-4 bg-sand-light rounded-lg">
                            <span className="font-medium">During Construction</span>
                            <span className="font-bold">50% (10% every quarter)</span>
                          </div>
                          <div className="flex justify-between p-4 bg-sand-light rounded-lg">
                            <span className="font-medium">On Completion</span>
                            <span className="font-bold">40%</span>
                          </div>
                          <p className="text-gray-600 mt-4">
                            Flexible payment plans available. Please contact us for more details and customized options.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-xl font-bold mb-4">Payment Options</h3>
                        <p className="text-gray-600 mb-4">
                          This property is available for outright purchase. We also offer assistance with mortgage arrangements 
                          through our banking partners with competitive interest rates.
                        </p>
                        <div className="space-y-4">
                          <div className="flex justify-between p-4 bg-sand-light rounded-lg">
                            <span className="font-medium">Down Payment</span>
                            <span className="font-bold">20-25%</span>
                          </div>
                          <div className="flex justify-between p-4 bg-sand-light rounded-lg">
                            <span className="font-medium">Mortgage Term</span>
                            <span className="font-bold">Up to 25 years</span>
                          </div>
                          <div className="flex justify-between p-4 bg-sand-light rounded-lg">
                            <span className="font-medium">Interest Rate</span>
                            <span className="font-bold">Starting from 3.99%</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 sticky top-24">
                <div className="mb-6">
                  <p className="text-deep-blue font-bold text-3xl">AED {property.price ? property.price.toLocaleString() : "5,000,000"}</p>
                  <p className="text-gray-600">{property.status || "For Sale"}</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <Button className="w-full bg-gold hover:bg-gold/90 text-white">
                    Request Viewing
                  </Button>
                  <Button variant="outline" className="w-full">
                    Request Call Back
                  </Button>
                </div>
                
                <div className="border-t border-gray-200 py-6">
                  <h4 className="font-semibold mb-4">Contact Agent</h4>
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-gray-200 rounded-full overflow-hidden mr-4">
                      <img 
                        src="https://randomuser.me/api/portraits/men/32.jpg" 
                        alt="Agent" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">James Wilson</p>
                      <p className="text-sm text-gray-600">Luxury Property Specialist</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm">+971 50 123 4567</p>
                    <p className="text-sm">james.wilson@example.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Similar Properties */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Similar Properties</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={`https://source.unsplash.com/random/600x400/?${propertyType.toLowerCase()},luxury,${index + 10}`} 
                    alt={`Similar ${propertyType}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                    For Sale
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-deep-blue">
                    {`Luxury ${propertyType} in Dubai`}
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
                      <p className="font-semibold">{index + 2}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-500">Price</span>
                        <p className="text-xl font-bold text-deep-blue">AED {(index + 1) * 2 + 3}M</p>
                      </div>
                      <Button asChild className="bg-deep-blue hover:bg-deep-blue/90 text-white">
                        <Link to={`/property/${index + 10}`}>View Details</Link>
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

export default SinglePropertyPage;
