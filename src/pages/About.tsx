
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { motion } from 'framer-motion';

const About = () => {
  const { ref: missionRef, animationClasses: missionAnimation } = useScrollAnimation('fadeInUp');
  const { ref: valuesRef, animationClasses: valuesAnimation } = useScrollAnimation('fadeInUp');
  const { ref: teamRef, animationClasses: teamAnimation } = useScrollAnimation('fadeInUp');
  
  return (
    <PageLayout 
      title="About Elite Estates"
      breadcrumbs={[
        { label: "About Us" }
      ]}
    >
      {/* Company Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-deep-blue">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2010, Elite Estates has established itself as a premier luxury real estate agency in the UAE. 
                We specialize in high-end properties across Dubai and Abu Dhabi, catering to discerning clients who seek 
                exceptional homes and investment opportunities.
              </p>
              <p className="text-gray-700 mb-4">
                With over a decade of experience in the UAE's dynamic property market, we've built a reputation for excellence, 
                integrity, and unparalleled market knowledge. Our team of expert agents combines local expertise with global 
                perspective to deliver outstanding results for our clients.
              </p>
              <p className="text-gray-700">
                Whether you're looking to buy, sell, or rent a luxury property, our personalized approach ensures that 
                we find the perfect match for your unique requirements and preferences.
              </p>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                alt="Elite Estates Office" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-16 bg-sand-light">
        <div className="container mx-auto px-4">
          <div ref={missionRef} className={`${missionAnimation}`}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-deep-blue">Our Mission & Vision</h2>
              <div className="mx-auto max-w-3xl">
                <p className="text-xl font-light italic text-gray-700 mb-8">
                  "To transform the luxury real estate experience through exceptional service, 
                  integrity, and innovation, creating lasting value for our clients."
                </p>
                <p className="text-gray-700">
                  At Elite Estates, we envision a future where finding your dream property is an exciting journey, 
                  not a stressful process. We strive to be the most trusted name in UAE luxury real estate, 
                  known for our personalized approach and unwavering commitment to client satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div ref={valuesRef} className={`text-center mb-12 ${valuesAnimation}`}>
            <h2 className="text-3xl font-bold mb-2 text-deep-blue">Our Core Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do at Elite Estates
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                description: "We strive for excellence in every aspect of our service, from property selection to client communication and transaction management."
              },
              {
                title: "Integrity",
                description: "We operate with complete transparency and honesty, always putting our clients' interests first and building relationships based on trust."
              },
              {
                title: "Innovation",
                description: "We embrace new technologies and approaches to continuously improve our services and stay ahead in a dynamic market."
              },
              {
                title: "Personalization",
                description: "We recognize that each client is unique, tailoring our approach to meet individual needs, preferences and goals."
              },
              {
                title: "Market Expertise",
                description: "We maintain in-depth knowledge of the UAE property market, providing valuable insights to help clients make informed decisions."
              },
              {
                title: "Long-term Relationships",
                description: "We focus on building lasting relationships with our clients, becoming trusted advisors for all their real estate needs."
              }
            ].map((value, index) => (
              <motion.div 
                key={value.title}
                className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-gold"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-3 text-deep-blue">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Overview */}
      <section className="py-16 bg-deep-blue text-white">
        <div className="container mx-auto px-4">
          <div ref={teamRef} className={`text-center mb-12 ${teamAnimation}`}>
            <h2 className="text-3xl font-bold mb-2">Our Team</h2>
            <p className="text-white/70 max-w-3xl mx-auto">
              Our team of experienced professionals is dedicated to providing exceptional service and expertise
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="stats text-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-4xl font-bold text-gold mb-2">15+</div>
                <div className="text-white/80">Years of Experience</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-4xl font-bold text-gold mb-2">30+</div>
                <div className="text-white/80">Expert Agents</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-4xl font-bold text-gold mb-2">500+</div>
                <div className="text-white/80">Properties Sold</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-4xl font-bold text-gold mb-2">98%</div>
                <div className="text-white/80">Client Satisfaction</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
