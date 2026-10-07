import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';

// Importing your assets directly from src/assets/
import tavernHero from '../assets/the-tavern.png';
import hearthHarvest from '../assets/hearth-harvest.png';
import firelitTales from '../assets/firelit-tales.png';
import travellersGuide from '../assets/travellers-guide.png';

export default function Home() {
  return (
    <div>
      <Navbar />

      <main className="home-container">
        {/* Hero Section */}
        <section className="home-hero-section">
          <div className="hero-banner-wrapper">
            <img 
              src={tavernHero} 
              alt="The Silver Fox Tavern Hearth" 
              className="home-banner-img" 
            />
          </div>
          <div className="hero-text">
            <h1 className="festive-regular festive-poof-heading">
              Welcome to The Silver Fox Tavern
            </h1>
            <p className="quicksand-fox story-paragraph">
              Deep within the quiet pine woods, where the cold wind whispers through the branches and snow blankets the roof, our door is always unlatched. Pull up a heavy oak stool, warm your hands by the crackling fire pit, and rest your boots. Here at the den, we keep the lanterns lit and the kettles boiling for all who wander in.
            </p>
          </div>
        </section>

        {/* Section 1: Hearth & Harvest (Recipes Spotlight) */}
        <section className="home-story-section">
          <div className="section-image">
            <img 
              src={hearthHarvest} 
              alt="Hearth & Harvest Recipes" 
              className="section-badge-img" 
            />
          </div>
          <div className="section-content">
            <h2 className="festive-regular">Hearth & Harvest Delights</h2>
            <p className="quicksand-fox story-paragraph">
              Whether you are waking to early den frost or returning from a long trek through the timber at dusk, our kitchen is always simmering. From piping hot breakslow bowls and oven-crusted breads to nightfall brews and savory woodland stews, every dish is crafted to warm the soul.
            </p>
            
            {/* Sample Recipe Preview Row */}
            <div className="preview-card-box">
              <h4 className="festive-regular">Tonight's Special at the Hearth:</h4>
              <p className="quicksand-fox preview-text">
                <strong>Rustic Den Stew & Warm Crusty Loaf</strong> — Slow-simmered root vegetables and savory broth, served alongside fresh sourdough baked over open embers.
              </p>
            </div>

            <Link to="/recipes" className="marshmallow-btn">
              Explore All Den Recipes
            </Link>
          </div>
        </section>

        {/* Section 2: Whispering Wood Tales (Story Spotlight Placeholder) */}
        <section className="home-story-section">
          <div className="section-image">
            <img 
              src={firelitTales} 
              alt="Whispering Wood Tales" 
              className="section-badge-img" 
            />
          </div>
          <div className="section-content">
            <h2 className="festive-regular">Whispering Wood Tales</h2>
            <p className="quicksand-fox story-paragraph">
              As nightfall settles over the forest, the hearth crackles softly and old stories are brought to light. Here we gather the legends, cozy hearthside accounts, and quiet memories passed down through generations of woodland travelers.
            </p>

            {/* Story Placeholder */}
            <div className="preview-card-box placeholder-box">
              <h4 className="festive-regular">Tales from the Fireplace</h4>
              <p className="quicksand-fox preview-text italic-text">
                The storybooks rest open on the oak desk... New tales are currently being penned by the tavern fireside. Check back soon for legendary woodland lore!
              </p>
            </div>

            <Link to="/stories" className="marshmallow-btn">
              Gather Around for Tales
            </Link>
          </div>
        </section>

        {/* Section 3: Traveler's Field Guides (Guides Spotlight Placeholder) */}
        <section className="home-story-section">
          <div className="section-image">
            <img 
              src={travellersGuide} 
              alt="Traveler's Field Guides" 
              className="section-badge-img" 
            />
          </div>
          <div className="section-content">
            <h2 className="festive-regular">Traveler's Field Guides</h2>
            <p className="quicksand-fox story-paragraph">
              No woodsman sets out without proper knowledge of the trails. Our field guides contain essential wilderness notes, foraging tips, weather lore, and pathfinding advice for navigating the deep northern woods safely.
            </p>

            {/* Field Guide Placeholder */}
            <div className="preview-card-box placeholder-box">
              <h4 className="festive-regular">Pathfinder Notes</h4>
              <p className="quicksand-fox preview-text italic-text">
                The compasses are calibrated and maps are being charted... Field notes and woodsman guides will be unrolled on the table shortly!
              </p>
            </div>

            <Link to="/guides" className="marshmallow-btn">
              Open Field Guides
            </Link>
          </div>
        </section>
      </main>

      <footer className="tavern-footer">
        <p className="festive-regular">May your boots stay dry, your fire stay bright, and your mug stay full.</p>
      </footer>
    </div>
  );
}