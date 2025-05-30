
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Sample data for area guides
const areas = [
  {
    id: 1,
    name: "Downtown Dubai",
    properties: 142,
    image: "https://images.unsplash.com/photo-1546412414-e1885259563a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  },
  {
    id: 2,
    name: "Palm Jumeirah",
    properties: 89,
    image: "https://images.unsplash.com/photo-1620490673158-57e17d6f6f5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  },
  {
    id: 3,
    name: "Dubai Marina",
    properties: 205,
    image: "https://images.unsplash.com/photo-1582538885592-e70463ae380f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  },
  {
    id: 4,
    name: "Jumeirah",
    properties: 76,
    image: "https://images.unsplash.com/photo-1550025899-5f8a21c56230?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  }
];

const AreaGuides = () => {
  const navigate = useNavigate();
  
  // Handle area click
  const handleAreaClick = (areaId) => {
    navigate(`/areas/${areaId}`);
  };
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore UAE's Premium Areas</h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the most exclusive neighborhoods and communities in the UAE with our comprehensive area guides.
          </p>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {areas.map((area) => (
            <div 
              key={area.id} 
              className="group cursor-pointer" 
              onClick={() => handleAreaClick(area.id)}
            >
              <div className="relative rounded-lg overflow-hidden h-80 shadow-md group-hover:shadow-xl transition-all">
                <img 
                  src={area.image} 
                  alt={area.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{area.name}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-white/90">{area.properties} Properties</p>
                    <span className="bg-gold/90 group-hover:bg-gold text-white p-2 rounded-full transition-colors">
                      <ChevronRight size={20} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Areas Link */}
        <div className="text-center mt-12">
          <Link to="/areas" className="inline-flex items-center text-deep-blue hover:text-gold font-medium transition-colors">
            View All Areas <ChevronRight className="ml-2" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AreaGuides;
