import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Navbar from './navbar';

// Import your custom story asset graphic
import storiesImg from '../assets/stories.png';

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      setLoading(true);
      // Fetching from your Supabase stories table
      const { data, error } = await supabase.from('stories').select('*');

      if (error) {
        console.error('Error fetching wood tales:', error);
      } else {
        setStories(data || []);
      }
      setLoading(false);
    }

    fetchStories();
  }, []);

  return (
    <div className="recipes-container">
      <Navbar />
      
      {/* Page Header with Custom Stories Asset */}
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <img 
          src={storiesImg} 
          alt="Whispering Wood Tales" 
          style={{ width: '180px', height: '180px', objectFit: 'cover', borderRadius: '20%', border: '3px solid #628aa8', marginBottom: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }} 
        />
        <h1 className="festive-regular">
          Whispering Wood Tales
        </h1>
        <p className="quicksand-fox" style={{ fontStyle: 'italic', color: '#5c4033' }}>
          Legends, campfire echoes, and secrets carried by the Northern wind...
        </p>
      </div>

      {/* Stories Grid Display using your custom classes */}
      {loading ? (
        <p className="quicksand-fox" style={{ textAlign: 'center' }}>Gathering tales from the hearthfire...</p>
      ) : stories.length === 0 ? (
        <p className="quicksand-fox" style={{ textAlign: 'center' }}>No tales written in the ledger yet!</p>
      ) : (
        <div className="story-grid">
          {stories.map((story) => (
            <div key={story.id} className="story-card">
              <span className="story-badge">
                {story.category || 'Wood Tale'}
              </span>
              <h3 className="festive-regular">{story.title}</h3>
              <p className="quicksand-fox">{story.summary}</p>
              
              <Link to={`/stories/${story.id}`} className="marshmallow-btn alt-btn" style={{ textAlign: 'center', textDecoration: 'none' }}>
                Read Tale 🌲
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}