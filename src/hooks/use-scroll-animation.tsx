
import { useInView } from 'framer-motion';
import { useRef } from 'react';

type AnimationVariant = 
  | 'fadeIn'
  | 'fadeInUp'
  | 'fadeInDown'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'zoomIn'
  | 'scaleUp';

type AnimationOptions = {
  threshold?: number;
  once?: boolean;
  delay?: number;
};

export const useScrollAnimation = (
  variant: AnimationVariant = 'fadeIn',
  options: AnimationOptions = {}
) => {
  const { threshold = 0.2, once = true, delay = 0 } = options;
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  // Base animation classes that will be applied when element is in view
  const baseClasses = "opacity-0 transition-all duration-700";
  
  // Animation variants
  const variants = {
    fadeIn: "opacity-0",
    fadeInUp: "opacity-0 translate-y-10",
    fadeInDown: "opacity-0 -translate-y-10",
    fadeInLeft: "opacity-0 translate-x-10",
    fadeInRight: "opacity-0 -translate-x-10",
    zoomIn: "opacity-0 scale-95",
    scaleUp: "opacity-0 scale-90",
  };

  // Animation styles based on whether element is in view
  const animationClasses = isInView 
    ? `opacity-100 translate-x-0 translate-y-0 scale-100 delay-[${delay}ms]`
    : variants[variant];

  return { ref, animationClasses: `${baseClasses} ${animationClasses}`, isInView };
};
