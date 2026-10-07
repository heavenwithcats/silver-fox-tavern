import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Navbar from './navbar';
import FavBtn from './favBtn';
export default function Guide() {
  const { id } = useParams(); // Grabs the guide ID from the URL (/guides/1)
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGuideDetails() {
      setLoading(true);
      const { data, error } = await supabase
        .from('guides')
        .select('*')
        .eq('id', id)
        .single(); // Pulls just this specific guide

      if (error) {
        console.error('Error fetching field guide details:', error);
      } else {
        setGuide(data);
      }
      setLoading(false);
    }

    fetchGuideDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="recipes-container">
        <Navbar />
        <p className="quicksand-fox" style={{ textAlign: 'center', marginTop: '50px' }}>
          Unfolding the trail map... 🗺️
        </p>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="recipes-container">
        <Navbar />
        <h2 className="festive-regular" style={{ textAlign: 'center', marginTop: '50px' }}>
          Guide lost in the deep timber! 🌲🐾
        </h2>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/guides" className="marshmallow-btn">Back to Field Guides</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="recipes-container">
      <Navbar />

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
     

        {/* Use your custom guide-card class here */}
        <div className="guide-card" style={{ marginTop: '20px', padding: '40px' }}>
          <span className="guide-badge">{guide.category}</span>
          
          <h1 className="festive-regular" style={{ fontSize: '2.5rem', margin: '15px 0' }}>
            {guide.title}
          </h1>
          
          <p className="quicksand-fox" style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '30px' }}>
            {guide.summary}
          </p>

          <hr style={{ border: 'none', borderTop: '2px dashed #2c003e', margin: '20px 0' }} />

          {/* Guide Content / Lore Section */}
          <div className="quicksand-fox" style={{ lineHeight: '1.8' }}>
            {guide.content}
          </div>
        </div>
      </div>
              <div className='marshmallow-group'>
                   <Link to="/guides" className="marshmallow-btn" >
                  ← Back to Tale Vault
                </Link>
            
        <FavBtn 
                    itemType="guide" 
                    itemId={guide.id} 
                    title={guide.title} 
                    summary={guide.summary} 
                  />
              </div>
    </div>
  );
}