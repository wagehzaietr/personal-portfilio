import { motion } from 'framer-motion';

const About = () => {
  // Skills data with proficiency levels
  const skills = [
    { name: 'HTML/CSS', level: 95 },
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 92 },
    { name: 'UI/UX Design', level: 88 },
    { name: 'Tailwind CSS', level: 94 },
    { name: 'TypeScript', level: 80 },

  ];

  // Timeline data
  const timeline = [
    {
      year: '2023',
      title: 'Sr. Frontend Developer',
      company: 'Tech Innovators Inc.',
      description: 'Led the frontend team in developing cutting-edge web applications using React and modern web technologies.'
    },
    {
      year: '2021',
      title: 'UI/UX Designer & Developer',
      company: 'Creative Digital Agency',
      description: 'Created engaging user experiences and implemented frontend solutions for various clients across industries.'
    },
    {
      year: '2019',
      title: 'Frontend Developer',
      company: 'Web Solutions Co.',
      description: 'Built responsive and interactive web interfaces for e-commerce and SaaS platforms.'
    },
    {
      year: '2017',
      title: 'Junior Web Developer',
      company: 'StartUp Ventures',
      description: 'Developed and maintained websites and web applications for early-stage startups.'
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-24 bg-primary/20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4">About Me</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            I'm a passionate developer and designer with a keen eye for detail and a commitment to creating exceptional digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Bio and description */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 variants={itemVariants} className="mb-4 text-accent">Who Am I</motion.h3>
            
            <motion.p variants={itemVariants} className="text-gray-300 mb-6">
              I'm Wageh Zaietr, a seasoned frontend developer and UI/UX designer with over 6 years of experience creating beautiful, functional digital experiences that users love.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-gray-300 mb-6">
              My approach combines technical expertise with creative thinking, allowing me to build solutions that are not only visually stunning but also optimized for performance and usability.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-gray-300 mb-8">
              I specialize in React, Tailwind CSS, and Framer Motion to create smooth, interactive interfaces that engage users and drive business results. When I'm not coding, you'll find me exploring new design trends, contributing to open source projects, or experimenting with emerging web technologies.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex gap-6 mb-8">
              <div>
                <h4 className="text-4xl font-bold text-accent mb-1">6+</h4>
                <p className="text-sm text-gray-400">Years Experience</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-accent mb-1">50+</h4>
                <p className="text-sm text-gray-400">Projects Completed</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-accent mb-1">30+</h4>
                <p className="text-sm text-gray-400">Happy Clients</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Skills graph */}
          <motion.div
            className="bg-background/40 backdrop-blur-sm p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="mb-6 text-center">Technical Skills</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name} className="relative">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm font-medium text-accent">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-secondary to-accent"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1 * index, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-center mb-10">Professional Journey</h3>
          
          <div className="relative border-l border-gray-700 ml-4 md:ml-0 md:mx-auto md:max-w-4xl">
            {timeline.map((item, index) => (
              <motion.div 
                key={item.year}
                className="mb-12 relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="absolute -left-4 md:-left-3 mt-1.5">
                  <motion.div 
                    className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, delay: index * 0.1 + 0.2 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </motion.div>
                </div>
                
                <div className="ml-8 md:ml-12">
                  <span className="text-sm text-accent font-semibold">{item.year}</span>
                  <h4 className="text-xl font-bold mt-1">{item.title}</h4>
                  <h5 className="text-gray-300">{item.company}</h5>
                  <p className="mt-2 text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 