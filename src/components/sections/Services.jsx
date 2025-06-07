import { useState } from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const [activeTab, setActiveTab] = useState('services');
  
  // Services data
  const services = [
    {
      id: 1,
      icon: '💻',
      title: 'Web Development',
      description: 'Custom websites & web applications crafted with modern frameworks and optimized for performance.',
      features: ['Responsive Design', 'Cross-browser Compatibility', 'SEO Friendly', 'Performance Optimization']
    },
    {
      id: 2,
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that deliver exceptional user experiences and drive engagement.',
      features: ['User Research', 'Wireframing & Prototyping', 'Visual Design', 'Usability Testing']
    },
    {
      id: 3,
      icon: '📱',
      title: 'Mobile Development',
      description: 'Cross-platform mobile apps built with React Native that work flawlessly on iOS and Android.',
      features: ['Native-like Experience', 'Performance Optimization', 'Offline Functionality', 'App Store Deployment']
    },

  ];

  // Pricing plans
  const pricingPlans = [
    {
      name: 'Basic',
      price: 50,
      description: 'Perfect for small businesses just getting started.',
      features: [
        'Responsive Website Design',
        'Up to 5 Pages',
        'Basic SEO Setup',
        'Contact Form',
        'Mobile Friendly',
        '1 Month Support',
      ],
      highlighted: false,
    },
    {
      name: 'Standard',
      price: 200,
      description: 'Great for growing businesses looking to expand online.',
      features: [
        'Everything in Basic, plus:',
        'Up to 10 Pages',
        'CMS Integration',
        'Custom Animations',
        'Google Analytics Setup',
        '3 Months Support',
        '2 Revisions Included',
      ],
      highlighted: true,
    },
    {
      name: 'Premium',
      price: 500,
      description: 'For established businesses requiring advanced solutions.',
      features: [
        'Everything in Standard, plus:',
        'Unlimited Pages',
        'E-Commerce Functionality',
        'Advanced SEO & Marketing',
        'Performance Optimization',
        'User Authentication',
        '6 Months Support',
        'Unlimited Revisions',
      ],
      highlighted: false,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4">Services & Pricing</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            I offer a range of services to help bring your digital vision to life, with transparent pricing and exceptional value.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-background/40 backdrop-blur-sm rounded-lg p-1.5">
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                activeTab === 'services' ? 'bg-accent text-white' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('services')}
            >
              Services
            </button>
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                activeTab === 'pricing' ? 'bg-accent text-white' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('pricing')}
            >
              Pricing
            </button>
          </div>
        </div>

        {/* Services Content */}
        {activeTab === 'services' && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-primary/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-800 hover:border-accent/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-accent mr-2">✓</span>
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pricing Content */}
        {activeTab === 'pricing' && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
                  plan.highlighted 
                    ? 'bg-gradient-to-b from-secondary/20 to-primary/80 border border-secondary/50 scale-105 z-10' 
                    : 'bg-primary/30 border border-gray-800'
                }`}
              >
                {plan.highlighted && (
                  <div className="py-2 text-center bg-secondary text-white text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name} Plan</h3>
                  <div className="flex items-end gap-1 mb-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-400 pb-1">/ project</span>
                  </div>
                  <p className="text-gray-300 mb-6">{plan.description}</p>
                  
                  <div className="border-t border-gray-700 my-6"></div>
                  
                  <h4 className="text-lg font-semibold mb-4">What's included:</h4>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * idx }}
                      >
                        <span className={`mr-2 ${plan.highlighted ? 'text-secondary' : 'text-accent'}`}>✓</span>
                        <span className="text-gray-400">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-md font-medium transition-all duration-300 ${
                      plan.highlighted 
                        ? 'bg-gradient-to-r from-secondary to-accent text-white shadow-lg shadow-accent/20' 
                        : 'bg-gray-800 text-white hover:bg-accent/80'
                    }`}
                  >
                    Select Plan
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Call to action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg text-gray-300 mb-6">
            Need a custom solution? Let's discuss your specific requirements.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block px-8 py-3 rounded-md bg-gradient-to-r from-secondary to-accent text-white font-medium hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
          >
            Get a Custom Quote
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services; 