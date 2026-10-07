import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png';
import profileIcon from '../assets/Profile.png';
import { supabase } from '../supabaseClient';

export default function Navbar() {
  const [userData, setUserData] = useState({ name: 'Traveler', avatar: profileIcon });

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const meta = user.user_metadata || {};
        setUserData({
          name: meta.full_name || meta.name || user.email?.split('@')[0] || 'Traveler',
          avatar: meta.avatar_url || meta.picture || profileIcon,
        });
      }
    }
    fetchUser();
  }, []);

  return (
    <header className="tavern-navbar">
      {/* Left: Brand Logo */}
      <div className="nav-brand">
        <Link to="/home" className="festive-regular festive-poof-heading">
          <img src={logo} alt="The Silver Fox Tavern Logo" className="nav-logo" />
        </Link>
      </div>

      {/* Center: Navigation Links with Category Dropdown */}
      <nav className="nav-links quicksand-fox">
        <div className="nav-dropdown">
          <Link to="/recipes" className="nav-item festive-regular festive-poof-heading">Recipes</Link>
          <div className="dropdown-menu">
            <Link to="/recipes" className="festive-regular festive-poof-heading">All Den Recipes</Link>
            <Link to="/recipes?category=Breakslow%20%26%20Early%20Den%20Delights" className="festive-regular festive-poof-heading">Breakslow & Early Den</Link>
            <Link to="/recipes?category=Midday%20Nibbles%20%26%20Burrow%20Bites" className="festive-regular festive-poof-heading">Midday Nibbles</Link>
            <Link to="/recipes?category=Dusk%20Feasts%20%26%20Den%20Dinners" className="festive-regular festive-poof-heading">Dusk Feasts</Link>
            <Link to="/recipes?category=The%20Fox%20Den%20Bakery" className="festive-regular festive-poof-heading">Fox Den Bakery</Link>
            <Link to="/recipes?category=Nightfall%20Elixirs%20%26%20Warm%20Brews" className="festive-regular festive-poof-heading">Nightfall Elixirs</Link>
          </div>
        </div>

        <Link to="/stories" className="festive-regular festive-poof-heading">Whispering Wood Tales</Link>
        <Link to="/guides" className="festive-regular festive-poof-heading">Traveler's Field Guides</Link>
        <Link to="/sack" className="festive-regular festive-poof-heading">The Traveler's Sack</Link>
      </nav>

      {/* Right: Profile Avatar & Name */}
      <div className="nav-profile">
        <Link to="/profile" className="profile-link">
          <img src={userData.avatar} alt={userData.name} className="nav-profile-img" />
          <span className="festive-regular festive-poof-heading nav-user-name">{userData.name}</span>
        </Link>
      </div>
    </header>
  );
}