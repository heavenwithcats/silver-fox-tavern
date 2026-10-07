import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Navbar from './navbar';

// Import your custom field guides asset graphic
import guidesImg from '../assets/guides.png'; // Update with your actual asset name if needed

export default function Guides() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGuides() {
      setLoading(true);
      const { data, error } = await supabase.from('guides').select('*');

      if (error) {
        console.error('Error fetching field guides:', error);
      } else {
        setGuides(data || []);
      }
      setLoading(false);
    }

    fetchGuides();
  }, []);

  return (
    <div className="recipes-container">
      <Navbar />
      
      {/* Page Header with Custom Guides Asset */}
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <img 
          src={guidesImg} 
          alt="Traveler's Field Guides" 
         style={{ width: '180px', height: '180px', objectFit: 'cover', borderRadius: '20%', border: '3px solid #628aa8', marginBottom: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }} 
        />
        <h1 className="festive-regular">
          Traveler's Field Guides
        </h1>
        <p className="quicksand-fox" style={{ fontStyle: 'italic', color: '#5c4033' }}>
          Maps, survival lore, and wisdom gathered from the deep woods...
        </p>
      </div>

      {/* Guides Grid Display using your custom grayish-blue classes */}
      {loading ? (
        <p className="quicksand-fox" style={{ textAlign: 'center' }}>Unfurling the trail maps...</p>
      ) : guides.length === 0 ? (
        <p className="quicksand-fox" style={{ textAlign: 'center' }}>No field guides recorded in the ledger yet!</p>
      ) : (
        <div className="guide-grid">
          {guides.map((guide) => (
            <div key={guide.id} className="guide-card">
              <span className="guide-badge">
                {guide.category || 'Field Lore'}
              </span>
              <h3 className="festive-regular">{guide.title}</h3>
              <p className="quicksand-fox">{guide.summary}</p>
              
              <Link to={`/guides/${guide.id}`} className="marshmallow-btn alt-btn" style={{ textAlign: 'center', textDecoration: 'none' }}>
                Read Guide 🗺️
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}