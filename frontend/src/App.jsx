import { useState, useEffect } from 'react'
import './App.css'
import FoxLoader from './FoxLoading';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true)
useEffect(() => {
    // 1. Record the exact millisecond time when the app starts
    const startTime = Date.now();
    const MINIMUM_HOLD_TIME = 5000; // 5000ms = 5 full seconds! Change this to whatever you want.

    // 2. Fetch recipes from your backend
    fetch('http://localhost:5000/api/recipes')
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);

        // 3. Calculate how long the fetch actually took
        const elapsedTime = Date.now() - startTime;
        
        // 4. Calculate how much remaining time we need to wait to hit our target
        const remainingTime = Math.max(0, MINIMUM_HOLD_TIME - elapsedTime);

        // 5. Wait out the remaining time before turning off the loader
        setTimeout(() => {
          setLoading(false);
        }, remainingTime);
      })
      .catch((err) => {
        console.error('Error fetching recipes:', err);
        // Even on error, hold for the minimum time so it doesn't flash awkwardly
        setTimeout(() => setLoading(false), MINIMUM_HOLD_TIME);
      });
  }, []);

  return (
  <div className="app-container">
      <header className="main-header">
        <h1 className="header-title">The Silver Fox Tavern</h1>
        <p className="header-subtitle">
          Cozy recipes for warm hearts and warm hearths.
        </p>
      </header>

      <main className="content-area">
        {loading ? (
          <FoxLoader scale={3.2}/>
        ) : recipes.length === 0 ? (
          <div className="empty-card">
            <p className="empty-title">No recipes in the database yet!</p>
            <p className="empty-subtitle">
              Once we decide on cats vs. foxes and insert our recipes, they will appear right here.
            </p>
          </div>
        ) : (
          <div className="recipe-grid">
{recipes.map((recipe) => {
  // 1. Convert the ingredient array into a search string
  // Example: ['2 cups flour', '1 tsp cinnamon'] -> "flour cinnamon"
  const ingredientSearchQuery = recipe.ingredients 
    ? recipe.ingredients.map(item => item.replace(/[\d\/\.\,\-\s]+(cups?|tsps?|tbsps?|oz|lbs?|grams?)?/gi, '').trim()).join(' ')
    : recipe.title;

  const instacartUrl = `https://www.instacart.com/store/s?k=${encodeURIComponent(ingredientSearchQuery)}`;

  return (
    <div key={recipe.id} className="recipe-card">
      <div className="card-header">
        <span className="category-badge">{recipe.category}</span>
        <span className="rating-stars">
          {'⭐'.repeat(recipe.cozy_rating || 5)}
        </span>
      </div>
      
      <h2 className="recipe-title">{recipe.title}</h2>
      <p className="recipe-description">{recipe.description}</p>

      {/* Render the ingredients list */}
      <div className="ingredients-section">
        <h3>Cozy Ingredients:</h3>
        <ul>
          {recipe.ingredients && recipe.ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      <a 
        href={instacartUrl}
        target="_blank" 
        rel="noopener noreferrer"
        className="instacart-btn"
      >
        🛒 Shop Recipe Ingredients on Instacart
      </a>
    </div>
  );
})}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
