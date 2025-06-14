import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import loaderData from '../ui/loader1.json';

const Loader = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Disable scrolling when loader mounts
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    // Begin fade out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // Remove from DOM after fade completes
    const removeTimer = setTimeout(() => {
      setHidden(true);
      // Re-enable scrolling when loader unmounts
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      // Cleanup - re-enable scrolling if component unmounts early
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, []);

  if (hidden) return null;

  return (
    <div className={`
      fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500
      ${fadeOut ? 'opacity-0' : 'opacity-100'}
    `}>
      <Lottie className="w-[600px] h-[600px]" animationData={loaderData}/>
    </div>
  );
};

export default Loader;