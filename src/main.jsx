import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Register performance observer to monitor long tasks
if (process.env.NODE_ENV === 'production') {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log or send to analytics long tasks (>50ms)
        if (entry.duration > 50) {
          console.log('Long task detected:', entry);
        }
      }
    });
    
    observer.observe({ entryTypes: ['longtask'] });
  } catch (e) {
    console.log('PerformanceObserver not supported');
  }
}

// Create root with concurrent mode
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Add loading state to root element to prevent FOUC
if (rootElement) {
  rootElement.style.visibility = 'visible';
}

// Render with StrictMode only in development
if (process.env.NODE_ENV === 'development') {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  root.render(<App />);
}
