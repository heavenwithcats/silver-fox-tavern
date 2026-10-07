import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Navbar from './navbar';

// Import your custom category images from assets
import breakslowImg from '../assets/breakslow.png';
import middayImg from '../assets/midday.png';
import duskImg from '../assets/dusk-dinners.png';
import bakeryImg from '../assets/bakery.png';
import elixirsImg from '../assets/elixirs.png';
import tavernImg from '../assets/the-tavern.png'; // fallback or default fox image

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get('category');

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      let query = supabase.from('recipes').select('*');

      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching recipes:', error);
      } else {
        setRecipes(data || []);
      }
      setLoading(false);
    }

    fetchRecipes();
  }, [selectedCategory]);

  const displayTitle = selectedCategory ? decodeURIComponent(selectedCategory) : 'The Recipe Vault';

  // Helper function to pick the right image asset based on the category name
  const getCategoryAsset = (category) => {
    if (!category) return tavernImg;
    const catLower = category.toLowerCase();
    if (catLower.includes('breakslow')) return breakslowImg;
    if (catLower.includes('nibbles') || catLower.includes('midday')) return middayImg;
    if (catLower.includes('dusk') || catLower.includes('dinner')) return duskImg;
    if (catLower.includes('bakery')) return bakeryImg;
    if (catLower.includes('elixirs') || catLower.includes('brews')) return elixirsImg;
    return tavernImg;
  };

  const currentCategoryImage = getCategoryAsset(selectedCategory);

  return (
    <div className="recipes-container">
      <Navbar />
      
      {/* Category Header with Custom Image Asset Placed Above the Title */}
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <img 
          src={currentCategoryImage} 
          alt={displayTitle} 
          style={{ width: '180px', height: '180px', objectFit: 'cover', borderRadius: '20%', border: '3px solid #628aa8', marginBottom: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }} 
        />
        <h1 className="festive-regular">
          {displayTitle}
        </h1>
      </div>

      {/* Recipe Grid Display */}
      {loading ? (
        <p className="quicksand-fox" style={{ textAlign: 'center' }}>Gathering hearth recipes from the woods...</p>
      ) : recipes.length === 0 ? (
        <p className="quicksand-fox" style={{ textAlign: 'center' }}>No recipes found in this category yet!</p>
      ) : (
        <div className="recipe-grid">
          {recipes.map((item) => (
            <div key={item.id} className="recipe-card">
              <span className="recipe-badge">
                {item.category}
              </span>
              <h3 className="festive-regular">{item.title}</h3>
              <p className="quicksand-fox">{item.description}</p>
              
              <Link to={`/recipes/${item.id}`} className="marshmallow-btn alt-btn" style={{ textAlign: 'center', textDecoration: 'none' }}>
                View Recipe 🐾
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}