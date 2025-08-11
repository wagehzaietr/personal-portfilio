import { useState, useEffect, useLayoutEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  HiHome, 
  HiUser, 
  HiCog, 
  HiFolderOpen, 
  HiMail,
  HiMenuAlt3,
  HiX,
  HiSun,
  HiMoon
} from 'react-icons/hi'

const Header = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollDirection, setScrollDirection] = useState('up')
  const [isScrolled, setIsScrolled] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [lastScrollY, setLastScrollY] = useState(0)
  
  const navigate = useNavigate()
  const location = useLocation()
  const { scrollY } = useScroll()

  // Enhanced navigation items with more details
  const navItems = useMemo(() => [
    { 
      name: 'Home', 
      href: '/', 
      icon: <HiHome className='w-5 h-5' />,
      description: 'Welcome & Overview',
      section: 'home'
    },
    { 
      name: 'About', 
      href: '#about', 
      icon: <HiUser className='w-5 h-5' />,
      description: 'My Story & Skills',
      section: 'about'
    },
    { 
      name: 'Services', 
      href: '#services', 
      icon: <HiCog className='w-5 h-5' />,
      description: 'What I Offer',
      section: 'services'
    },
    { 
      name: 'Projects', 
      href: '#projects', 
      icon: <HiFolderOpen className='w-5 h-5' />,
      description: 'Featured Work',
      section: 'projects'
    },
    { 
      name: 'Contact', 
      href: '/contact', 
      icon: <HiMail className='w-5 h-5' />,
      description: 'Get In Touch',
      section: 'contact'
    }
  ], [])

  const logoImage = 'https://klxblzcaxgybbogvfcps.supabase.co/storage/v1/object/public/fragrances//logo1-2025%20(2).jpg'

  // Enhanced scroll handler with Framer Motion
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    
    if (latest > previous && latest > 150) {
      setScrollDirection('down')
    } else {
      setScrollDirection('up')
    }
    
    setLastScrollY(latest)
    setIsScrolled(latest > 50)

    // Update active section
    updateActiveSection(latest)
  })

  const updateActiveSection = useCallback((scrollPosition) => {
    const sections = document.querySelectorAll('section[id]')
    const offset = 150

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i]
      const sectionTop = section.offsetTop
      
      if (scrollPosition + offset >= sectionTop) {
        const sectionId = section.getAttribute('id')
        if (sectionId !== activeSection) {
          setActiveSection(sectionId)
        }
        break
      }
    }

    if (scrollPosition < 100) {
      setActiveSection('home')
    }
  }, [activeSection])

  // Initial setup
  useLayoutEffect(() => {
    const scrollPosition = window.scrollY
    setIsScrolled(scrollPosition > 50)
    setLastScrollY(scrollPosition)
    updateActiveSection(scrollPosition)
  }, [updateActiveSection])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Enhanced navigation handler
  const handleNavClick = useCallback((e, href, section) => {
    e.preventDefault()
    setMenuOpen(false)

    if (href === '/') {
      navigate('/')
      setActiveSection('home')
    } else if (href === '/contact') {
      navigate('/contact')
      setActiveSection('contact')
    } else if (href.startsWith('#')) {
      const sectionId = href.substring(1)
      setActiveSection(sectionId)

      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => scrollToSection(sectionId), 150)
      } else {
        scrollToSection(sectionId)
      }
    }
  }, [navigate, location.pathname])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100
      const elementPosition = element.offsetTop - offset
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  // Animation variants
  const headerVariants = {
    visible: { 
      y: 0,
      opacity: 1,
      backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    hidden: { 
      y: -100,
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  }

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const mobileItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25
      }
    }
  }

  const logoVariants = {
    hover: {
      scale: 1.05,
      rotate: [0, -5, 5, 0],
      transition: {
        rotate: {
          duration: 0.5,
          ease: "easeInOut"
        },
        scale: {
          duration: 0.2
        }
      }
    }
  }

  return (
    <>
      <motion.header
        variants={headerVariants}
        initial="visible"
        animate={scrollDirection === 'down' && isScrolled && !menuOpen ? 'hidden' : 'visible'}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/10'
            : 'bg-transparent'
        }`}
      >
        <div className='container mx-auto px-4 md:px-8'>
          <div className='flex items-center justify-between h-20'>
            
            {/* Enhanced Logo Section */}
            <motion.div
              variants={logoVariants}
              whileHover="hover"
              className='flex items-center gap-4 group cursor-pointer'
              onClick={(e) => handleNavClick(e, '/', 'home')}
            >
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-accent/50 to-secondary/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <img 
                  src={logoImage} 
                  alt='Wageh Zaietr' 
                  className='relative w-12 h-12 rounded-2xl shadow-xl border-2 border-white/20 group-hover:border-accent/50 transition-all duration-300'
                />
                <div className='absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse'></div>
              </div>
              
            </motion.div>

            {/* Enhanced Desktop Navigation */}
            <nav className='hidden lg:flex items-center gap-2'>
              <div className='flex items-center bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10'>
                {navItems.map((item) => {
                  const isActive = (
                    (item.href === '/' && activeSection === 'home') ||
                    (item.section === activeSection) ||
                    (item.href === '/contact' && location.pathname === '/contact')
                  )

                  return (
                    <motion.button
                      key={item.name}
                      onClick={(e) => handleNavClick(e, item.href, item.section)}
                      className={`relative group px-4 py-3 rounded-xl font-medium transition-all duration-300 focus:outline-none ${
                        isActive
                          ? 'text-white bg-gradient-to-r from-accent/20 to-secondary/20 shadow-lg'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className='flex items-center gap-2 relative z-10'>
                        <span className={`transition-all duration-300 ${
                          isActive ? 'text-accent scale-110' : 'text-gray-400 group-hover:text-accent group-hover:scale-110'
                        }`}>
                          {item.icon}
                        </span>
                        <span className='text-sm'>{item.name}</span>
                      </div>

                      {/* Enhanced active indicator */}
                      {isActive && (
                        <motion.div
                          className='absolute inset-0 bg-gradient-to-r from-accent/30 to-secondary/30 rounded-xl'
                          layoutId='desktopActive'
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}

                      {/* Enhanced tooltip */}
                      <div className='absolute top-full left-1/2 transform -translate-x-1/2 mt-3 px-3 py-2 bg-background/95 backdrop-blur-sm text-xs text-gray-300 rounded-xl border border-gray-700/50 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl'>
                        <div className='font-medium text-white'>{item.name}</div>
                        <div className='text-gray-400'>{item.description}</div>
                        <div className='absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-background/95 border-t border-l border-gray-700/50 rotate-45'></div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              {/* Theme Toggle & CTA */}
              <div className='flex items-center gap-3 ml-4'>

                <motion.button
                  onClick={(e) => handleNavClick(e, '/contact', 'contact')}
                  className='px-6 py-3 bg-gradient-to-r from-accent to-secondary text-white font-semibold rounded-xl shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300'
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className='flex items-center gap-2'>
                    <HiMail className='w-4 h-4' />
                    <span>Hire Me</span>
                  </div>
                </motion.button>
              </div>
            </nav>

            {/* Enhanced Mobile Menu Button */}
            <div className='flex items-center gap-3 lg:hidden'>


              <motion.button
                className='relative p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 focus:outline-none'
                onClick={() => setMenuOpen(!menuOpen)}
                whileTap={{ scale: 0.9 }}
                aria-label='Toggle navigation menu'
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiX className='w-6 h-6 text-white' />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiMenuAlt3 className='w-6 h-6 text-white' />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              variants={mobileMenuVariants}
              initial='closed'
              animate='open'
              exit='closed'
              className='fixed top-24 right-4 w-80 max-w-[calc(100vw-2rem)] bg-gradient-to-br from-background/95 to-primary/95 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl z-50 lg:hidden overflow-hidden'
            >
              <div className='p-6'>
                {/* Mobile menu header */}
                <div className='flex items-center gap-3 mb-6 pb-4 border-b border-white/10'>
                  <img 
                    src={logoImage} 
                    alt='Logo' 
                    className='w-10 h-10 rounded-xl'
                  />
                </div>

                {/* Mobile navigation items */}
                <nav className='space-y-2'>
                  {navItems.map((item, index) => {
                    const isActive = (
                      (item.href === '/' && activeSection === 'home') ||
                      (item.section === activeSection) ||
                      (item.href === '/contact' && location.pathname === '/contact')
                    )

                    return (
                      <motion.button
                        key={item.name}
                        variants={mobileItemVariants}
                        onClick={(e) => handleNavClick(e, item.href, item.section)}
                        className={`w-full group relative flex items-center gap-4 p-4 rounded-2xl font-medium transition-all duration-300 text-left ${
                          isActive
                            ? 'text-white bg-gradient-to-r from-accent/20 to-secondary/20 border border-accent/30'
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`p-2 rounded-xl transition-all duration-300 ${
                          isActive 
                            ? 'bg-accent/20 text-accent scale-110' 
                            : 'bg-white/10 text-gray-400 group-hover:bg-accent/20 group-hover:text-accent group-hover:scale-110'
                        }`}>
                          {item.icon}
                        </div>
                        
                        <div className='flex-1'>
                          <div className='font-semibold text-sm'>{item.name}</div>
                          <div className='text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300'>
                            {item.description}
                          </div>
                        </div>

                        {/* Active indicator */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              className='w-2 h-2 bg-accent rounded-full'
                              transition={{ type: 'spring', stiffness: 300 }}
                            />
                          )}
                        </AnimatePresence>

                        {/* Background effect */}
                        <div className='absolute inset-0 bg-gradient-to-r from-accent/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
                      </motion.button>
                    )
                  })}
                </nav>

                {/* Mobile CTA */}
                <motion.div
                  variants={mobileItemVariants}
                  className='mt-6 pt-4 border-t border-white/10'
                >
                  <motion.button
                    onClick={(e) => {
                      handleNavClick(e, '/contact', 'contact')
                    }}
                    className='w-full bg-gradient-to-r from-accent to-secondary text-white font-semibold py-4 px-6 rounded-2xl shadow-lg transition-all duration-300'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className='flex items-center justify-center gap-2'>
                      <HiMail className='w-5 h-5' />
                      <span>Let's Work Together</span>
                    </div>
                  </motion.button>
                </motion.div>

                {/* Mobile menu footer */}
                <motion.div
                  variants={mobileItemVariants}
                  className='mt-4 pt-4 text-center'
                >
                  <p className='text-xs text-gray-500'>
                    © 2025 Wageh Zaietr
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header