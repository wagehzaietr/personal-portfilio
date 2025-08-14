import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { projectsData } from '../data/data'
import { getProjectTranslation, getTranslation } from '../../utils/translations'
import { 
  FiArrowLeft, 
  FiExternalLink, 
  FiGlobe, 
  FiStar,
  FiCalendar,
  FiCode,
  FiEye,
} from 'react-icons/fi'

// Animation variants
const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 }
    }
  }
}

// Header Component
const ProjectHeader = ({ onBack, language, onLanguageChange }) => (
  <motion.header
    variants={animations.item}
    className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'
  >
    <BackButton onClick={onBack} />
    <LanguageToggle language={language} onChange={onLanguageChange} />
  </motion.header>
)

const BackButton = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    className='group flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-accent/50 transition-all duration-300'
    whileHover={{ scale: 1.02, x: -4 }}
    whileTap={{ scale: 0.98 }}
  >
    <FiArrowLeft className='w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300' />
    <span className='font-medium'>Back to Projects</span>
  </motion.button>
)

const LanguageToggle = ({ language, onChange }) => (
  <div className='flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-2 border border-white/10'>
    <FiGlobe className='w-4 h-4 text-gray-400' />
    {['en', 'ar'].map((lang) => (
      <button
        key={lang}
        onClick={() => onChange(lang)}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
          language === lang
            ? 'bg-accent text-white shadow-lg'
            : 'text-gray-400 hover:text-white hover:bg-white/10'
        }`}
      >
        {lang.toUpperCase()}
      </button>
    ))}
  </div>
)

// Hero Image Component
const ProjectHero = ({ project }) => (
  <motion.div
    variants={animations.item}
    className='relative group mb-12'
  >
    <div className='relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10'>
      <img
        src={project.image}
        alt={project.title}
        className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
        loading='lazy'
      />
      
      {/* Overlay gradients */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
      <div className='absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
      
      {/* Badges */}
      <ProjectBadges project={project} />
    </div>
  </motion.div>
)

const ProjectBadges = ({ project }) => (
  <div className='absolute top-4 left-4 flex gap-2'>
    {project.isHot && (
      <span className='px-3 py-1.5 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-red-400/50'>
        🔥 Hot
      </span>
    )}
    {project.isAiPowerd && (
      <span className='px-3 py-1.5 bg-purple-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-purple-400/50'>
        🤖 AI Powered
      </span>
    )}
    {project.isLatest && (
      <span className='px-3 py-1.5 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-green-400/50'>
        ✨ Latest
      </span>
    )}
  </div>
)

// Project Title Section
const ProjectTitle = ({ project, language }) => (
  <motion.div
    variants={animations.item}
    className='mb-8'
    dir={language === 'ar' ? 'rtl' : 'ltr'}
  >
    <div className='flex flex-col lg:flex-row lg:items-center gap-4 mb-6'>
      <h1 className='text-3xl lg:text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-accent bg-clip-text text-transparent'>
        {getProjectTranslation(language, project.id, 'title')}
      </h1>
      
      <div className='flex items-center gap-2'>
        <span className='px-4 py-2 bg-secondary/20 border border-secondary/30 text-secondary rounded-full text-sm font-semibold backdrop-blur-sm'>
          {project.category}
        </span>
      </div>
    </div>

    <ProjectTags tags={project.tags} />
  </motion.div>
)

const ProjectTags = ({ tags }) => (
  <div className='flex flex-wrap gap-2'>
    {tags.map((tag, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className='px-3 py-1.5 bg-primary/30 backdrop-blur-sm text-gray-300 rounded-lg text-sm border border-gray-700/50 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300'
      >
        {tag}
      </motion.span>
    ))}
  </div>
)

// Main Content Section
const ProjectContent = ({ project, language }) => (
  <div className='grid lg:grid-cols-3 gap-12'>
    <div className='lg:col-span-2 space-y-12'>
      <ProjectOverview project={project} language={language} />
      <ProjectFeatures project={project} language={language} />
      <ProjectTechnologies project={project} language={language} />
    </div>
    <ProjectSidebar project={project} language={language} />
  </div>
)

const ProjectOverview = ({ project, language }) => (
  <motion.section
    variants={animations.item}
    className='space-y-6'
    dir={language === 'ar' ? 'rtl' : 'ltr'}
  >
    <div className='flex items-center gap-3 mb-4'>
      <div className='p-2 bg-accent/20 rounded-lg'>
        <FiEye className='w-5 h-5 text-accent' />
      </div>
      <h2 className='text-2xl font-bold text-white'>
        {getTranslation(language, 'ui.overview')}
      </h2>
    </div>
    
    <div className='prose prose-invert max-w-none'>
      <p className='text-gray-300 leading-relaxed text-lg'>
        {getProjectTranslation(language, project.id, 'detailedDescription') || 
         getProjectTranslation(language, project.id, 'description')}
      </p>
    </div>
  </motion.section>
)

const ProjectFeatures = ({ project, language }) => {
  const features = getProjectTranslation(language, project.id, 'features')
  
  if (!features) return null

  return (
    <motion.section
      variants={animations.item}
      className='space-y-6'
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className='flex items-center gap-3 mb-4'>
        <div className='p-2 bg-secondary/20 rounded-lg'>
          <FiStar className='w-5 h-5 text-secondary' />
        </div>
        <h2 className='text-2xl font-bold text-white'>
          {getTranslation(language, 'ui.keyFeatures')}
        </h2>
      </div>
      
      <div className='grid md:grid-cols-2 gap-4'>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className='flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-accent/30 transition-all duration-300'
          >
            <div className='w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0' />
            <span className='text-gray-300 leading-relaxed'>{feature}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

const ProjectTechnologies = ({ project, language }) => {
  if (!project.technologies) return null

  return (
    <motion.section
      variants={animations.item}
      className='space-y-6'
    >
      <div className='flex items-center gap-3 mb-4'>
        <div className='p-2 bg-purple-500/20 rounded-lg'>
          <FiCode className='w-5 h-5 text-purple-400' />
        </div>
        <h2 className='text-2xl font-bold text-white'>
          {getTranslation(language, 'ui.technologiesUsed')}
        </h2>
      </div>
      
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {project.technologies.map((tech, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className='p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-accent/30 transition-all duration-300 text-center group'
          >
            <span className='text-gray-300 group-hover:text-white font-medium transition-colors duration-300'>
              {tech}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

// Sidebar Components
const ProjectSidebar = ({ project, language }) => (
  <motion.aside
    variants={animations.item}
    className='space-y-6'
  >
    <ProjectActions project={project} language={language} />
    <ProjectStats project={project} language={language} />
    <RelatedProjects project={project} language={language} />
  </motion.aside>
)

const ProjectActions = ({ project, language }) => (
  <div className='bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl'>
    <div className='flex items-center gap-3 mb-6'>
      <div className='p-2 bg-accent/20 rounded-lg'>
        <FiExternalLink className='w-5 h-5 text-accent' />
      </div>
      <h3 className='text-lg font-bold text-white'>
        {getTranslation(language, 'ui.viewLiveSite')}
      </h3>
    </div>
    
    <div className='space-y-4'>
      <motion.a
        href={project.link}
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-accent to-secondary text-white font-semibold rounded-xl shadow-lg hover:shadow-accent/25 transition-all duration-300 group'
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <FiExternalLink className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' />
        <span>View Live Site</span>
      </motion.a>

    </div>
  </div>
)

const ProjectStats = ({ project, language }) => (
  <div className='bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl'>
    <div className='flex items-center gap-3 mb-6'>
      <div className='p-2 bg-secondary/20 rounded-lg'>
        <FiCalendar className='w-5 h-5 text-secondary' />
      </div>
      <h3 className='text-lg font-bold text-white'>
        {getTranslation(language, 'ui.projectDetails')}
      </h3>
    </div>
    
    <div className='space-y-4'>
      <StatItem
        label={getTranslation(language, 'ui.category')}
        value={project.category}
      />
      <StatItem
        label={getTranslation(language, 'ui.technologies')}
        value={`${project.tags.length} Technologies`}
      />
      <StatItem
        label="Status"
        value="Completed"
        valueColor="text-green-400"
      />
    </div>
  </div>
)

const StatItem = ({ label, value, valueColor = 'text-white' }) => (
  <div className='flex justify-between items-center py-2 border-b border-white/10 last:border-b-0'>
    <span className='text-gray-400 text-sm'>{label}</span>
    <span className={`font-medium ${valueColor}`}>{value}</span>
  </div>
)

const RelatedProjects = ({ project, language }) => {
  const relatedProjects = projectsData
    .filter(p => p.id !== project.id && p.category === project.category)
    .slice(0, 3)

  if (relatedProjects.length === 0) return null

  return (
    <div className='bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl'>
      <h3 className='text-lg font-bold text-white mb-6'>
        {getTranslation(language, 'ui.otherProjects')}
      </h3>
      
      <div className='space-y-4'>
        {relatedProjects.map((relatedProject, index) => (
          <RelatedProjectItem
            key={relatedProject.id}
            project={relatedProject}
            language={language}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

const RelatedProjectItem = ({ project, language, index }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <Link
      to={`/project/${project.id}`}
      className='block group'
    >
      <motion.div
        className='flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-accent/30 hover:bg-white/10 transition-all duration-300'
        whileHover={{ scale: 1.02, x: 4 }}
      >
        <div className='relative flex-shrink-0'>
          <img
            src={project.image}
            alt={project.title}
            className='w-12 h-12 object-cover rounded-lg border border-white/20'
          />
          <div className='absolute inset-0 bg-accent/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
        </div>
        
        <div className='flex-1 min-w-0'>
          <h4 className='text-white text-sm font-semibold group-hover:text-accent transition-colors duration-300 truncate'>
            {getProjectTranslation(language, project.id, 'title')}
          </h4>
          <p className='text-gray-400 text-xs mt-1'>
            {project.category}
          </p>
        </div>
        
        <FiExternalLink className='w-4 h-4 text-gray-400 group-hover:text-accent transition-colors duration-300' />
      </motion.div>
    </Link>
  </motion.div>
)

// Error Boundary Component
const ProjectNotFound = () => (
  <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/20 to-background'>
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className='text-center p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 max-w-md mx-4'
    >
      <div className='w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6'>
        <span className='text-2xl'>🔍</span>
      </div>
      
      <h2 className='text-2xl font-bold text-white mb-4'>
        Project Not Found
      </h2>
      <p className='text-gray-400 mb-6'>
        The project you're looking for doesn't exist or has been removed.
      </p>
      
      <Link
        to='/'
        className='inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl transition-all duration-300'
      >
        <FiArrowLeft className='w-4 h-4' />
        Back to Home
      </Link>
    </motion.div>
  </div>
)

// Main Component
const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [language, setLanguage] = useState('en')

  const project = projectsData.find(p => p.id === parseInt(id))

  if (!project) {
    return <ProjectNotFound />
  }

  const handleBack = () => navigate(-1)
  const handleLanguageChange = (lang) => setLanguage(lang)

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-primary/10 to-background pt-24 pb-16'>
      <div className='container mx-auto px-4 md:px-8'>
        <motion.main
          variants={animations.container}
          initial='hidden'
          animate='visible'
          className='max-w-7xl mx-auto'
        >
          <ProjectHeader
            onBack={handleBack}
            language={language}
            onLanguageChange={handleLanguageChange}
          />
          
          <ProjectHero project={project} />
          
          <ProjectTitle project={project} language={language} />
          
          <ProjectContent project={project} language={language} />
        </motion.main>
      </div>
    </div>
  )
}

export default ProjectDetail