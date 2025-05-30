
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search } from 'lucide-react';

const AdvancedSearch = () => {
  const navigate = useNavigate();
  
  // Search states
  const [propertyType, setPropertyType] = useState('any');
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000000);
  const [bedrooms, setBedrooms] = useState('any');
  const [propertyStatus, setPropertyStatus] = useState('any');
  
  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    
    // Build query params
    const params = new URLSearchParams();
    if (propertyType !== 'any') params.append('type', propertyType);
    if (location) params.append('location', location);
    if (minPrice > 0) params.append('minPrice', minPrice.toString());
    if (maxPrice < 50000000) params.append('maxPrice', maxPrice.toString());
    if (bedrooms !== 'any') params.append('bedrooms', bedrooms);
    if (propertyStatus !== 'any') params.append('status', propertyStatus);
    
    // Navigate to properties page with search params
    navigate(`/properties?${params.toString()}`);
  };
  
  const formatPrice = (value) => {
    return `AED ${value.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Property Type</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="off-plan">Off-Plan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <Input 
              type="text" 
              placeholder="Enter location" 
              value={location} 
              onChange={e => setLocation(e.target.value)} 
            />
          </div>
          
          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">{formatPrice(minPrice)}</span>
              <span className="text-sm text-gray-500">{formatPrice(maxPrice)}</span>
            </div>
            <Slider
              defaultValue={[minPrice, maxPrice]}
              min={0}
              max={50000000}
              step={100000}
              onValueChange={(values) => {
                setMinPrice(values[0]);
                setMaxPrice(values[1]);
              }}
            />
          </div>
          
          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Property Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <Select value={propertyStatus} onValueChange={setPropertyStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Status</SelectItem>
                <SelectItem value="for-sale">For Sale</SelectItem>
                <SelectItem value="for-rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Search Button */}
          <div className="flex items-end">
            <Button type="submit" className="bg-gold hover:bg-gold/90 text-white w-full">
              <Search className="mr-2 h-4 w-4" /> Search Properties
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdvancedSearch;
