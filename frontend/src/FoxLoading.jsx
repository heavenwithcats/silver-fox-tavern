import React, { useState, useEffect } from 'react';
import foxScarf from './assets/Fox.gif';
import './FoxLoader.css';

const FoxLoader = ({ children, duration = 1200 }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  // 1. If still loading, show the fox loader
  if (loading) {
    return (
      <div className="fox-loader-overlay">
        <div className="fox-card">
          <img 
            src={foxScarf} 
            alt="Cozy fox in snow" 
            className="fox-gif-img" 
          />
        </div>
      </div>
    );
  }

  // 2. Once loading is false (after 1200ms), reveal the page!
  return children;
};

export default FoxLoader;