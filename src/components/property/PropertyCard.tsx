import React, { useState } from 'react';
import { Bed, Bath, Square, Heart } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    location: string;
    price: number;
    currency: string;
    perPeriod?: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    type: string;
    status: string;
    image: string;
    badge?: 'premium' | 'new' | 'reduced';
    images?: string[]; // Array of image URLs for gallery
  };
}
const PropertyCard = ({
  property
}: PropertyCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Toggle favorite status
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: `${property.title} has been ${isFavorited ? "removed from" : "added to"} your favorites`
    });
  };

  // Image gallery navigation
  const handleImageNav = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (property.images && property.images.length > index) {
      setCurrentImageIndex(index);
    }
  };

  // Get current image to display
  const currentImage = property.images && property.images.length > 0 ? property.images[currentImageIndex] : property.image;

  // Handle card click - navigate to property detail page
  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };
  return <motion.div className="property-card bg-white rounded-xl overflow-hidden shadow-premium border border-gray-100" whileHover={{
    y: -8,
    scale: 1.01,
    boxShadow: '0 20px 30px -5px rgb(0 0 0 / 0.1), 0 8px 15px -6px rgb(0 0 0 / 0.05)'
  }} transition={{
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1]
  }} onClick={handleCardClick}>
      {/* Image Container with AspectRatio for consistent sizing */}
      <div className="relative img-hover-zoom">
        <AspectRatio ratio={16 / 9} className="bg-slate-100">
          <img src={currentImage} alt={property.title} className="w-full h-full object-cover" />
          
          {/* Dark overlay gradient for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          
          {/* Status Badge */}
          <motion.div className="absolute top-4 left-4" initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }}>
            <span className={`px-3 py-1 rounded-md text-sm font-medium
              ${property.status === 'For Sale' ? 'bg-deep-blue' : property.status === 'For Rent' ? 'bg-emerald' : 'bg-gold'} 
              text-white shadow-md`}>
              {property.status}
            </span>
          </motion.div>
          
          {/* Premium/New/Reduced Badge */}
          {property.badge && <motion.div className="absolute top-4 right-14" initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }}>
              
            </motion.div>}
          
          {/* Favorite Button */}
          <div className="absolute top-4 right-4">
            <motion.button className={`bg-white/80 hover:bg-white p-2.5 rounded-full 
                ${isFavorited ? 'text-red-500' : 'text-gray-600 hover:text-red-500'} 
                shadow-md transition-colors duration-300`} whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.95
          }} onClick={toggleFavorite} aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}>
              <Heart size={20} fill={isFavorited ? "currentColor" : "none"} />
            </motion.button>
          </div>
          
          {/* Image Gallery Navigation Dots */}
          {property.images && property.images.length > 1 && <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {property.images.slice(0, 5).map((_, index) => <button key={index} onClick={e => handleImageNav(index, e)} className={`w-2 h-2 rounded-full transition-all duration-300 
                    ${currentImageIndex === index ? 'bg-white w-6' : 'bg-white/60 hover:bg-white/80'}`} aria-label={`View image ${index + 1}`} />)}
            </div>}
        </AspectRatio>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-semibold mb-2 line-clamp-1 font-serif">
          {property.title}
        </h3>
        
        {/* Location */}
        <div className="flex items-center mb-4 text-gray-500">
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Price */}
        <div className="mb-5">
          <p className="text-2xl font-bold text-deep-blue">
            {property.currency} {formatPrice(property.price)}
            <span className="text-sm font-normal text-gray-500 ml-1">{property.perPeriod || ''}</span>
          </p>
        </div>

        {/* Hover reveal content */}
        <motion.div variants={{
        rest: {
          height: 'auto',
          opacity: 1
        },
        hover: {
          height: 'auto',
          opacity: 1
        }
      }}>
          {/* Amenities */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="flex items-center text-gray-700 group">
              <Bed size={18} className="mr-1 group-hover:text-gold transition-colors duration-300" />
              <span className="text-sm">{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </div>
            <div className="flex items-center text-gray-700 group">
              <Bath size={18} className="mr-1 group-hover:text-gold transition-colors duration-300" />
              <span className="text-sm">{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
            <div className="flex items-center text-gray-700 group">
              <Square size={18} className="mr-1 group-hover:text-gold transition-colors duration-300" />
              <span className="text-sm">{property.area} sqft</span>
            </div>
          </div>
          
          {/* View details button - only visible on hover */}
          <motion.div className="mt-4 text-center" variants={{
          rest: {
            opacity: 0,
            y: 10
          },
          hover: {
            opacity: 1,
            y: 0
          }
        }} transition={{
          duration: 0.3
        }}>
            <button className="w-full py-2 px-4 bg-gold/10 hover:bg-gold/20 text-gold font-medium rounded-md transition-colors duration-300">
              View Details
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>;
};
export default PropertyCard;