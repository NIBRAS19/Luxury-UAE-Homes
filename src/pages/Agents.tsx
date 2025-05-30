
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Button } from '@/components/ui/button';
import { Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const agents = [
  {
    name: "Sarah Johnson",
    title: "Luxury Property Specialist",
    bio: "Sarah specializes in high-end properties in Downtown Dubai and Palm Jumeirah with over 10 years of experience.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    phone: "+971 50 123 4567",
    email: "sarah@eliteestates.ae"
  },
  {
    name: "Ahmed Al Mansoori",
    title: "Investment Advisor",
    bio: "Ahmed helps investors find the perfect opportunities in Dubai's dynamic real estate market with expertise in ROI optimization.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    phone: "+971 50 234 5678",
    email: "ahmed@eliteestates.ae"
  },
  {
    name: "Emma Williams",
    title: "Off-Plan Specialist",
    bio: "Emma has unparalleled knowledge of upcoming developments and helps clients secure the best units before public release.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    phone: "+971 50 345 6789",
    email: "emma@eliteestates.ae"
  },
  {
    name: "Mohammed Al Hashimi",
    title: "Commercial Properties Expert",
    bio: "Mohammed specializes in office spaces and retail properties across Business Bay and DIFC with extensive market knowledge.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    phone: "+971 50 456 7890",
    email: "mohammed@eliteestates.ae"
  },
  {
    name: "Sophia Chen",
    title: "International Client Relations",
    bio: "Sophia specializes in helping international buyers navigate Dubai's property market and investment opportunities.",
    image: "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    phone: "+971 50 567 8901",
    email: "sophia@eliteestates.ae"
  },
  {
    name: "James Wilson",
    title: "Luxury Villa Specialist",
    bio: "James focuses on premium villa communities including Emirates Hills and Al Barari with an eye for architectural detail.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    phone: "+971 50 678 9012",
    email: "james@eliteestates.ae"
  }
];

const Agents = () => {
  const { ref: introRef, animationClasses: introAnimation } = useScrollAnimation('fadeInUp');
  
  return (
    <PageLayout 
      title="Our Expert Agents"
      breadcrumbs={[
        { label: "Agents" }
      ]}
    >
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div ref={introRef} className={`${introAnimation} mb-12`}>
            <h2 className="text-3xl font-bold mb-2">Meet Our Team of Real Estate Professionals</h2>
            <p className="text-gray-600 max-w-3xl">
              Our agents are carefully selected for their expertise, market knowledge, and commitment to client satisfaction.
              With in-depth understanding of the UAE property market, they'll help you find your perfect property.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.name}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-80 overflow-hidden">
                  <img 
                    src={agent.image} 
                    alt={agent.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-deep-blue">{agent.name}</h3>
                  <p className="text-gold font-medium mb-2">{agent.title}</p>
                  <p className="text-gray-600 mb-4">{agent.bio}</p>
                  
                  <div className="flex flex-col space-y-2 mt-4">
                    <a href={`tel:${agent.phone}`} className="flex items-center text-deep-blue hover:text-gold transition-colors">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{agent.phone}</span>
                    </a>
                    <a href={`mailto:${agent.email}`} className="flex items-center text-deep-blue hover:text-gold transition-colors">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{agent.email}</span>
                    </a>
                  </div>
                  
                  <Button className="bg-deep-blue hover:bg-deep-blue/90 text-white w-full mt-4">
                    Contact Agent
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Agents;
