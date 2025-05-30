
import api from './config';
import { AxiosResponse } from 'axios';

// Define types for better type safety
interface MarketReport {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author_details?: any;
  cover_image?: string;
  published_date: string;
  is_featured: boolean;
  // Add other market report fields as needed
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author_details?: any;
  cover_image?: string;
  published_date?: string;
  tags?: string[];
  is_published: boolean;
  // Add other blog post fields as needed
}

// Market Insight service functions
const marketInsightService = {
  // Get all market reports
  getMarketReports: async (isFeatureFilter?: boolean): Promise<MarketReport[]> => {
    try {
      const params = isFeatureFilter ? { is_featured: true } : undefined;
      const response: AxiosResponse<MarketReport[]> = await api.get('/market-insights/reports/', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching market reports:', error);
      throw error;
    }
  },

  // Get market report by slug
  getMarketReportBySlug: async (slug: string): Promise<MarketReport> => {
    try {
      const response: AxiosResponse<MarketReport> = await api.get(`/market-insights/reports/${slug}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching market report with slug ${slug}:`, error);
      throw error;
    }
  },

  // Get all blog posts
  getBlogPosts: async (filters?: { tags?: string, is_published?: boolean }): Promise<BlogPost[]> => {
    try {
      const response: AxiosResponse<BlogPost[]> = await api.get('/market-insights/blog/', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  },

  // Get blog post by slug
  getBlogPostBySlug: async (slug: string): Promise<BlogPost> => {
    try {
      const response: AxiosResponse<BlogPost> = await api.get(`/market-insights/blog/${slug}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching blog post with slug ${slug}:`, error);
      throw error;
    }
  },
};

export default marketInsightService;
