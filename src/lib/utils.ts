
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Luxury design utility functions
export const formatCurrency = (amount: number, currency = "AED", options = {}) => {
  const formatter = new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options
  });
  
  return formatter.format(amount);
};

// Generate dynamic blur data URL for progressive image loading
export const createBlurDataUrl = () => {
  return "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23f5f5f5'/%3E%3Crect width='100%25' height='100%25' filter='url(%23b)' fill='%23aaaaaa' fill-opacity='.5'/%3E%3C/svg%3E";
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

// Format large numbers with commas
export const formatNumber = (number: number): string => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Create staggered delay for children animations
export const staggeredDelay = (index: number, baseDelay = 0.1): number => {
  return baseDelay * index;
};
