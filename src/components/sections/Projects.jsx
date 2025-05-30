import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // Project categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'web', name: 'Web Development' },
  ];

  // Project data
  const projectsData = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=800&auto=format&fit=crop',
      tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      description: 'A comprehensive e-commerce platform with advanced features like real-time filtering, cart functionality, and secure payment integration.',
      link: '#'
    },
    {
      id: 2,
      title: 'Finance Dashboard UI',
      category: 'design',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      tags: ['Figma', 'UI Kit', 'Responsive Design'],
      description: 'A modern finance dashboard design with intuitive navigation, data visualization, and dark/light mode themes.',
      link: '#'
    },
    {
      id: 3,
      title: 'Fitness Tracking App',
      category: 'app',
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop',
      tags: ['React Native', 'Firebase', 'App Design'],
      description: 'A mobile application for fitness enthusiasts to track workouts, set goals, and monitor progress with rich analytics.',
      link: '#'
    },
    {
      id: 4,
      title: 'Portfolio Website',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=800&auto=format&fit=crop',
      tags: ['React', 'Framer Motion', 'Tailwind CSS'],
      description: 'A creative portfolio website for a digital artist with interactive animations and image galleries.',
      link: '#'
    },
    {
      id: 5,
      title: 'Task Management UI',
      category: 'design',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop',
      tags: ['Figma', 'UI/UX', 'Wireframing'],
      description: 'A clean and minimal task management application design focused on productivity and ease of use.',
      link: '#'
    },
    {
      id: 6,
      title: 'Food Delivery App',
      category: 'app',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop',
      tags: ['React Native', 'Firebase', 'Google Maps API'],
      description: 'A food delivery application with real-time order tracking, restaurant discovery, and payment processing.',
      link: '#'
    },
  ];

  // Filter projects based on active category
  const filteredProjects = activeFilter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeFilter);

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

  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="projects" className="py-24 bg-primary/10">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4">My Projects</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A collection of my recent work, showcasing my skills in web development, UI/UX design, and application development.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 
                ${activeFilter === category.id 
                  ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                  : 'bg-background/40 text-gray-300 hover:bg-background/60 hover:text-white'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={projectVariants}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative bg-primary/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-accent/50 transition-all duration-300"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project image */}
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                  />
                </div>
                
                {/* Project info */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold">{project.title}</h3>
                    <span className="text-xs font-semibold px-2 py-1 bg-secondary/20 text-secondary rounded-full">
                      {categories.find(cat => cat.id === project.category)?.name}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-1 bg-background/50 text-gray-300 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">{project.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <button 
                      className="text-sm text-accent hover:text-white transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                    >
                      View Details
                    </button>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-white bg-accent/20 hover:bg-accent px-3 py-1 rounded-full transition-all duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Live Preview
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Project modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="relative bg-primary max-w-4xl w-full rounded-xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-video">
                  <img 
                    src={selectedProject.image}
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black transition-colors"
                    onClick={() => setSelectedProject(null)}
                  >
                    ✕
                  </button>
                </div>
                
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start flex-wrap gap-3 mb-4">
                    <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                    <span className="text-sm font-semibold px-3 py-1 bg-secondary/20 text-secondary rounded-full">
                      {categories.find(cat => cat.id === selectedProject.category)?.name}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-1 bg-background/50 text-gray-300 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-gray-300 mb-6">{selectedProject.description}</p>
                  
                  <div className="flex gap-4">
                    <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-2 rounded-md bg-gradient-to-r from-secondary to-accent text-white font-medium hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
                    >
                      View Live Site
                    </a>
                    <button
                      onClick={() => setSelectedProject(null)} 
                      className="px-6 py-2 rounded-md border border-gray-600 text-white font-medium hover:border-accent hover:text-accent transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects; 