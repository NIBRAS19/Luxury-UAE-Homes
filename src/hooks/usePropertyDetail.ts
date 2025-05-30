
import { useEffect, useState } from 'react';
import { propertyService } from '@/services/api';
import useFetch from '@/hooks/useFetch';

// Custom hook to handle property detail fetching and state
export function usePropertyDetail(id: string | undefined) {
  const [isFavorited, setIsFavorited] = useState(false);
  
  // This will fetch the property when the component mounts
  const { 
    data: property, 
    loading, 
    error, 
    refetch 
  } = useFetch(
    () => id ? propertyService.getPropertyById(id) : Promise.reject('No property ID provided'),
    {
      enabled: !!id,
      onSuccess: (data) => {
        // If the property has an is_favorited field, set the state
        if ('is_favorited' in data) {
          setIsFavorited(!!data.is_favorited);
        }
      }
    }
  );

  // Handle toggling favorite status
  const toggleFavorite = async () => {
    if (!id) return;
    
    try {
      await propertyService.toggleFavorite(id);
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    }
  };
  
  return {
    property,
    loading,
    error,
    isFavorited,
    toggleFavorite,
    refetchProperty: refetch
  };
}
