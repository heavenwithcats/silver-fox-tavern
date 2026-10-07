import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Navbar from './navbar';
import FavBtn from './favBtn';

export default function Recipe() {
  const { id } = useParams(); // Grabs the ID from the URL (/recipes/1)
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStoryDetails() {
      setLoading(true);
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('id', id)
        .single(); // Since we only want one specific recipe

      if (error) {
        console.error('Error fetching lore details:', error);
      } else {
        setStory(data);
      }
      setLoading(false);
    }

    fetchStoryDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="recipes-container">
        <Navbar />
        <p className="quicksand-fox" style={{ textAlign: 'center', marginTop: '50px' }}>
          Consulting the silver fox storyteller... 🐾
        </p>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="stories-container">
        <Navbar />
        <h2 className="festive-regular" style={{ textAlign: 'center', marginTop: '50px' }}>
          lore pages lost in the ancient forest! 🦊🌲
        </h2>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/stories" className="marshmallow-btn">Back to Tale Vault</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="stories-container">
      <Navbar />

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
     

        <div className="story-card" style={{ marginTop: '20px', padding: '40px' }}>
          <span className="story-badge">{story.category}</span>
          
          <h1 className="festive-regular" style={{ fontSize: '2.5rem', margin: '15px 0' }}>
            {story.title}
          </h1>
           <h4 className="festive-regular" >
            -{story.author}
          </h4>
          
          <p className="quicksand-fox" style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '30px' }}>
            {story.content}
          </p>

          
        </div>
      </div>
      <div className='marshmallow-group'>
           <Link to="/stories" className="marshmallow-btn" >
          ← Back to Tale Vault
        </Link>
    
<FavBtn 
            itemType="story" 
            itemId={story.id} 
            title={story.title} 
            summary={story.summary || story.excerpt} 
          />
      </div>
    </div>
  );
}