import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Loader from './components/ui/Loader'
import ScrollToTop from './components/ui/ScrollToTop'
import ScrollRestoration from './components/ui/ScrollRestoration'
import './App.css'
import Contact from './components/pages/Contact'

// Lazy-loaded components
const ProjectDetail = lazy(() => import('./components/pages/ProjectDetail'))
const HomePage = lazy(() => import('./components/pages/HomePage'))

function App () {

  return (
    <>
      <Loader />
      <ScrollRestoration />
      <ScrollToTop/>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  )
}

export default App
