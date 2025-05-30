
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-deep-blue text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-white/70">Subscribe to our newsletter for exclusive property updates</p>
            </div>
            <div className="w-full md:w-1/3">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="px-4 py-3 w-full rounded-l-lg text-deep-blue focus:outline-none" 
                />
                <Button className="bg-gold hover:bg-gold/90 text-white rounded-l-none rounded-r-lg">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <Link to="/" className="text-2xl font-bold mb-6 block">
              <span className="text-gold">Elite</span>
              <span className="text-white">Estates</span>
            </Link>
            <p className="text-white/70 mb-6">
              Your trusted partner in the UAE luxury real estate market, providing exceptional service and expertise.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 hover:bg-gold transition-colors p-2 rounded-full">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-white/10 hover:bg-gold transition-colors p-2 rounded-full">
                <Twitter size={18} />
              </a>
              <a href="#" className="bg-white/10 hover:bg-gold transition-colors p-2 rounded-full">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-white/10 hover:bg-gold transition-colors p-2 rounded-full">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-white/70 hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/properties" className="text-white/70 hover:text-gold transition-colors">Properties</Link></li>
              <li><Link to="/agents" className="text-white/70 hover:text-gold transition-colors">Our Agents</Link></li>
              <li><Link to="/blog" className="text-white/70 hover:text-gold transition-colors">Blog & News</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Property Types</h4>
            <ul className="space-y-3">
              <li><Link to="/properties/apartments" className="text-white/70 hover:text-gold transition-colors">Apartments</Link></li>
              <li><Link to="/properties/villas" className="text-white/70 hover:text-gold transition-colors">Villas</Link></li>
              <li><Link to="/properties/penthouses" className="text-white/70 hover:text-gold transition-colors">Penthouses</Link></li>
              <li><Link to="/properties/commercial" className="text-white/70 hover:text-gold transition-colors">Commercial</Link></li>
              <li><Link to="/properties/off-plan" className="text-white/70 hover:text-gold transition-colors">Off-Plan</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 text-gold" size={20} />
                <span className="text-white/70">Downtown Dubai, Dubai, UAE</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-gold" size={20} />
                <span className="text-white/70">+971 4 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-gold" size={20} />
                <span className="text-white/70">info@eliteestates.ae</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm mb-4 md:mb-0">© 2025 EliteEstates. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link to="/terms" className="text-white/70 hover:text-gold transition-colors text-sm">Terms & Conditions</Link>
              <Link to="/privacy" className="text-white/70 hover:text-gold transition-colors text-sm">Privacy Policy</Link>
              <Link to="/sitemap" className="text-white/70 hover:text-gold transition-colors text-sm">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
