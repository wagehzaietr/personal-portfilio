import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projectsData } from '../data/data'
import { getProjectTranslation } from '../../utils/translations'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 3 // Change this number to show more/less projects per page

  // Project categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'web', name: 'web' },
    { id: 'web-app', name: 'web-app' },
    { id: 'latest', name: 'Latest' },  // Add this
  ]


  const filteredProjects = 
  activeFilter === 'all'
    ? [...projectsData].sort((a, b) => b.isLatest - a.isLatest)
    : activeFilter === 'latest'
    ? projectsData.filter(project => project.isLatest)
    : projectsData.filter(project => project.category === activeFilter)
      .sort((a, b) => b.isLatest - a.isLatest);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject)

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 }
    }
  }

  // Handle filter change
  const handleFilterChange = (id) => {
    setActiveFilter(id)
    setCurrentPage(1) 
  }

  return (
    <section id='projects' className='py-24 bg-primary/10'>
      <div className='container mx-auto px-4 md:px-8'>
        {/* Section header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className='font-semibold text-4xl md:text-6xl'>My Projects</h3>
          <svg
            viewBox='0 0 100 10'
            className='mx-auto mt-3 h-10 w-[300px] text-indigo-500'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path d='M0,5 Q25,0 50,5 T100,5' />
          </svg>
          <p className='text-lg text-gray-300 max-w-2xl mx-auto'>
            A collection of my recent work, showcasing my skills in web
            development, UI/UX design, and application development.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <div className='flex justify-center flex-wrap gap-3 mb-12'>
          {categories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => handleFilterChange(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 
                ${
                  activeFilter === category.id
                    ? 'bg-accent text-white shadow-lg shadow-accent/20'
                    : 'bg-background/40 text-gray-300 hover:bg-background/60 hover:text-white'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Projects grid with pagination */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentPage} // Key change triggers animation
            variants={pageVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{ duration: 0.5 }}
          >
            <motion.div
              variants={containerVariants}
              initial='hidden'
              animate='visible'
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
            >
              
              <AnimatePresence>
                {currentProjects.map(project => (
                  <motion.div
                    key={project.id}
                    variants={projectVariants}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className='relative bg-primary/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-accent/50 transition-all duration-300'
                  >
                    {/* Project content remains the same */}
                    <div className='aspect-video overflow-hidden'>
                      <img
                        src={project.image}
                        alt={project.title}
                        loading='lazy'
                        className='w-full h-full object-cover transition-all duration-500 hover:scale-110'
                      />
            
                    </div>
                    {project.isHot && (
                      <span className='absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold'>
                        Hot
                      </span>
                    )}
                    {project.isAiPowerd && (
                      <span className='absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold'>
                        AI Powered
                      </span>
                    )}
                   

                    <div className='p-5'>
                      <div className='flex justify-between items-start mb-2'>
                        <h3 className='text-lg font-bold'>
                          {getProjectTranslation('en', project.id, 'title')}
                        </h3>
                        <span className='text-xs font-semibold px-2 py-1 bg-secondary/20 text-secondary rounded-full'>
                          {categories.find(cat => cat.id === project.category)?.name}
                        </span>
                      </div>

                      <div className='flex flex-wrap gap-2 mb-4'>
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className='text-xs px-2 py-1 bg-background/50 text-gray-300 rounded-md'
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className='text-gray-400 text-sm line-clamp-2 mb-4'>
                        {getProjectTranslation('en', project.id, 'description')}
                      </p>

                      <div className='flex justify-between items-center'>
                        <Link
                          to={`/project/${project.id}`}
                          className='text-sm text-accent hover:text-white transition-colors'
                        >
                          View Details
                        </Link>
                        <a
                          href={project.link}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-sm font-medium text-white bg-accent/20 hover:bg-accent px-3 py-1 rounded-full transition-all duration-300'
                        >
                          Live Preview
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className='flex justify-center mt-10'>
            {/* Previous button */}
            <motion.button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`mx-1 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 border ${
                currentPage === 1
                  ? 'bg-gray-600/30 text-gray-400 border-gray-600/30 cursor-not-allowed'
                  : 'bg-background/40 text-gray-300 border-gray-600 hover:bg-background/60 hover:text-white'
              }`}
            >
              Previous
            </motion.button>



            {/* Next button */}
            <motion.button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`mx-1 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 border ${
                currentPage === totalPages
                  ? 'bg-gray-600/30 text-gray-400 border-gray-600/30 cursor-not-allowed'
                  : 'bg-background/40 text-gray-300 border-gray-600 hover:bg-background/60 hover:text-white'
              }`}
            >
              Next
            </motion.button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects