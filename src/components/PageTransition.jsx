import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  const onAnimationEnd = () => {
    if (transitionStage === 'fadeOut') {
      setTransitionStage('fadeIn');
      setDisplayLocation(location);
    }
  };

  return (
    <div
      className={`transition-opacity duration-300 ease-in-out ${
        transitionStage === 'fadeIn' ? 'opacity-100' : 'opacity-0'
      }`}
      onTransitionEnd={onAnimationEnd}
    >
      {/* We must clone the element to pass the old location for exiting elements to render properly if needed, but since we are just doing a fast fade, rendering the children when faded in is fine */}
      {transitionStage === 'fadeOut' ? children : React.cloneElement(children, { key: displayLocation.key })}
    </div>
  );
};

export default PageTransition;
