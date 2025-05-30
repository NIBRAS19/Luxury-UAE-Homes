
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const LuxuryLiving = () => {
  const navigate = useNavigate();
  
  const handleExploreClick = () => {
    navigate('/properties');
  };
  
  const handleContactAgentClick = () => {
    navigate('/contact-agent');
  };
  
  return <section className="luxury-section py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience Luxury Living in the UAE</h2>
            <div className="w-20 h-1 bg-gold mb-6"></div>
            <p className="text-white/80 mb-8 text-lg">
              The UAE real estate market offers unparalleled luxury and investment opportunities. From stunning beachfront villas to sophisticated urban apartments, discover properties that redefine opulence.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xl font-medium mb-3 flex items-center">
                  <span className="bg-gold h-8 w-8 rounded-full flex items-center justify-center mr-3">1</span>
                  Premium Locations
                </h3>
                <p className="text-white/70 pl-11">
                  Access to the most sought-after neighborhoods and communities across the UAE.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-3 flex items-center">
                  <span className="bg-gold h-8 w-8 rounded-full flex items-center justify-center mr-3">2</span>
                  Exclusive Amenities
                </h3>
                <p className="text-white/70 pl-11">
                  World-class facilities including private beaches, infinity pools, and concierge services.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-3 flex items-center">
                  <span className="bg-gold h-8 w-8 rounded-full flex items-center justify-center mr-3">3</span>
                  Investment Potential
                </h3>
                <p className="text-white/70 pl-11">
                  Strong returns and capital appreciation in one of the world's most dynamic markets.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-3 flex items-center">
                  <span className="bg-gold h-8 w-8 rounded-full flex items-center justify-center mr-3">4</span>
                  Expert Guidance
                </h3>
                <p className="text-white/70 pl-11">
                  Professional advice from industry experts to make informed decisions.
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-gold hover:bg-gold/90 text-white"
                onClick={handleExploreClick}
              >
                Explore Properties
              </Button>
              <Button 
                variant="outline" 
                className="border-white hover:bg-white hover:text-deep-blue text-slate-950"
                onClick={handleContactAgentClick}
              >
                Contact an Agent
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Luxury Living" className="rounded-lg shadow-2xl w-full" />
              {/* Gold accent */}
              <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-gold/20 rounded-lg -z-10"></div>
              <div className="absolute -top-5 -right-5 w-32 h-32 bg-gold/20 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default LuxuryLiving;
