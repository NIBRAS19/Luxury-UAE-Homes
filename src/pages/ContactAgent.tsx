
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Phone, Mail, Calendar, User, MapPin, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from "@/components/ui/use-toast";

const agentData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Luxury Property Specialist",
    areas: ["Dubai Marina", "Palm Jumeirah", "Downtown Dubai"],
    languages: ["English", "Arabic", "French"],
    experience: "12 years",
    sales: "AED 1.2B+",
    phone: "+971 50 123 4567",
    email: "sarah.j@luxuryproperties.ae",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    bio: "Sarah specializes in ultra-luxury properties across Dubai's most prestigious neighborhoods. With over a decade of experience, she has built a reputation for discretion, market knowledge, and exceptional service."
  },
  {
    id: 2,
    name: "Mohammed Al Farsi",
    role: "Investment Property Consultant",
    areas: ["Business Bay", "Dubai Hills", "Emirates Hills"],
    languages: ["Arabic", "English", "Urdu"],
    experience: "8 years",
    sales: "AED 800M+",
    phone: "+971 50 987 6543",
    email: "mohammed.f@luxuryproperties.ae",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    bio: "Mohammed specializes in investment properties and has helped numerous international clients build profitable real estate portfolios in the UAE. His deep understanding of market trends and ROI opportunities makes him a valuable advisor."
  },
  {
    id: 3,
    name: "Elena Petrova",
    role: "Waterfront Property Expert",
    areas: ["Palm Jumeirah", "Bluewaters Island", "Dubai Creek Harbour"],
    languages: ["English", "Russian", "Arabic"],
    experience: "10 years",
    sales: "AED 950M+",
    phone: "+971 50 456 7890",
    email: "elena.p@luxuryproperties.ae",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    bio: "Elena is recognized as one of Dubai's leading waterfront property specialists. Her portfolio includes some of the most exclusive beachfront villas and premium waterfront apartments in the emirate."
  }
];

const ContactAgent = () => {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Request Sent",
        description: selectedAgent 
          ? `Your request has been sent to ${selectedAgent.name}. They will contact you shortly.`
          : "Your request has been sent. Our team will contact you shortly.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        budget: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <PageLayout 
      title="Contact Our Luxury Property Experts"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Contact an Agent" }
      ]}
    >
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Our Luxury Property Specialists</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              Our team of experienced luxury property specialists is dedicated to providing personalized service 
              and expert guidance throughout your property journey in the UAE.
            </p>
          </div>

          {/* Agent Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {agentData.map((agent) => (
              <motion.div
                key={agent.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 
                  ${selectedAgent?.id === agent.id ? 'ring-2 ring-gold' : ''}`}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedAgent(agent)}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={agent.image} 
                    alt={agent.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 font-serif">{agent.name}</h3>
                  <p className="text-gold font-medium mb-2">{agent.role}</p>
                  
                  <div className="space-y-3 mb-4 text-sm">
                    <div className="flex items-start">
                      <MapPin size={16} className="mr-2 mt-1 text-gray-500" />
                      <span className="text-gray-700">{agent.areas.join(", ")}</span>
                    </div>
                    <div className="flex items-center">
                      <Building size={16} className="mr-2 text-gray-500" />
                      <span className="text-gray-700">Sales: {agent.sales}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-gray-500" />
                      <span className="text-gray-700">{agent.experience} experience</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <Button 
                      className={`w-full ${selectedAgent?.id === agent.id ? 'bg-gold' : 'bg-deep-blue'} hover:bg-gold/90 text-white`}
                      onClick={() => setSelectedAgent(agent)}
                    >
                      Contact {agent.name.split(' ')[0]}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Agent Info - When Selected */}
              {selectedAgent && (
                <div className="lg:col-span-4 bg-deep-blue text-white p-8">
                  <div className="mb-8 flex items-center">
                    <img 
                      src={selectedAgent.image} 
                      alt={selectedAgent.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-white mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-bold">{selectedAgent.name}</h3>
                      <p className="text-gold">{selectedAgent.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-white/80 mb-8">{selectedAgent.bio}</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone size={18} className="mr-3 text-gold" />
                      <span>{selectedAgent.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail size={18} className="mr-3 text-gold" />
                      <span>{selectedAgent.email}</span>
                    </div>
                    <div className="flex items-center">
                      <User size={18} className="mr-3 text-gold" />
                      <span>Languages: {selectedAgent.languages.join(", ")}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Form Section */}
              <div className={`${selectedAgent ? 'lg:col-span-8' : 'lg:col-span-12'} p-8`}>
                <h3 className="text-2xl font-bold mb-6">
                  {selectedAgent 
                    ? `Contact ${selectedAgent.name}` 
                    : "Contact Our Luxury Property Team"}
                </h3>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Name*</label>
                      <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Smith"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                      <Input 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                      <Input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+971 50 123 4567"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Property Type</label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                      >
                        <option value="">Select Property Type</option>
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="penthouse">Penthouse</option>
                        <option value="commercial">Commercial</option>
                        <option value="off-plan">Off-Plan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                      >
                        <option value="">Select Budget Range</option>
                        <option value="1-5M">AED 1-5 Million</option>
                        <option value="5-10M">AED 5-10 Million</option>
                        <option value="10-20M">AED 10-20 Million</option>
                        <option value="20-50M">AED 20-50 Million</option>
                        <option value="50M+">AED 50+ Million</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                      <Textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please provide details about your property requirements or questions"
                        className="w-full min-h-[120px]"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gold hover:bg-gold/90 text-white px-8 py-3"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Request'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContactAgent;
