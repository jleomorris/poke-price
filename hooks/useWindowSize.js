import { useEffect, useState } from 'react';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return [width, height];
};

const useWindowSize = () => {
  const [screenWidth, setScreenWidth] = useState(getWindowDimensions()[0]);
  const [screenHeight, setScreenHeight] = useState(getWindowDimensions()[1]);

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return { screenWidth: screenWidth, screenHeight: screenHeight };
};

export default useWindowSize;
