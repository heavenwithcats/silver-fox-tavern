-- Create the recipes table
CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,  -- Breakfast, Lunch, Dinner, Bakery, Drinks
  description TEXT,
  ingredients TEXT[] NOT NULL,     -- Array of ingredients
  instructions TEXT[] NOT NULL,    -- Array of step-by-step instructions
  cozy_rating INT DEFAULT 5,       -- Rating out of 5
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shopping_list (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  ingredient_name VARCHAR(255) NOT NULL,
  recipe_title VARCHAR(255),
  is_checked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed warm & foxy recipes
INSERT INTO recipes (title, category, description, ingredients, instructions, cozy_rating) VALUES
(
  'Sly & Savory Skillet Hash',
  'Breakslow & Early Den Delights',
  'A rustic, heart-warming morning hash topped with golden eggs, crisp potatoes, and savory bacon to keep your tail bushy all day long.',
  ARRAY[
    '3 large russet potatoes, diced',
    '4 slices thick-cut bacon or sausage, chopped',
    '1/2 yellow onion, diced',
    '2 large eggs',
    '1 tbsp olive oil',
    'Salt, pepper, and smoked paprika to taste'
  ],
  ARRAY[
    'Heat oil in a heavy cast-iron skillet over medium heat.',
    'Add diced potatoes and onion, cooking until golden brown and crispy (about 12–15 minutes).',
    'Toss in the bacon or sausage and cook until crisp.',
    'Make two small wells in the hash, crack in the eggs, cover the skillet, and cook until whites are set but yolks remain runny.',
    'Garnish with fresh herbs and serve sizzling hot.'
  ],
  5
),
(
  'The Red Tail Bisque & Grilled Cheese',
  'Midday Nibbles & Burrow Bites',
  'A silky-smooth, vibrant roasted tomato and red pepper soup served alongside a golden melted cheese sandwich. Perfect for warming up frosty paws.',
  ARRAY[
    '1 can (28 oz) crushed roasted tomatoes',
    '1 cup vegetable or chicken broth',
    '1/2 cup heavy cream',
    '2 cloves garlic, minced',
    '4 slices sourdough bread',
    '4 slices sharp cheddar cheese',
    '2 tbsp butter'
  ],
  ARRAY[
    'In a saucepan, simmer tomatoes, garlic, and broth for 15 minutes.',
    'Blend until smooth, stir in the heavy cream, and keep warm over low heat.',
    'Butter the sourdough slices and assemble two grilled cheese sandwiches with sharp cheddar.',
    'Toast the sandwiches in a skillet until golden-brown and gooey.',
    'Dunk the warm grilled cheese straight into the hot soup and enjoy.'
  ],
  5
),
(
  'Foxy Forest Feast Rib-Sticker',
  'Dusk Feasts & Den Dinners',
  'A rich, slow-simmered beef and root vegetable stew with a hint of rosemary, guaranteed to keep the whole den warm on cold nights.',
  ARRAY[
    '1.5 lbs beef chuck roast, cubed',
    '3 large carrots, thick-sliced',
    '2 parsnips, sliced',
    '4 cups beef bone broth',
    '1 tbsp tomato paste',
    '2 sprigs fresh rosemary',
    '2 tbsp flour',
    '2 tbsp butter'
  ],
  ARRAY[
    'Coat beef cubes in flour and sear in butter in a Dutch oven until browned on all sides.',
    'Remove beef, add tomato paste and a splash of broth to deglaze the pot.',
    'Return beef to the pot, add carrots, parsnips, rosemary, and the remaining broth.',
    'Cover and simmer on low heat for 2 hours until the beef is melt-in-your-mouth tender.',
    'Ladle into deep ceramic bowls and serve hot with crusty bread.'
  ],
  5
),
(
  'Bushy-Tail Cinnamon Tail-Twists',
  'The Fox Den Bakery',
  'Warm, spiral-baked pastry twists dripping with gooey cinnamon sugar and a sweet vanilla drizzle.',
  ARRAY[
    '1 sheet puff pastry, thawed',
    '3 tbsp melted butter',
    '1/4 cup brown sugar',
    '1 tbsp ground cinnamon',
    '1/2 cup powdered sugar',
    '1 tbsp milk',
    '1/2 tsp vanilla extract'
  ],
  ARRAY[
    'Preheat oven to 400°F (200°C) and line a baking sheet with parchment paper.',
    'Brush puff pastry with melted butter and sprinkle generously with brown sugar and cinnamon.',
    'Cut into strips, twist each strip into a spiral, and place on the baking sheet.',
    'Bake for 12–15 minutes until puffed and deep golden brown.',
    'Whisk powdered sugar, milk, and vanilla together, then drizzle over warm twists before serving.'
  ],
  5
),
(
  'Spiced Fireside Fox-Cider',
  'Nightfall Elixirs & Warm Brews',
  'A steaming mug of spiced apple cider infused with cinnamon, clove, and orange slices to sip while curled up by the fireplace.',
  ARRAY[
    '4 cups fresh apple cider',
    '2 cinnamon sticks',
    '3 whole cloves',
    '1 star anise',
    '1/2 orange, sliced',
    'Whipped cream and caramel drizzle for topping (optional)'
  ],
  ARRAY[
    'Combine cider, cinnamon sticks, cloves, star anise, and orange slices in a small pot.',
    'Bring to a gentle simmer over medium heat, then reduce heat to low and steep for 20 minutes.',
    'Strain out the spices and fruit slices.',
    'Pour into ceramic mugs and top with whipped cream and caramel if desired.'
  ],
  5
);