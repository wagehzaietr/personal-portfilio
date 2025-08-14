import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projectsData } from '../data/data'
import { getProjectTranslation } from '../../utils/translations'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  
  // Configuration
  const config = {
    projectsPerPage: 3,
    animationDuration: 0.2,
    staggerDelay: 0.06
  }

  // Project categories with icons
  const categories = [
    { id: 'all', name: 'All Projects', icon: '🎯' },
    { id: 'web', name: 'Websites', icon: '🌐' },
    { id: 'web-app', name: 'Web Apps', icon: '⚡' },
    { id: 'latest', name: 'Latest', icon: '🔥' },
  ]

  // Memoized filtered projects for better performance
  const filteredProjects = useMemo(() => {
    let projects = [...projectsData]
    
    if (activeFilter === 'latest') {
      return projects.filter(project => project.isLatest)
    }
    
    if (activeFilter !== 'all') {
      projects = projects.filter(project => project.category === activeFilter)
    }
    
    return projects.sort((a, b) => b.isLatest - a.isLatest)
  }, [activeFilter])

  // Pagination calculations
  const pagination = useMemo(() => {
    const totalPages = Math.ceil(filteredProjects.length / config.projectsPerPage)
    const indexOfLastProject = currentPage * config.projectsPerPage
    const indexOfFirstProject = indexOfLastProject - config.projectsPerPage
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject)
    
    return { totalPages, currentProjects, totalProjects: filteredProjects.length }
  }, [filteredProjects, currentPage, config.projectsPerPage])

  // Handlers
  const handleFilterChange = useCallback((id) => {
    setActiveFilter(id)
    setCurrentPage(1)
  }, [])

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page)
    // Smooth scroll to projects section
    document.getElementById('projects')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    })
  }, [])

  // Animation variants
  const animations = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { 
          staggerChildren: config.staggerDelay,
          delayChildren: 0.1
        }
      }
    },
    
    project: {
      hidden: { opacity: 0, y: 30, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { 
          type: 'spring', 
          stiffness: 100, 
          damping: 15,
          duration: config.animationDuration
        }
      },
      exit: {
        opacity: 0,
        y: -30,
        scale: 0.95,
        transition: { duration: 0.2 }
      }
    },

    page: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
      transition: { duration: config.animationDuration }
    }
  }

  return (
    <section id='projects' className='py-20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5'>
      <div className='container mx-auto px-4 md:px-8 max-w-7xl'>
        
        {/* Enhanced Header */}
        <motion.header
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          
          <h2 className='font-bold text-4xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-white via-gray-200 to-accent bg-clip-text text-transparent'>
            Featured Projects
          </h2>
          
          <div className='w-24 h-1 bg-gradient-to-r from-accent to-secondary mx-auto mb-6 rounded-full'></div>
          
          <p className='text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'>
            Discover my latest work in web development, featuring modern technologies 
            and innovative solutions that bring ideas to life.
          </p>
        </motion.header>

        {/* Enhanced Filter Buttons */}
        <motion.div 
          className='flex justify-center flex-wrap gap-3 mb-12'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => handleFilterChange(category.id)}
              className={`group relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border 
                ${activeFilter === category.id
                  ? 'bg-accent text-white border-accent scale-105'
                  : 'bg-background/20 text-gray-300 border-gray-700/50 hover:bg-background/40 hover:text-white hover:border-gray-600'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className='flex items-center gap-2'>
                <span className='text-base'>{category.icon}</span>
                {category.name}
              </span>
              
              {activeFilter === category.id && (
                <motion.div
                  className='absolute inset-0 bg-accent/20 rounded-full'
                  layoutId='activeFilter'
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Count */}
        <motion.div 
          className='text-center mb-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={activeFilter}
        >
          <p className='text-gray-400 text-sm'>
            Showing {pagination.currentProjects.length} of {pagination.totalProjects} projects
          </p>
        </motion.div>

        {/* Enhanced Projects Grid */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={`${currentPage}-${activeFilter}`}
            {...animations.page}
          >
            <motion.div
              variants={animations.container}
              initial='hidden'
              animate='visible'
              className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'
            >
              {pagination.currentProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  categories={categories}
                  variants={animations.project}
                  index={index}
                />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Pagination */}
        {pagination.totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  )
}

// Separate ProjectCard component for better organization
const ProjectCard = ({ project, categories, variants, index }) => (
  <motion.article
    variants={variants}
    whileHover={{ 
      y: -12, 
      transition: { duration: 0.3, ease: "easeOut" }
    }}
    className='group relative bg-gradient-to-br from-primary/20 to-primary/5  rounded-2xl overflow-hidden border border-gray-800/50 hover:border-accent/30 transition-all duration-500 '
  >
    {/* Project Image */}
    <div className='relative aspect-video overflow-hidden'>
      <img
        src={project.image}
        alt={project.title}
        loading='lazy'
        className='w-full h-full object-contain transition-all duration-700 group-hover:scale-110'
      />
      
      {/* Overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      
      {/* Badges */}
      <div className='absolute top-3 left-3 flex gap-2'>
        {project.isHot && (
          <span className='bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold'>
            🔥 Hot
          </span>
        )}
        {project.isAiPowerd && (
          <span className='bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold'>
            🤖 AI Powered
          </span>
        )}
      </div>
    </div>

    {/* Project Content */}
    <div className='p-6'>
      <div className='flex justify-between items-start mb-3'>
        <h3 className='text-xl font-bold text-white group-hover:text-accent transition-colors duration-300 line-clamp-1'>
          {getProjectTranslation('en', project.id, 'title')}
        </h3>
        <span className='text-xs font-semibold px-3 py-1 bg-secondary/20 text-secondary rounded-full whitespace-nowrap ml-2'>
          {categories.find(cat => cat.id === project.category)?.name}
        </span>
      </div>

      {/* Tags */}
      <div className='flex flex-wrap gap-2 mb-4'>
        {project.tags.slice(0, 4).map((tag, tagIndex) => (
          <span
            key={tagIndex}
            className='text-xs px-2 py-1 bg-background/30 text-gray-300 rounded-md border border-gray-700/50 hover:border-accent/50 transition-colors duration-200'
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 4 && (
          <span className='text-xs px-2 py-1 text-gray-400'>
            +{project.tags.length - 4} more
          </span>
        )}
      </div>

      <p className='text-gray-400 text-sm line-clamp-2 mb-6 leading-relaxed'>
        {getProjectTranslation('en', project.id, 'description')}
      </p>

      {/* Action Buttons */}
      <div className='flex gap-3'>
        <Link
          to={`/project/${project.id}`}
          className='flex-1 text-center py-2 px-4 bg-background/40 hover:bg-background/60 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm font-medium border border-gray-700/50 hover:border-gray-600'
        >
          View Details
        </Link>
        <a
          href={project.link}
          target='_blank'
          rel='noopener noreferrer'
          className='flex-1 text-center py-2 px-4 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent text-white rounded-lg transition-all duration-300 text-sm font-medium '
        >
          Live Demo
        </a>
      </div>
    </div>
  </motion.article>
)

// Separate Pagination component
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }
    
    return pages
  }

  return (
    <motion.nav 
      className='flex justify-center items-center mt-16 gap-2'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Previous Button */}
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
        whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
          currentPage === 1
            ? 'bg-gray-800/30 text-gray-500 cursor-not-allowed'
            : 'bg-background/40 text-gray-300 hover:bg-background/60 hover:text-white border border-gray-700/50 hover:border-gray-600'
        }`}
      >
        ← Previous
      </motion.button>

      {/* Page Numbers */}


      {/* Next Button */}
      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
        whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
          currentPage === totalPages
            ? 'bg-gray-800/30 text-gray-500 cursor-not-allowed'
            : 'bg-background/40 text-gray-300 hover:bg-background/60 hover:text-white border border-gray-700/50 hover:border-gray-600'
        }`}
      >
        Next →
      </motion.button>
    </motion.nav>
  )
}

export default Projects