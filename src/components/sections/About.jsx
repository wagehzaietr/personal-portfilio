import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaAward,
  FaUsers,
  FaRocket,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiTypescript,
  SiFigma,
  SiFramer,
} from "react-icons/si";
import { timeline } from "../data/data";

const About = () => {
  const iconSize = 28;

  // Enhanced skills data with proficiency levels and categories
  const skillCategories = [
    {
      title: "Frontend Technologies",
      skills: [
        {
          name: "HTML/CSS",
          icons: [
            { icon: <FaHtml5 size={iconSize} />, color: "#E44D26" },
            { icon: <FaCss3Alt size={iconSize} />, color: "#1572B6" },
          ],
          proficiency: 95,
          experience: "3+ years",
        },
        {
          name: "JavaScript",
          icons: [{ icon: <FaJs size={iconSize} />, color: "#F7DF1E" }],
          proficiency: 90,
          experience: "2+ years",
        },
        {
          name: "React",
          icons: [{ icon: <FaReact size={iconSize} />, color: "#61DAFB" }],
          proficiency: 88,
          experience: "2+ years",
        },
      ],
    },
    {
      title: "Styling & Animation",
      skills: [
        {
          name: "Tailwind CSS",
          icons: [
            { icon: <SiTailwindcss size={iconSize} />, color: "#38B2AC" },
          ],
          proficiency: 92,
          experience: "2+ years",
        },
        {
          name: "Framer Motion",
          icons: [{ icon: <SiFramer size={iconSize} />, color: "#0055FF" }],
          proficiency: 85,
          experience: "1+ years",
        },
      ],
    },
    {
      title: "Languages & Tools",
      skills: [
        {
          name: "TypeScript",
          icons: [{ icon: <SiTypescript size={iconSize} />, color: "#3178C6" }],
          proficiency: 80,
          experience: "1+ years",
        },
        {
          name: "Figma",
          icons: [{ icon: <SiFigma size={iconSize} />, color: "#F24E1E" }],
          proficiency: 85,
          experience: "2+ years",
        },
      ],
    },
  ];

  // Stats data
  const stats = [
    {
      icon: <FaRocket className="w-6 h-6" />,
      number: "3+",
      label: "Years Experience",
      color: "from-secondary/20 to-black/40",
    },
    {
      icon: <FaAward className="w-6 h-6" />,
      number: "50+",
      label: "Projects Completed",
      color: "from-secondary/40 to-black/50",
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      number: "30+",
      label: "Happy Clients",
      color: "from-secondary/40 to-black/60",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <motion.header
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-accent/10 rounded-full">
            <span className="text-accent">👨‍💻</span>
            <span className="text-sm font-medium text-accent">About Me</span>
          </div>

          <h2 className="font-bold text-4xl md:text-6xl mb-6 bg-gradient-to-r from-white via-gray-200 to-accent bg-clip-text text-transparent">
            Get to Know Me
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-accent to-secondary mx-auto rounded-full"></div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Enhanced Bio Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-4 text-accent flex items-center gap-3">
                <span className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  🚀
                </span>
                Who Am I
              </h3>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="space-y-4 text-gray-300 leading-relaxed"
            >
              <p className="text-lg">
                I’m{" "}
                <span className="text-white font-semibold">Wageh Zaietr</span>,
                a frontend developer and UI/UX designer with over{" "}
                <span className="text-accent font-semibold">3 years</span> of
                experience delivering high-quality, user-focused digital
                products that combine visual appeal with reliable functionality.
              </p>

              <p>
                My work blends{" "}
                <span className="text-secondary">technical expertise</span> with
                <span className="text-secondary">
                  {" "}
                  creative design principles
                </span>
                , enabling me to create solutions that are not only visually
                refined but also optimized for performance, accessibility, and
                an exceptional user experience.
              </p>

              <p>
                I specialize in modern web technologies including React,
                TypeScript, and Tailwind CSS, with a strong focus on developing
                smooth, interactive interfaces powered by Framer Motion. My aim
                is to seamlessly connect design and development, ensuring every
                element serves both purpose and precision.
              </p>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 mt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className={`relative p-4 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10 border border-gray-800/50 group hover:scale-105 transition-all duration-300`}
                  whileHover={{ y: -5 }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
                  ></div>
                  <div className="relative z-10 text-center">
                    <div
                      className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} text-white mb-2`}
                    >
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs text-white leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Skills Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-background/40 to-primary/20 backdrop-blur-md p-6 rounded-2xl border border-gray-800/50 shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Technical Skills</h3>
                <p className="text-gray-400 text-sm">
                  Technologies I work with
                </p>
              </div>

              <div className="space-y-8">
                {skillCategories.map((category, categoryIndex) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 }}
                  >
                    <h4 className="text-sm font-semibold text-accent mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      {category.title}
                    </h4>

                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <SkillItem
                          key={skill.name}
                          skill={skill}
                          delay={skillIndex * 0.05}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Timeline Section */}
        <TimelineSection timeline={timeline} />
      </div>
    </section>
  );
};

// Separate SkillItem component
const SkillItem = ({ skill, delay }) => (
  <motion.div
    className="group relative"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4 }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center justify-between p-3 rounded-xl bg-background/30 border border-gray-800/30 group-hover:border-accent/30 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {skill.icons.map((iconData, index) => (
            <motion.div
              key={index}
              className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-300"
              style={{ color: iconData.color }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {iconData.icon}
            </motion.div>
          ))}
        </div>
        <div>
          <div className="font-semibold text-white text-sm">{skill.name}</div>
          <div className="text-xs text-gray-400">{skill.experience}</div>
        </div>
      </div>

      <div className="text-right">
        <div className="text-sm font-bold text-accent">
          {skill.proficiency}%
        </div>
        <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden mt-1">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-secondary rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: delay + 0.3 }}
          />
        </div>
      </div>
    </div>
  </motion.div>
);

// Separate Timeline component
const TimelineSection = ({ timeline }) => (
  <motion.section
    className="mt-24"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div className="text-center mb-12">
      <h3 className="text-3xl font-bold mb-4">Professional Journey</h3>
      <p className="text-gray-400 max-w-2xl mx-auto">
        A timeline of my career milestones and professional growth
      </p>
    </div>

    <div className="relative max-w-4xl mx-auto">
      {/* Timeline line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-secondary to-accent transform md:-translate-x-1/2"></div>

      {timeline.map((item, index) => (
        <motion.article
          key={item.year}
          className={`relative flex items-center mb-12 ${
            index % 2 === 0 ? "md:flex-row-reverse" : ""
          }`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          {/* Timeline dot */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10">
            <motion.div
              className="w-4 h-4 rounded-full bg-accent shadow-lg shadow-accent/50 border-4 border-background"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 300,
                delay: index * 0.1 + 0.2,
              }}
            />
          </div>

          {/* Content */}
          <div
            className={`w-full md:w-1/2 ${
              index % 2 === 0 ? "md:pr-12" : "md:pl-12"
            } ml-16 md:ml-0`}
          >
            <motion.div
              className="bg-gradient-to-br from-background/60 to-primary/20 backdrop-blur-sm p-6 rounded-2xl border border-gray-800/50 shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-accent/20 text-accent text-sm font-bold rounded-full">
                  {item.year}
                </span>
              </div>

              <h4 className="text-xl font-bold mb-2 text-white">
                {item.title}
              </h4>
              <h5 className="text-secondary font-semibold mb-3">
                {item.company}
              </h5>
              <p className="text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          </div>
        </motion.article>
      ))}
    </div>
  </motion.section>
);

export default About;
