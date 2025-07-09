import { motion } from 'framer-motion'
import { FaHtml5, FaCss3Alt, FaJs, FaReact } from 'react-icons/fa'
import { SiTailwindcss, SiTypescript, SiFigma } from 'react-icons/si'
import { timeline } from '../data/data'
const About = () => {
  // Skills data with proficiency levels

  const size = 30
  const skills = [
    {
      name: 'HTML/CSS',
      icon: [
        <FaHtml5 size={size} color='#E44D26' key='html' />,
        <FaCss3Alt size={size} color='#1572B6' key='css' />
      ],
      color: ['#E44D26', '#1572B6']
    },
    {
      name: 'JavaScript',
      icon: <FaJs size={size} color='#F7DF1E' />,
      color: '#F7DF1E'
    },
    {
      name: 'React',
      icon: <FaReact size={size} color='#61DAFB' />,
      color: '#61DAFB'
    },
    {
      name: 'Tailwind CSS',
      icon: <SiTailwindcss size={size} color='#38B2AC' />,
      color: '#38B2AC'
    },
    {
      name: 'TypeScript',
      icon: <SiTypescript size={size} color='#3178C6' />,
      color: '#3178C6'
    }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id='about' className='py-24 bg-primary/20'>
      <div className='container mx-auto px-4 md:px-8'>
        {/* Section header */}

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          {/* Bio and description */}
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            <motion.h3 variants={itemVariants} className='mb-4 text-accent'>
              Who Am I
            </motion.h3>

            <motion.p variants={itemVariants} className='text-gray-300 mb-6'>
              I'm Wageh Zaietr, a seasoned frontend developer and UI/UX designer
              with over 6 years of experience creating beautiful, functional
              digital experiences that users love.
            </motion.p>

            <motion.p variants={itemVariants} className='text-gray-300 mb-6'>
              My approach combines technical expertise with creative thinking,
              allowing me to build solutions that are not only visually stunning
              but also optimized for performance and usability.
            </motion.p>

            <motion.p variants={itemVariants} className='text-gray-300 mb-8'>
              I specialize in React, Tailwind CSS, and Framer Motion to create
              smooth, interactive interfaces that engage users and drive
              business results. When I'm not coding, you'll find me exploring
              new design trends, contributing to open source projects, or
              experimenting with emerging web technologies.
            </motion.p>

            <motion.div variants={itemVariants} className='flex gap-6 mb-8'>
              <div>
                <h4 className='text-4xl font-bold text-accent mb-1'>3+</h4>
                <p className='text-sm text-gray-400'>Years Experience</p>
              </div>
              <div>
                <h4 className='text-4xl font-bold text-accent mb-1'>50+</h4>
                <p className='text-sm text-gray-400'>Projects Completed</p>
              </div>
              <div>
                <h4 className='text-4xl font-bold text-accent mb-1'>30+</h4>
                <p className='text-sm text-gray-400'>Happy Clients</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Skills graph */}
          <motion.div className='bg-background/40 backdrop-blur-sm p-6 rounded-xl shadow-lg'>
            <div className='text-center mb-6 text-4xl'>
              <h3 className=' font-semibold text-4xl'>Technical Skills</h3>
              <svg
                viewBox='0 0 100 10'
                className='mx-auto mt-1 h-6 w-[300px] text-indigo-500'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M0,5 Q25,0 50,5 T100,5' />
              </svg>
            </div>

            <div className='space-y-4'>
              {skills.map((skill, index) => (
                <div key={skill.name} className='relative'>
                  <div className='flex justify-between mb-2'>
                    <span className=' text-1xl font-bold'>{skill.name}</span>{' '}
                    <span className='text-2xl bg-white/20 rounded-full p-2 '>
                      {skill.icon}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          className='mt-20'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className='text-center mb-10'>Professional Journey</h3>

          <div className='relative border-l border-gray-700 ml-4 md:ml-0 md:mx-auto md:max-w-4xl'>
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                className='mb-12 relative'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className='absolute -left-4 md:-left-3 mt-1.5'>
                  <motion.div
                    className='w-6 h-6 rounded-full bg-secondary flex items-center justify-center'
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      delay: index * 0.1 + 0.2
                    }}
                  >
                    <div className='w-2 h-2 rounded-full bg-white' />
                  </motion.div>
                </div>

                <div className='ml-8 md:ml-12'>
                  <span className='text-sm text-accent font-semibold'>
                    {item.year}
                  </span>
                  <h4 className='text-xl font-bold mt-1'>{item.title}</h4>
                  <h5 className='text-gray-300'>{item.company}</h5>
                  <p className='mt-2 text-gray-400'>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
