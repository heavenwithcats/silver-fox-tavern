import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Navbar from './navbar';

// Import your empty sack asset or default image
import emptySackImg from '../assets/bf-fav-story.png';

export default function TravelersSack() {
  const [recipes, setRecipes] = useState([]);
  const [stories, setStories] = useState([]);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSack() {
      setLoading(true);
      const { data, error } = await supabase.from('travelers_sack').select('*');

      if (!error && data) {
        setRecipes(data.filter(item => item.item_type === 'recipe'));
        setStories(data.filter(item => item.item_type === 'story'));
        setGuides(data.filter(item => item.item_type === 'guide'));
      }
      setLoading(false);
    }

    fetchSack();
  }, []);

  const totalItems = recipes.length + stories.length + guides.length;
  const isEmpty = totalItems === 0;

  return (
    <div className="recipes-container">
      <Navbar />

      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <img 
          src={emptySackImg} 
          alt="The Traveler's Sack" 
          style={{ width: '120px', height: '120px', objectFit: 'contain', marginBottom: '10px' }} 
        />
        <h1 className="festive-regular">The Traveler's Sack</h1>
        <p className="quicksand-fox" style={{ fontStyle: 'italic', color: '#5c4033' }}>
          {isEmpty 
            ? "Your sack is empty. Collect your favorite recipes, tales, and guides along your journey!" 
            : "Your personal vault of cherished woodland treasures."}
        </p>
      </div>

      {loading ? (
        <p className="quicksand-fox" style={{ textAlign: 'center' }}>Untying the leather strings...</p>
      ) : isEmpty ? (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Link to="/home" className="marshmallow-btn" style={{ textDecoration: 'none' }}>
            Explore the Tavern 🌲
          </Link>
        </div>
      ) : (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Recipes Section */}
          {recipes.length > 0 && (
            <div style={{ marginBottom: '50px' }}>
              <div style={{ borderBottom: '2px dashed #d4af37', paddingBottom: '10px', marginBottom: '20px' }}>
                <h2 className="festive-regular" style={{ margin: 0, color: '#5c4033' }}>Saved Recipes 🥧</h2>
              </div>
              <div className="recipe-grid">
                {recipes.map(item => (
                  <div key={item.id} className="recipe-card">
                    <span className="recipe-badge">Recipe</span>
                    <h3 className="festive-regular">{item.title}</h3>
                    <p className="quicksand-fox">{item.summary}</p>
                    <Link to={`/recipes/${item.item_id}`} className="marshmallow-btn" style={{ textDecoration: 'none', textAlign: 'center' }}>
                      View Recipe 📖
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stories Section */}
          {stories.length > 0 && (
            <div style={{ marginBottom: '50px' }}>
              <div style={{ borderBottom: '2px dashed #9370db', paddingBottom: '10px', marginBottom: '20px' }}>
                <h2 className="festive-regular" style={{ margin: 0, color: '#4b0082' }}>Whispering Wood Tales 🌲</h2>
              </div>
              <div className="story-grid">
                {stories.map(item => (
                  <div key={item.id} className="story-card">
                    <span className="story-badge">Tale</span>
                    <h3 className="festive-regular">{item.title}</h3>
                    <p className="quicksand-fox">{item.summary}</p>
                    <Link to={`/stories/${item.item_id}`} className="marshmallow-btn alt-btn" style={{ textDecoration: 'none', textAlign: 'center' }}>
                      Read Tale ✨
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Guides Section */}
          {guides.length > 0 && (
            <div style={{ marginBottom: '50px' }}>
              <div style={{ borderBottom: '2px dashed #708090', paddingBottom: '10px', marginBottom: '20px' }}>
                <h2 className="festive-regular" style={{ margin: 0, color: '#2f4f4f' }}>Traveler's Field Guides 🗺️</h2>
              </div>
              <div className="guide-grid">
                {guides.map(item => (
                  <div key={item.id} className="guide-card">
                    <span className="guide-badge">Guide</span>
                    <h3 className="festive-regular">{item.title}</h3>
                    <p className="quicksand-fox">{item.summary}</p>
                    <Link to={`/guides/${item.item_id}`} className="marshmallow-btn alt-btn" style={{ textDecoration: 'none', textAlign: 'center' }}>
                      Read Guide 🧭
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}