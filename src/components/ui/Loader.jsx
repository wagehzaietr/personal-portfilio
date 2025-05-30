import { useState, useEffect } from 'react';

const Loader = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Begin fade out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // Remove from DOM after fade completes
    const removeTimer = setTimeout(() => {
      setHidden(true);
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          {/* Outer spinner */}
          <div className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-accent border-l-transparent rounded-full animate-spin"></div>
          
          {/* Inner spinner */}
          <div className="absolute inset-2 border-4 border-t-transparent border-r-primary border-b-transparent border-l-accent rounded-full animate-spin-slow"></div>
        </div>
        
        <h2 className="mt-6 text-xl font-bold text-white animate-pulse">Loading...</h2>
      </div>
    </div>
  );
};

export default Loader; 