
import React from 'react';
import { Star } from 'lucide-react';

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Al Mansouri",
    role: "Property Investor",
    comment: "Elite Estates made finding my dream home in Dubai Marina an incredibly smooth process. Their expert team understood exactly what I was looking for and negotiated the best possible deal.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  },
  {
    id: 2,
    name: "Mohammed Al Qasimi",
    role: "Homeowner",
    comment: "I've worked with many real estate agencies in the UAE, but Elite Estates stands out for their professionalism and attention to detail. They helped me sell my property at an excellent price.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  },
  {
    id: 3,
    name: "Amanda Johnson",
    role: "Expatriate Buyer",
    comment: "As an expatriate, purchasing property in the UAE seemed daunting until I found Elite Estates. Their knowledge of legal requirements and market trends was invaluable in my investment journey.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  }
];

const Testimonials = () => {
  // Function to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={18} 
          className={i < rating ? "text-gold fill-gold" : "text-gray-300"} 
        />
      );
    }
    return stars;
  };

  return (
    <section className="py-20 relative bg-cover bg-center" style={{ 
      backgroundImage: 'url("https://images.unsplash.com/photo-1626268220135-393bd213daf5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")'
    }}>
      <div className="absolute inset-0 bg-deep-blue/70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Our Clients Say</h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-4"></div>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Hear from our satisfied clients about their experience working with Elite Estates.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="mb-4 flex">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-gray-700">
                "{testimonial.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
