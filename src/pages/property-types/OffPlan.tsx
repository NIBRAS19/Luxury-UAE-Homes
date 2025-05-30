
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const OffPlan = () => {
  const { ref: introRef, animationClasses: introAnimation } = useScrollAnimation('fadeInUp');
  
  const offPlanProjects = [
    {
      name: "Celestia Residences",
      developer: "Emaar Properties",
      location: "Dubai Creek Harbour",
      completion: "Q4 2025",
      units: "Apartments, Penthouses",
      priceRange: "AED 1.5M - 8M",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      name: "Azure Garden",
      developer: "DAMAC Properties",
      location: "Jumeirah Village Circle",
      completion: "Q2 2026",
      units: "Apartments, Townhouses",
      priceRange: "AED 900K - 3M",
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      name: "Peninsula Vistas",
      developer: "Select Group",
      location: "Business Bay",
      completion: "Q1 2026",
      units: "Apartments, Offices",
      priceRange: "AED 1.2M - 7M",
      image: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      name: "Elysian Hills",
      developer: "Nakheel",
      location: "Dubai Hills Estate",
      completion: "Q3 2025",
      units: "Villas, Mansions",
      priceRange: "AED 8M - 25M",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      name: "Sapphire Tower",
      developer: "Meraas",
      location: "Dubai Marina",
      completion: "Q4 2026",
      units: "Apartments, Penthouses",
      priceRange: "AED 2M - 15M",
      image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      name: "Palm Oasis",
      developer: "Omniyat",
      location: "Palm Jumeirah",
      completion: "Q2 2027",
      units: "Villas, Penthouses",
      priceRange: "AED 15M - 80M",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    }
  ];
  
  return (
    <PageLayout 
      title="Off-Plan Properties"
      breadcrumbs={[
        { label: "Properties", href: "/properties" },
        { label: "Off-Plan" }
      ]}
    >
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div ref={introRef} className={`${introAnimation} mb-12`}>
            <h2 className="text-3xl font-bold mb-4 text-deep-blue">Invest in Tomorrow's Landmark Developments</h2>
            <p className="text-gray-600 max-w-3xl">
              Discover Dubai's most anticipated off-plan developments. Secure your investment at pre-launch prices 
              and benefit from flexible payment plans, potential capital appreciation, and the opportunity to 
              own a brand-new property in Dubai's evolving skyline.
            </p>
          </div>
          
          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="grid w-full grid-cols-4 mb-12">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="apartments">Apartments</TabsTrigger>
              <TabsTrigger value="villas">Villas</TabsTrigger>
              <TabsTrigger value="commercial">Commercial</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {offPlanProjects.map((project, index) => (
                  <OffPlanCard key={index} project={project} index={index} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="apartments">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {offPlanProjects
                  .filter(p => p.units.includes("Apartments"))
                  .map((project, index) => (
                    <OffPlanCard key={index} project={project} index={index} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="villas">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {offPlanProjects
                  .filter(p => p.units.includes("Villas") || p.units.includes("Townhouses") || p.units.includes("Mansions"))
                  .map((project, index) => (
                    <OffPlanCard key={index} project={project} index={index} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="commercial">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {offPlanProjects
                  .filter(p => p.units.includes("Offices"))
                  .map((project, index) => (
                    <OffPlanCard key={index} project={project} index={index} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Benefits of Off-Plan */}
          <div className="bg-sand-light p-8 rounded-lg shadow-md mb-16">
            <h3 className="text-2xl font-bold mb-6 text-center">Benefits of Off-Plan Investments</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-gold font-bold text-xl">1</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">Lower Entry Prices</h4>
                <p className="text-gray-600">
                  Off-plan properties typically offer attractive pricing, often 20-30% below completed properties in the same area.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-gold font-bold text-xl">2</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">Flexible Payment Plans</h4>
                <p className="text-gray-600">
                  Developers offer attractive payment schedules with smaller installments spread throughout the construction period.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-gold font-bold text-xl">3</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">Capital Appreciation</h4>
                <p className="text-gray-600">
                  Potential for significant value increase from purchase to completion, especially in high-demand areas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

interface ProjectProps {
  project: {
    name: string;
    developer: string;
    location: string;
    completion: string;
    units: string;
    priceRange: string;
    image: string;
  };
  index: number;
}

const OffPlanCard = ({ project, index }: ProjectProps) => {
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-gold text-white px-3 py-1 rounded-full text-sm font-medium">
          Off-Plan
        </div>
        <div className="absolute top-4 right-4 bg-deep-blue text-white px-3 py-1 rounded-full text-sm font-medium">
          {project.completion}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1 text-deep-blue">
          {project.name}
        </h3>
        <p className="text-gray-600 mb-4">
          {project.location}
        </p>
        
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">Developer</span>
            <span className="font-medium text-deep-blue">{project.developer}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">Property Types</span>
            <span className="font-medium text-deep-blue">{project.units}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Price Range</span>
            <span className="font-medium text-deep-blue">{project.priceRange}</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <Button className="w-full bg-gold hover:bg-gold/90 text-white">
            Explore Project
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default OffPlan;
