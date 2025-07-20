import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { projectsData } from '../data/data'
import { getProjectTranslation, getTranslation } from '../../utils/translations'
import { FiArrowLeft, FiExternalLink, FiGlobe } from 'react-icons/fi'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [language, setLanguage] = useState('en')

  const project = projectsData.find(p => p.id === parseInt(id))

  if (!project) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-white mb-4'>
            Project Not Found
          </h2>
          <Link
            to='/'
            className='text-accent hover:text-white transition-colors'
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
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
    <div className='min-h-screen bg-background pt-20'>
      <div className='container mx-auto px-4 md:px-8 py-12'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='max-w-6xl mx-auto'
        >
          {/* Header with back button and language toggle */}
          <motion.div
            variants={itemVariants}
            className='flex justify-between items-center mb-8'
          >
            <button
              onClick={() => navigate(-1)}
              className='flex items-center gap-2 text-accent hover:text-white transition-colors group'
            >
              <FiArrowLeft className='group-hover:-translate-x-1 transition-transform' />
              <span>Back</span>
            </button>

            <div className='flex items-center gap-2'>
              <FiGlobe className='text-gray-400' />
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  language === 'en'
                    ? 'bg-accent text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  language === 'ar'
                    ? 'bg-accent text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                AR
              </button>
            </div>
          </motion.div>

          {/* Project Image */}
          <motion.div
            variants={itemVariants}
            className='relative aspect-video rounded-xl overflow-hidden mb-8 shadow-2xl'
          >
            <img
              src={project.image}
              alt={project.title}
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
          </motion.div>

          {/* Project Info */}
          <div className='grid lg:grid-cols-3 gap-8'>
            {/* Main Content */}
            <motion.div
              variants={itemVariants}
              className='lg:col-span-2 space-y-8'
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
              {/* Title and Category */}
              <div>
                <div className='flex items-center gap-4 mb-4'>
                  <h1 className='text-3xl md:text-4xl font-bold text-white'>
                    {getProjectTranslation(language, project.id, 'title')}
                  </h1>
                  <span className='px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-semibold'>
                    {project.category}
                  </span>
                </div>

                {/* Tags */}
                <div className='flex flex-wrap gap-2 mb-6'>
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className='px-3 py-1 bg-primary/30 text-gray-300 rounded-md text-sm border border-gray-700'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className='text-xl font-semibold text-white mb-4'>
                  {getTranslation(language, 'ui.overview')}
                </h2>
                <p className='text-gray-300 leading-relaxed text-lg'>
                  {getProjectTranslation(language, project.id, 'detailedDescription') || 
                   getProjectTranslation(language, project.id, 'description')}
                </p>
              </div>

              {/* Features */}
              {getProjectTranslation(language, project.id, 'features') && (
                <div>
                  <h2 className='text-xl font-semibold text-white mb-4'>
                    {getTranslation(language, 'ui.keyFeatures')}
                  </h2>
                  <ul className='grid md:grid-cols-2 gap-3'>
                    {getProjectTranslation(language, project.id, 'features')?.map((feature, index) => (
                      <li
                        key={index}
                        className='flex items-center gap-3 text-gray-300'
                      >
                        <div className='w-2 h-2 bg-accent rounded-full flex-shrink-0' />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              {project.technologies && (
                <div>
                  <h2 className='text-xl font-semibold text-white mb-4'>
                    {getTranslation(language, 'ui.technologiesUsed')}
                  </h2>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                    {project.technologies.map((tech, index) => (
                      <div
                        key={index}
                        className='bg-primary/20 border border-gray-700 rounded-lg p-3 text-center text-gray-300 hover:border-accent/50 transition-colors'
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div variants={itemVariants} className='space-y-6'>
              {/* Project Actions */}
              <div className='bg-primary/20 border border-gray-700 rounded-xl p-6'>
                <h3 className='text-lg font-semibold text-white mb-4'>
                  {getTranslation(language, 'ui.projectLinks')}
                </h3>
                <div className='space-y-3'>
                  <a
                    href={project.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-secondary to-accent text-white font-medium rounded-lg hover:shadow-lg hover:shadow-accent/20 transition-all duration-300'
                  >
                    <FiExternalLink />
                    {getTranslation(language, 'ui.viewLiveSite')}
                  </a>
                </div>
              </div>

              {/* Project Stats */}
              <div className='bg-primary/20 border border-gray-700 rounded-xl p-6'>
                <h3 className='text-lg font-semibold text-white mb-4'>
                  {getTranslation(language, 'ui.projectDetails')}
                </h3>
                <div className='space-y-3'>
                  <div className='flex justify-between'>
                    <span className='text-gray-400'>
                      {getTranslation(language, 'ui.category')}
                    </span>
                    <span className='text-white'>{project.category}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-400'>
                      {getTranslation(language, 'ui.technologies')}
                    </span>
                    <span className='text-white'>{project.tags.length}</span>
                  </div>
                </div>
              </div>

              {/* Related Projects */}
              <div className='bg-primary/20 border border-gray-700 rounded-xl p-6'>
                <h3 className='text-lg font-semibold text-white mb-4'>
                  {getTranslation(language, 'ui.otherProjects')}
                </h3>
                <div className='space-y-3'>
                  {projectsData
                    .filter(
                      p =>
                        p.id !== project.id && p.category === project.category
                    )
                    .slice(0, 3)
                    .map(relatedProject => (
                      <Link
                        key={relatedProject.id}
                        to={`/project/${relatedProject.id}`}
                        className='block p-3 bg-background/50 rounded-lg hover:bg-background/70 transition-colors group'
                      >
                        <div className='flex items-center gap-3'>
                          <img
                            src={relatedProject.image}
                            alt={relatedProject.title}
                            className='w-12 h-12 object-cover rounded-lg'
                          />
                          <div>
                            <h4 className='text-white text-sm font-medium group-hover:text-accent transition-colors'>
                              {getProjectTranslation(language, relatedProject.id, 'title')}
                            </h4>
                            <p className='text-gray-400 text-xs'>
                              {relatedProject.category}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProjectDetail
