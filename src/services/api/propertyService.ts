
import api from './config';
import { AxiosResponse } from 'axios';

// Define types for better type safety
interface Property {
  id: string; // Using string to accommodate UUIDs
  title: string;
  description?: string;
  property_type: string;
  status: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  area_sqm?: number;
  address?: string;  
  latitude?: number;
  longitude?: number;
  // Add other property fields as needed
}

interface PropertyFilter {
  property_type?: string;
  status?: string;
  bedrooms?: number;
  bathrooms?: number;
  area__id?: string;
  is_featured?: boolean;
  [key: string]: any;
}

// Property service functions
const propertyService = {
  // Get all properties with optional filtering
  getProperties: async (filters?: PropertyFilter): Promise<Property[]> => {
    try {
      const response: AxiosResponse<Property[]> = await api.get('/properties/', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  },

  // Get a specific property by ID
  getPropertyById: async (id: string): Promise<Property> => {
    try {
      const response: AxiosResponse<Property> = await api.get(`/properties/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching property with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new property
  createProperty: async (propertyData: Omit<Property, 'id'>): Promise<Property> => {
    try {
      const response: AxiosResponse<Property> = await api.post('/properties/', propertyData);
      return response.data;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  },

  // Update an existing property
  updateProperty: async (id: string, propertyData: Partial<Property>): Promise<Property> => {
    try {
      const response: AxiosResponse<Property> = await api.put(`/properties/${id}/`, propertyData);
      return response.data;
    } catch (error) {
      console.error(`Error updating property with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a property
  deleteProperty: async (id: string): Promise<void> => {
    try {
      await api.delete(`/properties/${id}/`);
    } catch (error) {
      console.error(`Error deleting property with ID ${id}:`, error);
      throw error;
    }
  },

  // Add property to favorites
  toggleFavorite: async (propertyId: string): Promise<{ detail: string }> => {
    try {
      const response: AxiosResponse<{ detail: string }> = await api.post(`/properties/${propertyId}/toggle_favorite/`);
      return response.data;
    } catch (error) {
      console.error('Error toggling property favorite status:', error);
      throw error;
    }
  },
};

export default propertyService;
