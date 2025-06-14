import { lazy, useEffect } from 'react'
import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'
import Services from './components/sections/Services'
import Loader from './components/ui/Loader'
import './App.css'

const Projects = lazy(() => import('./components/sections/Projects'))
const About = lazy(() => import('./components/sections/About'))

function App() {
  // Handle scroll to top button visibility
  useEffect(() => {
    const scrollToSection = (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    };

    const handleLinks = () => {
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      anchorLinks.forEach(link => {
        link.addEventListener('click', scrollToSection);
      });

      return () => {
        anchorLinks.forEach(link => {
          link.removeEventListener('click', scrollToSection);
        });
      };
    };

    return handleLinks();
  }, []);

  return (
    <>
      <Loader />
      <Layout>
        <Hero />
        <About />
        <Services />
        <Projects />
      </Layout>
    </>
  )
}

export default App
