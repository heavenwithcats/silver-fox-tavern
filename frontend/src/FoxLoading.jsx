import React from 'react';
import foxScarf from './assets/Fox.gif'; // Import your new fox image!
import './FoxLoader.css';

const FoxLoader = () => {
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
};

export default FoxLoader;