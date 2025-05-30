
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Search, Calendar, User, Clock, Tag } from 'lucide-react';

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "Dubai Real Estate Market Trends in 2025",
    excerpt: "An in-depth analysis of current trends, emerging neighborhoods, and investment opportunities in Dubai's dynamic property market.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    date: "May 5, 2025",
    author: "Ahmed Al Mansoori",
    readTime: "8 min read",
    category: "Market Analysis",
    tags: ["Investment", "Market Trends", "Dubai"],
    featured: true
  },
  {
    id: 2,
    title: "The Rise of Sustainable Luxury in UAE Properties",
    excerpt: "How eco-conscious design and sustainability features are becoming essential elements in Dubai's premium real estate segment.",
    image: "https://images.unsplash.com/photo-1578302723082-90a5de295f82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    date: "April 28, 2025",
    author: "Sophia Rodriguez",
    readTime: "6 min read",
    category: "Architecture & Design",
    tags: ["Sustainability", "Luxury Living", "Design"],
    featured: false
  },
  {
    id: 3,
    title: "Foreign Investment in Dubai: New Regulations Explained",
    excerpt: "A comprehensive guide to the latest regulatory changes affecting international property investors in the UAE.",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
    date: "April 21, 2025",
    author: "James Chen",
    readTime: "10 min read",
    category: "Legal & Finance",
    tags: ["Investment", "Regulations", "International Buyers"],
    featured: false
  },
  {
    id: 4,
    title: "Inside Dubai's Most Exclusive Penthouses",
    excerpt: "A glimpse into the ultra-luxury penthouse market, featuring some of the most spectacular high-rise residences in the city.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    date: "April 15, 2025",
    author: "Sarah Al Qasimi",
    readTime: "7 min read",
    category: "Luxury Living",
    tags: ["Penthouses", "Luxury Properties", "Dubai Skyline"],
    featured: true
  },
  {
    id: 5,
    title: "The Complete Guide to Dubai's Waterfront Communities",
    excerpt: "Exploring the lifestyle, amenities, and investment potential of Dubai's most prestigious waterfront neighborhoods.",
    image: "https://images.unsplash.com/photo-1622653965572-2e71be978d08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    date: "April 8, 2025",
    author: "Michael Johnson",
    readTime: "9 min read",
    category: "Neighborhoods",
    tags: ["Waterfront", "Communities", "Lifestyle"],
    featured: false
  },
  {
    id: 6,
    title: "Smart Home Technology in Luxury UAE Properties",
    excerpt: "How cutting-edge home automation and technology integration is transforming the luxury real estate market in the UAE.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    date: "April 1, 2025",
    author: "Fatima Al Zaabi",
    readTime: "5 min read",
    category: "Technology",
    tags: ["Smart Homes", "Technology", "Innovation"],
    featured: false
  },
  {
    id: 7,
    title: "Navigating Property Financing in the UAE",
    excerpt: "Expert advice on mortgage options, financing strategies, and banking considerations for luxury property purchases in Dubai.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80",
    date: "March 25, 2025",
    author: "Robert Williams",
    readTime: "8 min read",
    category: "Legal & Finance",
    tags: ["Mortgages", "Financing", "Property Investment"],
    featured: false
  },
  {
    id: 8,
    title: "Dubai's Emerging Luxury Neighborhoods to Watch",
    excerpt: "Discover the up-and-coming areas in Dubai positioned to become the next hotspots for luxury real estate investment.",
    image: "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    date: "March 18, 2025",
    author: "Layla Mahmood",
    readTime: "7 min read",
    category: "Market Analysis",
    tags: ["Emerging Areas", "Investment", "Market Trends"],
    featured: false
  },
];

// Categories
const categories = [
  "All Categories",
  "Market Analysis",
  "Luxury Living",
  "Architecture & Design",
  "Legal & Finance",
  "Neighborhoods",
  "Technology",
  "Lifestyle",
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  
  // Filter posts based on search term and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All Categories' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-deep-blue h-[40vh] md:h-[50vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1583846783214-7229a91b20ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80" 
              alt="Luxury Property Interior" 
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumb className="mb-6 text-white/70">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-white/70 hover:text-white">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/50" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">Blog & Insights</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Blog & Insights</h1>
            <p className="text-xl text-white/80 max-w-2xl mb-8">
              Expert analysis, market trends, and insider perspectives on luxury real estate in the UAE.
            </p>
            
            <div className="relative max-w-xl">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 text-base"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        </section>
        
        {/* Categories */}
        <section className="bg-sand-light py-6">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto pb-3 scrollbar-hide">
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-gold text-white'
                        : 'bg-white text-deep-blue hover:bg-gold/10'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Posts */}
        {selectedCategory === 'All Categories' && searchTerm === '' && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-serif font-bold mb-8 text-deep-blue">Featured Articles</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative h-80">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="flex items-center mb-2">
                            <span className="bg-gold text-white text-xs font-medium px-3 py-1 rounded-full">
                              {post.category}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">{post.title}</h3>
                          <div className="flex items-center text-white/80 text-sm space-x-4">
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center">
                              <User size={14} className="mr-1" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock size={14} className="mr-1" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* All Posts */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold mb-8 text-deep-blue">
              {searchTerm ? 'Search Results' : selectedCategory === 'All Categories' ? 'Latest Articles' : `${selectedCategory} Articles`}
            </h2>
            
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden shadow-md hover:shadow-xl transition-all hover:translate-y-[-5px]">
                    <CardContent className="p-0">
                      <div className="relative h-56">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-gold text-white text-xs font-medium px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-deep-blue mb-2 line-clamp-2">{post.title}</h3>
                        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center text-gray-500 text-xs space-x-4 mb-4">
                          <div className="flex items-center">
                            <Calendar size={12} className="mr-1" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={12} className="mr-1" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 flex items-center justify-center overflow-hidden">
                              <User size={16} className="text-gray-600" />
                            </div>
                            <span className="text-sm font-medium">{post.author}</span>
                          </div>
                          <Button variant="link" className="text-gold p-0 h-auto">Read More</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mb-4 text-gray-400">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-deep-blue mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any articles matching your search criteria.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All Categories');
                  }}
                  className="border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-white"
                >
                  Reset Filters
                </Button>
              </div>
            )}
            
            {/* Pagination */}
            {filteredPosts.length > 0 && (
              <div className="mt-12 flex justify-center">
                <div className="flex space-x-2">
                  <Button variant="outline" className="border-gray-300" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" className="border-gray-300 bg-gold text-white">1</Button>
                  <Button variant="outline" className="border-gray-300">2</Button>
                  <Button variant="outline" className="border-gray-300">3</Button>
                  <Button variant="outline" className="border-gray-300">Next</Button>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Subscribe Section */}
        <section className="py-16 bg-deep-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-serif font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-white/80 mb-8">
                Stay updated with the latest market insights, property trends, and exclusive offerings delivered directly to your inbox.
              </p>
              <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button className="bg-gold hover:bg-gold/90 text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
