import { useState, useEffect, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '/contact' }
]

const image =
  'https://klxblzcaxgybbogvfcps.supabase.co/storage/v1/object/public/fragrances//logo1-2025%20(2).jpg'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Force initial layout calculations before first render
  useLayoutEffect(() => {
    // Force layout recalculation
    window.dispatchEvent(new Event('resize'))

    // Initial check for scroll position (in case page loads at a scrolled position)
    const scrollPosition = window.scrollY
    setScrolled(scrollPosition > 50)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 50)

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]')
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.offsetHeight
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(section.getAttribute('id'))
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Handle navigation clicks
  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    if (href === '/') {
      navigate('/')
    } else if (href === '/contact') {        // <-- new branch
      navigate('/contact')
    } else if (href.startsWith('#')) {
      // existing anchor-link logic unchanged
      const sectionId = href.substring(1)

      // If we're not on the home page, navigate to home first
      if (location.pathname !== '/') {
        navigate('/')
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const element = document.getElementById(sectionId)
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 100,
              behavior: 'smooth'
            })
          }
        }, 100)
      } else {
        // We're already on home page, just scroll
        const element = document.getElementById(sectionId)
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 100,
            behavior: 'smooth'
          })
        }
      }
    }
  }

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
    >
      <div className='container mx-auto py-4 px-6 flex justify-between items-center'>
        {/* Logo */}
        <motion.div
          className='flex items-center'
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <a
            href='/'
            onClick={e => handleNavClick(e, '/')}
            className='text-2xl font-bold text-white flex items-center cursor-pointer'
          >
            <img src={image} alt='logo' className='w-10 h-10 rounded-full' />
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center space-x-8'>
          {navItems.map(item => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={e => handleNavClick(e, item.href)}
              className={`relative px-1 py-2 text-lg cursor-pointer ${
                activeSection === item.href.substring(1)
                  ? 'text-accent'
                  : 'text-white hover:text-accent'
              }`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {item.name}
              {activeSection === item.href.substring(1) && (
                <motion.div
                  className='absolute -bottom-1 left-0 right-0 h-0.5 bg-accent'
                  layoutId='activeSection'
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className='md:hidden flex flex-col justify-center items-center space-y-1.5 z-50'
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            className='block w-6 h-0.5 bg-white'
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          ></motion.span>
          <motion.span
            className='block w-6 h-0.5 bg-white'
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          ></motion.span>
          <motion.span
            className='block w-6 h-0.5 bg-white'
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          ></motion.span>
        </motion.button>

        {/* Mobile Menu */}
        <motion.div
          className='fixed min-h-screen w-full bg-black/55 md:hidden inset-0 bg-primary/95 backdrop-blur-lg flex flex-col justify-center items-center overflow-hidden'
          initial={{ x: '100%' }}
          animate={menuOpen ? { x: 0 } : { x: '100%' }}
          transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
        >
          <motion.nav className='flex flex-col items-center space-y-6'>
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`text-2xl font-medium cursor-pointer ${
                  activeSection === item.href.substring(1)
                    ? 'text-accent'
                    : 'text-white'
                }`}
                onClick={e => handleNavClick(e, item.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                whileHover={{ scale: 1.1, color: '#3b82f6' }}
              >
                {item.name}
              </motion.a>
            ))}
          </motion.nav>
        </motion.div>
      </div>
    </motion.header>
  )
}

export default Header
