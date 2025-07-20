// src/components/sections/Projects.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projectsData } from '../data/data'
import { getProjectTranslation } from '../../utils/translations'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  // Project categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'web', name: 'Web Development' },
    { id: 'Web Apps', name: 'Web Apps' }
  ]

  // Filter projects based on active category
  const filteredProjects =
    activeFilter === 'all'
      ? projectsData
      : projectsData.filter(project => project.category === activeFilter)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
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
          <div className='text-center mb-6 text-4xl'>
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
          </div>
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
              onClick={() => setActiveFilter(category.id)}
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

        {/* Projects grid */}
        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <AnimatePresence>
            {filteredProjects.map(project => (
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
                {/* Project image */}
                <div className='aspect-video overflow-hidden'>
                  <img
                    src={project.image}
                    alt={project.title}
                    loading='lazy'
                    className='w-full h-full object-cover transition-all duration-500 hover:scale-110'
                  />
                </div>

                {/* Project info */}
                <div className='p-5'>
                  <div className='flex justify-between items-start mb-2'>
                    <h3 className='text-lg font-bold'>{getProjectTranslation('en', project.id, 'title')}</h3>
                    <span className='text-xs font-semibold px-2 py-1 bg-secondary/20 text-secondary rounded-full'>
                      {
                        categories.find(cat => cat.id === project.category)
                          ?.name
                      }
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


      </div>
    </section>
  )
}

export default Projects
