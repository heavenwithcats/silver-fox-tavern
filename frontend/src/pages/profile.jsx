import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Navbar from './navbar';

import Pro from '../assets/Profile.png';

export default function Profile() {
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch current user details from Supabase Auth and metadata on load
  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const meta = user.user_metadata || {};
        setName(meta.full_name || meta.name || user.email?.split('@')[0] || '');
        setAvatarUrl(meta.avatar_url || meta.picture || Pro);
      }
    }
    fetchProfile();
  }, []);

  // Handle updating user profile metadata in Supabase
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      data: { 
        full_name: name, 
        avatar_url: avatarUrl 
      },
    });

    if (error) {
      alert('Error updating profile: ' + error.message);
    } else {
      alert('Profile updated successfully!');
      window.location.reload();
    }
    setLoading(false);
  };

  // Handle user logout session termination
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('Error logging out: ' + error.message);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="profile-card">
        <h1 className='festive-regular'>Edit Profile</h1>

        <div className="profile-avatar-wrapper">
          <img
            src={avatarUrl || Pro}
            alt="Profile Avatar Preview"
            className="profile-preview-avatar"
          />
        </div>

        <form onSubmit={handleUpdateProfile} className="profile-form">
          <div className="form-group">
            <label className="form-label quicksand-fox">Travellers Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your display name..."
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label quicksand-fox">Travellers URL</label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/avatar.png"
              className="form-input"
            />
          </div>
         <div className='marshmallow-group'>
          <button type="submit" className="btn-primary marshmallow-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
           <button onClick={handleLogout} className="btn-secondary logout-btn marshmallow-btn">
          Log Out
        </button>
        
        </div>
        </form>

      

       
      </div>

    </div>
  );
}