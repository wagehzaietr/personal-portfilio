import { useState } from 'react';
import { motion } from 'framer-motion';


const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: 'in', href: '#' },
    { name: 'Instagram', icon: '📸', href: 'https://www.instagram.com/wageh_zaetr?igsh=MWJ4eGMwNmx4bjZvbQ==' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer id="contact" className="bg-primary py-20">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Connect</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">Ready to start a project or just want to say hello? Get in touch with me using the form below.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-background/30 backdrop-blur-md p-8 rounded-xl shadow-xl"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <motion.div className="mb-6" variants={childVariants}>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-background/50 border border-gray-700 rounded-md p-3 text-black focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Your name"
                  />
                </motion.div>
                
                <motion.div className="mb-6" variants={childVariants}>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-background/50 border border-gray-700 rounded-md p-3 text-black focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="your.email@example.com"
                  />
                </motion.div>
                
                <motion.div className="mb-6" variants={childVariants}>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full bg-background/50 border border-gray-700 rounded-md p-3 text-black focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="How can I help you?"
                  ></textarea>
                </motion.div>
                
                <motion.div variants={childVariants}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-secondary to-accent text-white py-3 px-6 rounded-md font-medium transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:translate-y-[-2px]'}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </motion.div>
              </form>
            ) : (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-accent mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-300">Thank you for reaching out. I'll get back to you shortly.</p>
              </motion.div>
            )}
          </motion.div>
          
          {/* Contact Info & Social Media */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-between"
          >
            <div>
              <motion.h3 variants={childVariants} className="text-2xl font-bold mb-4">Contact Information</motion.h3>
              <motion.p variants={childVariants} className="text-gray-300 mb-2"><span className="font-medium text-accent">Email:</span> bad1game1@hotmail.com</motion.p>
              <motion.p variants={childVariants} className="text-gray-300 mb-2"><span className="font-medium text-accent">Phone:</span>/</motion.p>
              <motion.p variants={childVariants} className="text-gray-300 mb-8"><span className="font-medium text-accent">Location:</span> Damascus, Syria</motion.p>
            </div>
            

            
            <motion.div variants={childVariants} className="mt-12">
              <a 
                href="#home"
                className="group flex items-center text-gray-400 hover:text-accent transition-all duration-300"
              >
                <span className="mr-2">Back to top</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 transform group-hover:-translate-y-1 transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-20 pt-8 border-t border-gray-800 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>© {new Date().getFullYear()} Wageh Zaietr. All Rights Reserved.</p>
          <p className="mt-1 text-sm">Designed & Developed with ❤️</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 