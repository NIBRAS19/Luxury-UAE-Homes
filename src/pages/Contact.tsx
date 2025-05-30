
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Contact = () => {
  const { ref: formRef, animationClasses: formAnimation } = useScrollAnimation('fadeInUp');
  const { ref: infoRef, animationClasses: infoAnimation } = useScrollAnimation('fadeInRight');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    toast({
      title: "Form submitted",
      description: "Thank you for contacting us. We'll get back to you shortly.",
    });
  };
  
  return (
    <PageLayout 
      title="Contact Us"
      breadcrumbs={[
        { label: "Contact" }
      ]}
    >
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Form */}
            <div ref={formRef} className={`${formAnimation} lg:w-2/3`}>
              <h2 className="text-2xl font-bold mb-6 text-deep-blue">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <Input
                      id="fullName"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="inquiry" className="text-sm font-medium text-gray-700">
                      Inquiry Type
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buy">Buying Property</SelectItem>
                        <SelectItem value="sell">Selling Property</SelectItem>
                        <SelectItem value="rent">Renting Property</SelectItem>
                        <SelectItem value="invest">Investment Opportunities</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry"
                    rows={6}
                    required
                  />
                </div>
                
                <Button type="submit" className="bg-gold hover:bg-gold/90 text-white w-full md:w-auto">
                  Submit Inquiry
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div ref={infoRef} className={`${infoAnimation} lg:w-1/3`}>
              <h2 className="text-2xl font-bold mb-6 text-deep-blue">Contact Information</h2>
              
              <div className="bg-sand-light rounded-lg p-6 shadow-md mb-8">
                <div className="flex items-start mb-6">
                  <MapPin className="text-gold mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Our Office</h3>
                    <p className="text-gray-700">
                      Elite Estates Building<br />
                      Sheikh Zayed Road<br />
                      Downtown Dubai, UAE
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start mb-6">
                  <Phone className="text-gold mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-700">+971 4 123 4567</p>
                    <p className="text-gray-700">+971 50 987 6543</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-gold mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-700">info@eliteestates.ae</p>
                    <p className="text-gray-700">sales@eliteestates.ae</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-deep-blue rounded-lg p-6 text-white shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="h-[400px] bg-gray-200 relative">
        <div className="absolute inset-0 pointer-events-none bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Interactive map would be displayed here</p>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
