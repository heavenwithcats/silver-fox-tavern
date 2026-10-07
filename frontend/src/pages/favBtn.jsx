import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// Import your custom silver fox before/after assets
import bfRecipe from '../assets/bf-fav-recipe.png';
import aftRecipe from '../assets/aft-fav-recipe.png';
import bfStory from '../assets/bf-fav-story.png';
import aftStory from '../assets/aft-fav-story.png';
import bfGuide from '../assets/bf-fav-guide.png';
import aftGuide from '../assets/aft-fav-guide.png';

export default function FavBtn({ itemType, itemId, title, summary }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  // Select the correct images based on item type
  const getImagePair = () => {
    switch (itemType) {
      case 'recipe':
        return { before: bfRecipe, after: aftRecipe, label: 'Recipe' };
      case 'story':
        return { before: bfStory, after: aftStory, label: 'Tale' };
      case 'guide':
        return { before: bfGuide, after: aftGuide, label: 'Guide' };
      default:
        return { before: bfRecipe, after: aftRecipe, label: 'Item' };
    }
  };

  const images = getImagePair();

  // Check Supabase on load to see if it's already in the sack
  useEffect(() => {
    async function checkSackStatus() {
      setLoading(true);
      const { data } = await supabase
        .from('travelers_sack')
        .select('*')
        .eq('item_type', itemType)
        .eq('item_id', itemId)
        .single();

      if (data) {
        setIsFavorited(true);
      }
      setLoading(false);
    }

    checkSackStatus();
  }, [itemType, itemId]);

  // Handle clicking the button to add/remove from Supabase
  const handleToggle = async () => {
    setLoading(true);
    if (isFavorited) {
      const { error } = await supabase
        .from('travelers_sack')
        .delete()
        .eq('item_type', itemType)
        .eq('item_id', itemId);

      if (!error) setIsFavorited(false);
    } else {
      const { error } = await supabase
        .from('travelers_sack')
        .insert([{ item_type: itemType, item_id: itemId, title, summary }]);

      if (!error) setIsFavorited(true);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className='marshmallow-btn'
    >
      <img
        src={isFavorited ? images.after : images.before}
        alt="Favorite state"
        style={{ width: '70px', height: '70px', objectFit: 'contain' }}
      />
      <span style={{ color: '#5c4033', fontWeight: 'bold', fontSize: '0.9rem' }}>
        {isFavorited ? `Saved ${images.label}` : `Add ${images.label} to Sack`}
      </span>
    </button>
  );
}