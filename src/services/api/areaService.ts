
import api from './config';
import { AxiosResponse } from 'axios';

// Define types for better type safety
interface Area {
  id: string;
  name: string;
  description?: string;
  city: string;
  image?: string;
  average_price?: number;
  features?: any;
  // Add other area fields as needed
}

// Area service functions
const areaService = {
  // Get all areas
  getAreas: async (): Promise<Area[]> => {
    try {
      const response: AxiosResponse<Area[]> = await api.get('/areas/');
      return response.data;
    } catch (error) {
      console.error('Error fetching areas:', error);
      throw error;
    }
  },

  // Get a specific area by ID
  getAreaById: async (id: string): Promise<Area> => {
    try {
      const response: AxiosResponse<Area> = await api.get(`/areas/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching area with ID ${id}:`, error);
      throw error;
    }
  },

  // Get featured areas
  getFeaturedAreas: async (): Promise<Area[]> => {
    try {
      const response: AxiosResponse<Area[]> = await api.get('/areas/featured/');
      return response.data;
    } catch (error) {
      console.error('Error fetching featured areas:', error);
      throw error;
    }
  },
};

export default areaService;
