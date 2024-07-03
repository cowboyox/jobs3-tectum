import { useEffect, useState } from 'react';

export const useHandleResize = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSmallScreen(true);
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setIsSmallScreen(false);
      } else {
        setIsSmallScreen(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isSmallScreen };
};
