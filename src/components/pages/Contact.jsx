import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaLinkedin, 
  FaGithub, 
  FaTwitter, 
  FaInstagram,
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaClock
} from 'react-icons/fa'
import { 
  HiOutlineMail, 
  HiOutlineLocationMarker, 
  HiOutlineUser,
  HiOutlineChatAlt,
  HiOutlineGlobe
} from 'react-icons/hi'

const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    subject: '',
    message: '' 
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [focusedField, setFocusedField] = useState(null)
  const formRef = useRef(null)

  // Contact information
  const contactInfo = [
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      label: "Email",
      value: "bad1game1@hotmail.com",
      href: "mailto:bad1game1@hotmail.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaMapMarkerAlt className="w-5 h-5" />,
      label: "Location",
      value: "Damascus, Syria",
      href: null,
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <FaClock className="w-5 h-5" />,
      label: "Response Time",
      value: "Within 24 hours",
      href: null,
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <HiOutlineGlobe className="w-5 h-5" />,
      label: "Timezone",
      value: "GMT+3 (Damascus)",
      href: null,
      color: "from-orange-500 to-red-500"
    }
  ]

  // Social media links
  const socialLinks = [
    {
      icon: <FaLinkedin className="w-6 h-6" />,
      href: "https://www.linkedin.com/",
      label: "LinkedIn",
      color: "hover:text-blue-500"
    },
    {
      icon: <FaGithub className="w-6 h-6" />,
      href: "https://github.com/",
      label: "GitHub",
      color: "hover:text-gray-400"
    },
    {
      icon: <FaTwitter className="w-6 h-6" />,
      href: "https://twitter.com/",
      label: "Twitter",
      color: "hover:text-sky-500"
    },
    {
      icon: <FaInstagram className="w-6 h-6" />,
      href: "https://instagram.com/",
      label: "Instagram",
      color: "hover:text-pink-500"
    }
  ]

  // Form fields configuration
  const formFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      icon: <HiOutlineUser className="w-5 h-5" />,
      placeholder: 'John Doe',
      required: true
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      icon: <HiOutlineMail className="w-5 h-5" />,
      placeholder: 'john@example.com',
      required: true
    },
    {
      name: 'subject',
      label: 'Subject',
      type: 'text',
      icon: <HiOutlineChatAlt className="w-5 h-5" />,
      placeholder: 'Project Discussion',
      required: true
    }
  ]

  // Validation function
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    else if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section id='contact' className='relative min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a3e] to-[#2d1b69] py-2 px-4 overflow-hidden'>
      
      {/* Background decorations */}
      <div className='absolute inset-0 opacity-20'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl'></div>
        <div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl'></div>
        <div className='absolute top-3/4 left-1/3 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl'></div>
      </div>

      <div className='max-w-7xl mx-auto relative z-10 py-10'>
        
        {/* Enhanced Section Header */}
        <motion.header
          className='text-center mb-16 py-20'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className='inline-flex items-center gap-2 mb-4 px-4 py-2 bg-accent/10 rounded-full border border-accent/20'>
            <FaPaperPlane className='text-accent w-4 h-4' />
            <span className='text-sm font-medium text-accent'>Get In Touch</span>
          </div>
          
          <h2 className='font-bold text-4xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-white via-gray-200 to-accent bg-clip-text text-transparent'>
            Let's Work Together
          </h2>
          
          <div className='w-24 h-1 bg-gradient-to-r from-accent to-secondary mx-auto mb-6 rounded-full'></div>
          
          <p className='text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'>
            Have a project in mind or want to collaborate? I'd love to hear from you. 
            Let's create something amazing together.
          </p>
        </motion.header>

        <div className='grid lg:grid-cols-2 gap-16 items-start'>
          
          {/* Enhanced Contact Form */}
          <motion.div
            className='relative'
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            <div className='bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden'>
              
              {/* Form background pattern */}
              <div className='absolute inset-0 opacity-5'>
                <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/30 to-secondary/30 rounded-3xl'></div>
              </div>

              <div className='relative z-10'>
                <div className='flex items-center gap-3 mb-8'>
                  <div className='p-3 bg-accent/20 rounded-2xl'>
                    <FaPaperPlane className='w-6 h-6 text-accent' />
                  </div>
                  <div>
                    <h3 className='text-2xl font-bold text-white'>Send Message</h3>
                    <p className='text-gray-400 text-sm'>Fill out the form below</p>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      ref={formRef}
                      onSubmit={handleSubmit}
                      className='space-y-6'
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Form Fields */}
                      {formFields.map((field, index) => (
                        <motion.div 
                          key={field.name}
                          variants={itemVariants}
                          className='relative'
                        >
                          <label className='block mb-2 text-sm font-medium text-gray-300'>
                            {field.label}
                            {field.required && <span className='text-red-400 ml-1'>*</span>}
                          </label>
                          
                          <div className={`relative group ${
                            focusedField === field.name ? 'scale-[1.01]' : ''
                          } transition-transform duration-200`}>
                            <div className={`absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                              focusedField === field.name ? 'opacity-100' : ''
                            }`}></div>
                            
                            <div className={`relative flex items-center bg-background/30 backdrop-blur-sm rounded-xl px-4 py-3 border transition-all duration-300 ${
                              errors[field.name] 
                                ? 'border-red-500/50 bg-red-500/10' 
                                : focusedField === field.name 
                                  ? 'border-accent/50 bg-accent/5' 
                                  : 'border-gray-600/50 hover:border-gray-500/50'
                            }`}>
                              <span className={`mr-3 transition-colors duration-300 ${
                                focusedField === field.name ? 'text-accent' : 'text-gray-400'
                              }`}>
                                {field.icon}
                              </span>
                              
                              <input
                                type={field.type}
                                name={field.name}
                                required={field.required}
                                value={formData[field.name]}
                                onChange={handleChange}
                                onFocus={() => setFocusedField(field.name)}
                                onBlur={() => setFocusedField(null)}
                                placeholder={field.placeholder}
                                className='w-full bg-transparent text-white outline-none placeholder-gray-500 transition-colors duration-300'
                              />
                            </div>
                          </div>
                          
                          {errors[field.name] && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className='text-red-400 text-sm mt-1 flex items-center gap-1'
                            >
                              <span className='w-1 h-1 bg-red-400 rounded-full'></span>
                              {errors[field.name]}
                            </motion.p>
                          )}
                        </motion.div>
                      ))}

                      {/* Message Field */}
                      <motion.div variants={itemVariants} className='relative'>
                        <label className='block mb-2 text-sm font-medium text-gray-300'>
                          Message
                          <span className='text-red-400 ml-1'>*</span>
                        </label>
                        
                        <div className={`relative group ${
                          focusedField === 'message' ? 'scale-[1.01]' : ''
                        } transition-transform duration-200`}>
                          <div className={`absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                            focusedField === 'message' ? 'opacity-100' : ''
                          }`}></div>
                          
                          <div className={`relative bg-background/30 backdrop-blur-sm rounded-xl border transition-all duration-300 ${
                            errors.message 
                              ? 'border-red-500/50 bg-red-500/10' 
                              : focusedField === 'message' 
                                ? 'border-accent/50 bg-accent/5' 
                                : 'border-gray-600/50 hover:border-gray-500/50'
                          }`}>
                            <textarea
                              name='message'
                              required
                              rows='5'
                              value={formData.message}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('message')}
                              onBlur={() => setFocusedField(null)}
                              placeholder="Tell me about your project, ideas, or just say hello..."
                              className='w-full bg-transparent text-white placeholder-gray-500 p-4 resize-none focus:outline-none transition-colors duration-300'
                            />
                            
                            {/* Character counter */}
                            <div className='absolute bottom-3 right-3 text-xs text-gray-500'>
                              {formData.message.length} / 500
                            </div>
                          </div>
                        </div>
                        
                        {errors.message && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='text-red-400 text-sm mt-1 flex items-center gap-1'
                          >
                            <span className='w-1 h-1 bg-red-400 rounded-full'></span>
                            {errors.message}
                          </motion.p>
                        )}
                      </motion.div>

                      {/* Submit Button */}
                      <motion.div variants={itemVariants}>
                        <motion.button
                          type='submit'
                          disabled={isSubmitting}
                          className={`w-full relative overflow-hidden bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className='flex items-center justify-center gap-3'>
                            {isSubmitting ? (
                              <>
                                <FaSpinner className='w-5 h-5 animate-spin' />
                                <span>Sending Message...</span>
                              </>
                            ) : (
                              <>
                                <FaPaperPlane className='w-5 h-5' />
                                <span>Send Message</span>
                              </>
                            )}
                          </div>
                          
                          {/* Button shine effect */}
                          <div className='absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transform translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700'></div>
                        </motion.button>
                      </motion.div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className='text-center py-12'
                    >
                      <motion.div
                        variants={floatingVariants}
                        animate="animate"
                        className='inline-flex p-4 bg-green-500/20 rounded-full mb-6'
                      >
                        <FaCheckCircle className='w-12 h-12 text-green-400' />
                      </motion.div>
                      
                      <h4 className='text-3xl font-bold mb-4 text-white'>Message Sent Successfully!</h4>
                      <p className='text-gray-300 text-lg mb-2'>
                        Thank you for reaching out. I'll get back to you within 24 hours.
                      </p>
                      <p className='text-gray-400 text-sm'>
                        Check your email for a confirmation.
                      </p>
                      
                      <motion.button
                        onClick={() => setIsSubmitted(false)}
                        className='mt-6 px-6 py-2 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg transition-colors duration-300'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Send Another Message
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Contact Information */}
          <motion.div
            className='space-y-8'
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            
            {/* Contact Info Cards */}
            <div className='space-y-6'>
              <motion.div variants={itemVariants}>
                <h3 className='text-3xl font-bold mb-6 text-white flex items-center gap-3'>
                  <div className='p-2 bg-accent/20 rounded-xl'>
                    <HiOutlineLocationMarker className='w-6 h-6 text-accent' />
                  </div>
                  Contact Information
                </h3>
              </motion.div>

              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className='group'
                >
                  {info.href ? (
                    <a
                      href={info.href}
                      className='flex items-center gap-4 p-4 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-accent/30 transition-all duration-300 hover:scale-[1.02]'
                    >
                      <div className={`p-3 bg-gradient-to-r ${info.color} rounded-xl shadow-lg`}>
                        {info.icon}
                      </div>
                      <div>
                        <p className='text-gray-400 text-sm'>{info.label}</p>
                        <p className='text-white font-medium'>{info.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className='flex items-center gap-4 p-4 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/10'>
                      <div className={`p-3 bg-gradient-to-r ${info.color} rounded-xl shadow-lg`}>
                        {info.icon}
                      </div>
                      <div>
                        <p className='text-gray-400 text-sm'>{info.label}</p>
                        <p className='text-white font-medium'>{info.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className='space-y-6'>
              <h4 className='text-xl font-bold text-white'>Connect With Me</h4>
              <div className='flex gap-4'>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`group p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-accent/30 transition-all duration-300 ${social.color}`}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    {social.icon}
                    
                    {/* Tooltip */}
                    <div className='absolute -top-10 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap'>
                      {social.label}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              variants={itemVariants}
              className='bg-gradient-to-br from-accent/10 to-secondary/10 backdrop-blur-sm rounded-2xl p-6 border border-accent/20'
            >
              <h4 className='text-lg font-bold text-white mb-3'>Why Work With Me?</h4>
              <ul className='space-y-2 text-gray-300'>
                <li className='flex items-center gap-2'>
                  <FaCheckCircle className='w-4 h-4 text-green-400' />
                  <span>Fast response within 24 hours</span>
                </li>
                <li className='flex items-center gap-2'>
                  <FaCheckCircle className='w-4 h-4 text-green-400' />
                  <span>Professional and reliable service</span>
                </li>
                <li className='flex items-center gap-2'>
                  <FaCheckCircle className='w-4 h-4 text-green-400' />
                  <span>Competitive pricing and quality work</span>
                </li>
                <li className='flex items-center gap-2'>
                  <FaCheckCircle className='w-4 h-4 text-green-400' />
                  <span>3+ years of experience</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Footer */}
        <motion.footer
          className='text-center mt-20 pt-8 border-t border-white/10'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <p className='text-gray-400 text-sm'>
              &copy; {new Date().getFullYear()} Wageh Zaietr. All rights reserved.
            </p>
          </div>
        </motion.footer>
      </div>
    </section>
  )
}

export default Contact