import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import loaderData from '../ui/loader1.json'

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
      <Lottie animationData={loaderData}/>
    </div>
  );
};

export default Loader; 