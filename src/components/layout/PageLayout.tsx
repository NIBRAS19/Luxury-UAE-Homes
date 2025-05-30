
import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumbs?: {
    label: string;
    href?: string;
  }[];
}

const PageLayout = ({ children, title, breadcrumbs = [] }: PageLayoutProps) => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      
      <main>
        {/* Page header section */}
        <section className="bg-deep-blue text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{title}</h1>
            
            {breadcrumbs && breadcrumbs.length > 0 && (
              <Breadcrumb className="py-3">
                <BreadcrumbList className="text-white/70">
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/">
                        <Home className="h-4 w-4" />
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-white/50" />
                  
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbItem>
                          <BreadcrumbPage className="text-gold">{crumb.label}</BreadcrumbPage>
                        </BreadcrumbItem>
                      ) : (
                        <BreadcrumbItem>
                          <BreadcrumbLink asChild>
                            <Link to={crumb.href || '#'}>{crumb.label}</Link>
                          </BreadcrumbLink>
                          <BreadcrumbSeparator className="text-white/50" />
                        </BreadcrumbItem>
                      )}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </div>
        </section>
        
        {/* Page content */}
        {children}
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default PageLayout;
