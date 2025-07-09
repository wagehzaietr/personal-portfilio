import { useEffect, useRef, useState, useCallback, memo } from 'react'
import { motion } from 'framer-motion'
import { Prism as SyntaxHighlighter  } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { codeString } from '../data/data'



const Hero = () => {
  const ref = useRef(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)


  useEffect(() => {

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)


    setIsMobile(window.innerWidth < 768)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Text animation variants - simpler for mobile
  const heroTextVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isMobile ? 0.06 : 0.12 // Faster stagger on mobile
      }
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: isMobile ? 25 : 50 }, // Smaller distance on mobile
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: isMobile ? 18 : 12 // More dampening on mobile for faster animation
      }
    }
  }

  // Handle parallax effect on mouse move - only on desktop
  const handleMouseMove = useCallback(
    e => {
      if (!ref.current || isMobile) return

      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      const moveX = (clientX - innerWidth / 2) / 25
      const moveY = (clientY - innerHeight / 2) / 25

      // Apply transform to elements with data attributes
      const elements = ref.current.querySelectorAll('[data-parallax]')
      elements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax'))
        el.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`
      })
    },
    [isMobile]
  )

  useEffect(() => {
    if (isMobile || isReducedMotion) return // Don't add listener on mobile

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove, isMobile, isReducedMotion])

  // Split text for animation
  const nameText = 'Wageh Zaietr'.split('')

  // Time-based greeting
  const getGreeting = useCallback(() => {
    const hours = new Date().getHours()
    if (hours < 12) return 'Good Morning'
    if (hours < 18) return 'Good Afternoon'
    return 'Good Evening'
  }, [])

  // Determine number of stars based on device
  const starCount = isMobile ? 5 : isReducedMotion ? 0 : 15
  const largeStarCount = isMobile ? 2 : isReducedMotion ? 0 : 5

  return (
    <section
      id='home'
      ref={ref}
      className='relative min-h-screen flex items-center pt-24 overflow-hidden'
    >
      {/* Background particles - reduced or removed based on device */}


      {/* Gradient background */}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background z-10'></div>

      <div className='container mx-auto px-4 md:px-8 relative z-20'>
        <div className='flex flex-col md:flex-row items-center'>
          <div className='max-w-2xl'>
            {/* Personalized greeting */}
            <motion.p
              className='text-secondary font-medium mb-2'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {getGreeting()}, I am
            </motion.p>

            {/* Animated name text */}
            <motion.h1
              className='text-white mb-6'
              variants={heroTextVariants}
              initial='hidden'
              animate='visible'
            >
              {nameText.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className='inline-block'
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.h1>

            {/* Animated subtitle - simplified for mobile */}
            <motion.div
              className='overflow-hidden h-16 my-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <motion.h2
                className='bg-clip-text text-transparent bg-gradient-to-r from-secondary via-purple-400 to-accent mb-8'
                animate={
                  isReducedMotion
                    ? {}
                    : {
                        y: [0, -120, -240, -360, -240, -120, 0]
                      }
                }
                transition={{
                  duration: isMobile ? 15 : 10, // Slower on mobile for smoother animation
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'loop',
                  repeatDelay: 1
                }}
              >
                <span className='block h-20 py-4'>Web Designer</span>
                <span className='block h-20 py-4'>Frontend Developer</span>
                <span className='block h-20 py-4'>UI/UX Expert</span>
                <span className='block h-20 py-4'>Creative Thinker</span>
                <span className='block h-20 py-4'>Web Designer</span>
              </motion.h2>
            </motion.div>

            {/* Description text */}
            <motion.p
              className='text-lg text-gray-300 mb-10 max-w-2xl'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              data-parallax={isMobile ? '0' : '1.2'}
            >
              I craft high-performance, visually stunning digital experiences
              that engage users and drive business growth. Let's transform your
              vision into reality.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className='flex flex-wrap gap-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <a
                href='#projects'
                className='px-8 py-3 rounded-md bg-gradient-to-r from-secondary to-accent text-white font-medium hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 hover:translate-y-[-2px]'
              >
                View My Work
              </a>
              <a
                href='#contact'
                className='px-8 py-3 rounded-md border border-gray-600 text-white font-medium hover:border-accent hover:text-accent transition-all duration-300 hover:translate-y-[-2px]'
              >
                Get in Touch
              </a>
            </motion.div>
          </div>

          {/* Animation on the right side */}
    <div className="w-full mt-2 sm:px-6 md:px-8 max-w-full overflow-x-auto">
      <motion.div
        className="mt-6 rounded-lg"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
          className="rounded-lg min-w-[300px]"
          customStyle={{
            fontSize: '0.85rem',
            borderRadius: '0.5rem',
            padding: '1rem',
          }}
        >
          {codeString}
        </SyntaxHighlighter>
      </motion.div>
    </div>
        </div>
      </div>


      {/* Scroll indicator */}
      <motion.div
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center'
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: [0, 1, 0],
          y: [0, 10, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 0.5
        }}
      >
        <span className='text-sm text-gray-400 mb-2'>Scroll Down</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5 text-gray-400'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 14l-7 7m0 0l-7-7m7 7V3'
          />
        </svg>
      </motion.div>
    </section>
  )
}

export default memo(Hero)
