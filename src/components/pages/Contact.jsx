import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaLinkedin, FaInstagram, FaArrowUp } from 'react-icons/fa'
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlineUser } from 'react-icons/hi'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setIsSubmitted(false), 4000)
    }, 1500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <footer id='contact' className='relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-24 px-4 text-white'>
      <div className='max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start'>

        {/* Contact Form */}
        <motion.div
          className='bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <h3 className='text-3xl font-bold mb-6'>Get in Touch</h3>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Name */}
              <motion.div variants={childVariants} className='relative'>
                <label className='block mb-1 text-sm'>Name</label>
                <div className='flex items-center bg-background/30 rounded-lg px-3 py-2 border border-gray-600'>
                  <HiOutlineUser className='mr-2 text-accent' />
                  <input
                    type='text'
                    name='name'
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Your Name'
                    className='w-full bg-transparent text-white outline-none placeholder-gray-400'
                  />
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={childVariants} className='relative'>
                <label className='block mb-1 text-sm'>Email</label>
                <div className='flex items-center bg-background/30 rounded-lg px-3 py-2 border border-gray-600'>
                  <HiOutlineMail className='mr-2 text-accent' />
                  <input
                    type='email'
                    name='email'
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='you@example.com'
                    className='w-full bg-transparent text-white outline-none placeholder-gray-400'
                  />
                </div>
              </motion.div>

              {/* Message */}
              <motion.div variants={childVariants} className='relative'>
                <label className='block mb-1 text-sm'>Message</label>
                <textarea
                  name='message'
                  required
                  rows='5'
                  value={formData.message}
                  onChange={handleChange}
                  placeholder='Let’s collaborate...'
                  className='w-full bg-background/30 text-white placeholder-gray-400 border border-gray-600 rounded-lg p-3 resize-none focus:outline-none'
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={childVariants}>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-accent to-secondary hover:scale-[1.02] transition-all duration-300 ${isSubmitting && 'opacity-60 cursor-not-allowed'}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </motion.div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className='text-center py-8'
            >
              <h4 className='text-2xl font-bold mb-2 text-accent'>Message Sent!</h4>
              <p className='text-gray-300'>Thanks for reaching out. I'll be in touch soon.</p>
            </motion.div>
          )}
        </motion.div>

        {/* Info Section */}
        <motion.div
          className='flex flex-col justify-between h-full'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <motion.div variants={childVariants}>
            <h3 className='text-3xl font-bold mb-6'>Contact Info</h3>
            <p className='mb-4 text-gray-300'>
              <span className='text-accent font-medium'>Email:</span> bad1game1@hotmail.com
            </p>
            <p className='mb-4 text-gray-300'>
              <span className='text-accent font-medium'>Location:</span> Damascus, Syria
            </p>
          </motion.div>

          <motion.div className='flex gap-6 mt-8' variants={childVariants}>
            <a href='https://www.linkedin.com/' target='_blank' rel='noreferrer' className='hover:text-accent transition'>
              <FaLinkedin size={24} />
            </a>
          </motion.div>


        </motion.div>
      </div>

      {/* Bottom Credit */}
      <motion.div
        className='text-center mt-20 border-t border-white/10 pt-6 text-sm text-gray-500'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        &copy; {new Date().getFullYear()} Wageh Zaietr. Crafted with care.
      </motion.div>
    </footer>
  )
}

export default Contact
