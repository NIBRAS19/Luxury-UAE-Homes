
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Square, Heart, Map, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// This is sample data, in a real app you'd fetch this from an API
const propertyData = {
  1: {
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
    description: `This stunning luxury penthouse offers panoramic views of Dubai Marina and the Arabian Gulf. Featuring high-end finishes throughout, this residence includes custom Italian furnishings, smart home technology, and floor-to-ceiling windows that flood the space with natural light.\n\nThe gourmet kitchen features top-of-the-line appliances, marble countertops, and custom cabinetry. The spacious master suite includes a spa-like bathroom with a soaking tub, dual vanities, and a walk-in rainfall shower.\n\nAdditional amenities include a private elevator entrance, outdoor terrace with infinity pool, and 24/7 concierge service.`,
    amenities: ["Private Pool", "Gym Access", "Concierge Service", "Parking", "Smart Home", "Waterfront", "Balcony", "Security"],
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1594540046682-7d5a71ed7a8f?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    ],
    agent: {
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      phone: "+971 50 123 4567",
      email: "sarah.j@luxuryproperties.ae"
    }
  },
  2: {
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
    description: "An exceptional beachfront villa offering unparalleled luxury and breathtaking views of the Arabian Gulf and Dubai skyline. This architectural masterpiece features premium finishes, smart home automation, and expansive indoor-outdoor living spaces perfect for entertaining.",
    amenities: ["Private Beach", "Swimming Pool", "Home Theater", "Smart Home", "Maid's Room", "Garden", "BBQ Area", "Garage"],
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1629236714692-25e9eb4d518c?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    ],
    agent: {
      name: "Mohammed Al Farsi",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      phone: "+971 50 987 6543",
      email: "mohammed.f@luxuryproperties.ae"
    }
  },
  // Add more properties as needed
};

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      if (id && propertyData[Number(id)]) {
        setProperty(propertyData[Number(id)]);
      }
      setLoading(false);
    }, 500);

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <PageLayout title="Loading Property">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-16 h-16 border-4 border-deep-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg">Loading property details...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!property) {
    return (
      <PageLayout title="Property Not Found">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-3xl font-bold mb-4">Property Not Found</h2>
            <p className="mb-8 text-lg text-gray-600">The property you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/properties">Browse All Properties</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <PageLayout 
      title={property.title}
      breadcrumbs={[
        { label: "Properties", href: "/properties" },
        { label: property.location.split(',')[0], href: `/properties?location=${encodeURIComponent(property.location.split(',')[0])}` },
        { label: property.title }
      ]}
    >
      {/* Hero Section */}
      <section className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="relative rounded-xl overflow-hidden shadow-xl mb-8">
                <AspectRatio ratio={16/9}>
                  <img 
                    src={property.images[currentImageIndex]} 
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                {/* Image Navigation Dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 border border-white
                        ${currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
                {/* Favorite Button */}
                <button 
                  onClick={toggleFavorite}
                  className={`absolute top-4 right-4 p-3 rounded-full shadow-md transition-all duration-300
                    ${isFavorited ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:text-red-500'}`}
                >
                  <Heart fill={isFavorited ? "currentColor" : "none"} size={24} />
                </button>
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-2 rounded-md text-sm font-medium shadow-md
                    ${property.status === 'For Sale' ? 'bg-deep-blue' : 
                      property.status === 'For Rent' ? 'bg-emerald' : 'bg-gold'} 
                    text-white`}
                  >
                    {property.status}
                  </span>
                </div>
              </div>

              {/* Image Thumbnails */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {property.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`cursor-pointer rounded-md overflow-hidden border-2 transition-all
                      ${currentImageIndex === index ? 'border-gold scale-105 shadow-md' : 'border-transparent hover:border-gold/50'}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <AspectRatio ratio={16/9}>
                      <img 
                        src={image}
                        alt={`${property.title} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                ))}
              </div>

              {/* Property Details */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-2 font-serif">{property.title}</h2>
                <p className="text-xl text-gray-600 mb-4">{property.location}</p>
                <div className="flex items-center mb-6">
                  <span className="text-3xl font-bold text-deep-blue">{property.currency} {formatPrice(property.price)}</span>
                  {property.perPeriod && (
                    <span className="text-lg text-gray-500 ml-2">{property.perPeriod}</span>
                  )}
                  {property.badge && (
                    <Badge 
                      className="ml-4"
                      variant={property.badge === 'premium' ? 'default' : 
                              property.badge === 'new' ? 'secondary' : 'destructive'}
                    >
                      {property.badge === 'premium' ? 'Premium' : 
                      property.badge === 'new' ? 'New' : 'Reduced'}
                    </Badge>
                  )}
                </div>

                {/* Property Specs */}
                <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-gray-50 rounded-xl">
                  <div className="flex flex-col items-center p-4 border-r border-gray-200">
                    <Bed className="text-gold mb-2" size={28} />
                    <span className="text-xl font-bold">{property.bedrooms}</span>
                    <span className="text-gray-600">Bedrooms</span>
                  </div>
                  <div className="flex flex-col items-center p-4 border-r border-gray-200">
                    <Bath className="text-gold mb-2" size={28} />
                    <span className="text-xl font-bold">{property.bathrooms}</span>
                    <span className="text-gray-600">Bathrooms</span>
                  </div>
                  <div className="flex flex-col items-center p-4">
                    <Square className="text-gold mb-2" size={28} />
                    <span className="text-xl font-bold">{formatPrice(property.area)}</span>
                    <span className="text-gray-600">Square Feet</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Description</h3>
                  <div className="prose max-w-none">
                    {property.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center">
                        <div className="w-2 h-2 bg-gold rounded-full mr-2"></div>
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location Map Placeholder */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Location</h3>
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-xl overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Map size={48} className="text-gray-400" />
                      <span className="absolute mt-16 text-gray-600">Interactive map would be displayed here</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Agent Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Contact Agent</h3>
                <div className="flex items-center mb-4">
                  <img 
                    src={property.agent.image} 
                    alt={property.agent.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{property.agent.name}</h4>
                    <p className="text-gray-600 text-sm">Luxury Property Specialist</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <Button variant="outline" className="w-full flex justify-between items-center">
                    <span>Call Agent</span>
                    <span className="text-deep-blue">{property.agent.phone}</span>
                  </Button>
                  <Button variant="outline" className="w-full flex justify-between items-center">
                    <span>Email Agent</span>
                    <span className="text-deep-blue truncate max-w-[120px]">{property.agent.email}</span>
                  </Button>
                </div>

                {/* Schedule Viewing */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold mb-4 flex items-center">
                    <Calendar size={18} className="mr-2 text-gold" />
                    Schedule a Viewing
                  </h4>
                  <Button className="w-full bg-gold hover:bg-gold/90 text-white">
                    Request a Viewing
                  </Button>
                </div>
              </div>

              {/* Similar Properties CTA */}
              <div className="bg-deep-blue text-white rounded-xl overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Looking for similar properties?</h3>
                  <p className="mb-4 text-white/80">Explore more luxury properties in {property.location.split(',')[0]}.</p>
                  <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-deep-blue w-full">
                    <Link to={`/properties?location=${encodeURIComponent(property.location.split(',')[0])}`} className="flex items-center justify-center">
                      Browse Similar Properties
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PropertyDetail;
