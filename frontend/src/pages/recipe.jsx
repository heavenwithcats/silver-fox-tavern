import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Navbar from './navbar';
import FavBtn from './favBtn';

export default function Recipe() {
  const { id } = useParams(); // Grabs the ID from the URL (/recipes/1)
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipeDetails() {
      setLoading(true);
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .single(); // Since we only want one specific recipe

      if (error) {
        console.error('Error fetching recipe details:', error);
      } else {
        setRecipe(data);
      }
      setLoading(false);
    }

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="recipes-container">
        <Navbar />
        <p className="quicksand-fox" style={{ textAlign: 'center', marginTop: '50px' }}>
          Consulting the old tavern grimoire... 🐾
        </p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipes-container">
        <Navbar />
        <h2 className="festive-regular" style={{ textAlign: 'center', marginTop: '50px' }}>
          Recipe lost in the woods! 🦊🌲
        </h2>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/recipes" className="marshmallow-btn">Back to Recipe Vault</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="recipes-container">
      <Navbar />

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
     

        <div className="recipe-card" style={{ marginTop: '20px', padding: '40px' }}>
          <span className="recipe-badge">{recipe.category}</span>
          /
          <h1 className="festive-regular" style={{ fontSize: '2.5rem', margin: '15px 0' }}>
            {recipe.title}
          </h1>
          
          <p className="quicksand-fox" style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '30px' }}>
            {recipe.description}
          </p>

          <hr style={{ border: 'none', borderTop: '2px dashed #d4af37', margin: '20px 0' }} />

          {/* Ingredients Section */}
          <h3 className="festive-regular" style={{ fontSize: '1.5rem', marginBottom: '15px' }}>
            🌾 Tavern Ingredients
          </h3>
          <ul className="quicksand-fox" style={{ lineHeight: '1.8', paddingLeft: '20px', marginBottom: '30px' }}>
            {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          {/* Instructions Section */}
          <h3 className="festive-regular" style={{ fontSize: '1.5rem', marginBottom: '15px' }}>
            🔥 Preparation Steps
          </h3>
          <ol className="quicksand-fox" style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
            {recipe.instructions && recipe.instructions.map((step, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
              <div className='marshmallow-group'>
                   <Link to="/recipes" className="marshmallow-btn" >
                  ← Back to Tale Vault
                </Link>
            
        <FavBtn 
                    itemType="recipe" 
                    itemId={recipe.id} 
                    title={recipe.title} 
                    summary={recipe.description} 
                  />
              </div>
    </div>
  );
}