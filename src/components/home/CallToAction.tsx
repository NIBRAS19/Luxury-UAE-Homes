
import React from 'react';
import { Button } from "@/components/ui/button";
import { Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();
  
  const handleBrowsePropertiesClick = () => {
    navigate('/properties');
  };
  
  const handleContactAgentClick = () => {
    navigate('/contact-agent');
  };
  
  return <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="relative bg-deep-blue rounded-xl overflow-hidden shadow-xl">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 h-full w-1/2 opacity-10">
            <div className="h-full w-full" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
            backgroundSize: '20px'
          }}></div>
          </div>

          {/* Gold Accent */}
          <div className="absolute top-0 left-0 h-full w-1 bg-gold"></div>

          <div className="relative py-14 px-8 md:px-14 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to Find Your Dream Property?</h3>
              <p className="text-white/70 max-w-lg">
                Connect with our expert agents for personalized assistance in buying, selling, or renting premium properties across the UAE.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-gold hover:bg-gold/90 text-white px-6"
                onClick={handleBrowsePropertiesClick}
              >
                Browse Properties
              </Button>
              <Button 
                variant="outline" 
                className="border-white hover:bg-white hover:text-deep-blue flex items-center text-base text-slate-950"
                onClick={handleContactAgentClick}
              >
                <Phone className="mr-2 h-4 w-4" /> Contact Agent
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default CallToAction;
