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

-- Seed multiple recipes per category into the same table
INSERT INTO recipes (title, category, description, ingredients, instructions, cozy_rating) VALUES

-- ============================================================
-- 1. BREAKSLOW & EARLY DEN DELIGHTS (Breakfast & Morning Options)
-- ============================================================
(
  'Sly & Savory Skillet Hash',
  'Breakslow & Early Den Delights',
  'A rustic, heart-warming morning hash topped with golden eggs, crisp potatoes, and savory bacon.',
  ARRAY['3 large russet potatoes, diced', '4 slices thick-cut bacon, chopped', '1/2 yellow onion, diced', '2 large eggs', '1 tbsp olive oil', 'Salt, pepper, and smoked paprika'],
  ARRAY['Heat oil in a heavy cast-iron skillet over medium heat.', 'Add diced potatoes and onion, cooking until golden brown and crispy (about 12–15 minutes).', 'Toss in bacon and cook until crisp.', 'Make two small wells, crack in eggs, cover, and cook until whites set.', 'Garnish with herbs and serve hot.'],
  5
),
(
  'Toasted Marshmallow Hearth-Cakes',
  'Breakslow & Early Den Delights',
  'Thick, fluffy buttermilk pancakes stuffed with toasted marshmallow bits and topped with hot maple-cinnamon drizzle.',
  ARRAY['2 cups flour', '2 tsp baking powder', '1/2 tsp baking soda', '1.5 cups buttermilk', '2 eggs', '3 tbsp melted butter', '1 cup mini marshmallows', 'Warm maple syrup & cinnamon'],
  ARRAY['Whisk dry ingredients in a large bowl.', 'In a separate bowl, whisk buttermilk, eggs, and melted butter.', 'Combine wet and dry ingredients until just mixed.', 'Fold in mini marshmallows gently.', 'Ladle onto a hot buttered griddle and cook until bubbles form, flip, and cook until golden brown.', 'Drizzle with warm maple syrup.'],
  5
),
(
  'Curled-Tail Oats with Roasted Apples & Honey',
  'Breakslow & Early Den Delights',
  'Creamy steel-cut oats simmered in oat milk, topped with butter-roasted apples, walnuts, and wild forest honey.',
  ARRAY['1 cup steel-cut oats', '3 cups oat milk or whole milk', '1 tsp cinnamon', '2 Honeycrisp apples, diced', '2 tbsp butter', '2 tbsp brown sugar', 'Handful of chopped walnuts', 'Drizzle of wild honey'],
  ARRAY['In a saucepan, bring milk and oats to a gentle simmer. Cook low and slow for 20 minutes.', 'In a small skillet, sauté diced apples in butter and brown sugar until caramelized and soft.', 'Spoon warm oats into deep ceramic bowls.', 'Top with caramelized apples, chopped walnuts, and a heavy drizzle of wild honey.'],
  5
),

-- ============================================================
-- 2. MIDDAY NIBBLES & BURROW BITES (Lunch & Midday Comfort)
-- ============================================================
(
  'The Red Tail Bisque & Grilled Cheese',
  'Midday Nibbles & Burrow Bites',
  'A silky-smooth, vibrant roasted tomato bisque served alongside a golden melted cheddar sandwich on sourdough.',
  ARRAY['1 can (28 oz) crushed roasted tomatoes', '1 cup vegetable broth', '1/2 cup heavy cream', '2 cloves garlic, minced', '4 slices sourdough bread', '4 slices sharp cheddar cheese', '2 tbsp butter'],
  ARRAY['Simmer tomatoes, garlic, and broth in a saucepan for 15 minutes.', 'Blend until smooth, stir in heavy cream, and keep warm.', 'Assemble sourdough and cheddar sandwiches, buttering the outside.', 'Toast in a skillet until golden brown and gooey.', 'Serve hot alongside the bisque.'],
  5
),
(
  'Forager’s Forest Mushroom Skillet Toast',
  'Midday Nibbles & Burrow Bites',
  'Wild sautéed cremini and chanterelle mushrooms in garlic herb butter, piled high on thick grilled artisan bread.',
  ARRAY['1/2 lb wild mushrooms (cremini, chanterelle, or shiitake), sliced', '2 tbsp butter', '1 tbsp olive oil', '2 cloves garlic, minced', '1 tbsp fresh thyme', '2 thick slices rustic sourdough', '1 tbsp goat cheese or cream cheese'],
  ARRAY['Heat butter and olive oil in a skillet over medium-high heat.', 'Add sliced mushrooms and let sear undisturbed for 3 minutes until golden.', 'Add garlic and fresh thyme, tossing until fragrant.', 'Toast sourdough slices and spread with a layer of cream cheese or goat cheese.', 'Pile warm sautéed mushrooms over the toast and serve immediately.'],
  5
),

-- ============================================================
-- 3. DUSK FEASTS & DEN DINNERS (Hearty Evening Dinners)
-- ============================================================
(
  'Foxy Forest Feast Rib-Sticker',
  'Dusk Feasts & Den Dinners',
  'A rich, slow-simmered beef and root vegetable stew with a hint of fresh rosemary and garlic.',
  ARRAY['1.5 lbs beef chuck roast, cubed', '3 large carrots, thick-sliced', '2 parsnips, sliced', '4 cups beef bone broth', '1 tbsp tomato paste', '2 sprigs fresh rosemary', '2 tbsp flour', '2 tbsp butter'],
  ARRAY['Coat beef cubes in flour and sear in butter in a Dutch oven until browned.', 'Add tomato paste and a splash of broth to deglaze.', 'Return beef, add carrots, parsnips, rosemary, and remaining broth.', 'Cover and simmer on low heat for 2 hours until tender.', 'Serve in deep bowls with crusty bread.'],
  5
),
(
  'Hunter’s Moon Roasted Pork & Bramble Glaze',
  'Dusk Feasts & Den Dinners',
  'Tender roasted pork loin glazed with a warm blackberry and thyme reduction, served with buttered mashed potatoes.',
  ARRAY['2 lb pork tenderloin', '1 tbsp olive oil', '1 cup fresh or frozen blackberries', '2 tbsp honey', '1 tbsp balsamic vinegar', '1 tsp fresh thyme', 'Salt and cracked pepper'],
  ARRAY['Preheat oven to 400°F (200°C). Season pork with oil, salt, and pepper.', 'Sear tenderloin in a hot skillet on all sides, then transfer to a baking dish and roast for 20 minutes.', 'In a small pot, simmer blackberries, honey, balsamic vinegar, and thyme until berries burst.', 'Spoon warm bramble glaze over roasted pork loin before slicing.'],
  5
),

-- ============================================================
-- 4. THE FOX DEN BAKERY (Sweets, Pastries & Baked Treats)
-- ============================================================
(
  'Bushy-Tail Cinnamon Tail-Twists',
  'The Fox Den Bakery',
  'Warm, spiral-baked pastry twists dripping with gooey cinnamon sugar and a sweet vanilla drizzle.',
  ARRAY['1 sheet puff pastry, thawed', '3 tbsp melted butter', '1/4 cup brown sugar', '1 tbsp ground cinnamon', '1/2 cup powdered sugar', '1 tbsp milk', '1/2 tsp vanilla extract'],
  ARRAY['Preheat oven to 400°F (200°C) and line a baking sheet with parchment paper.', 'Brush puff pastry with melted butter and sprinkle with brown sugar and cinnamon.', 'Cut into strips, twist each into a spiral, and place on baking sheet.', 'Bake for 12–15 minutes until puffed and golden.', 'Drizzle vanilla glaze over warm twists before serving.'],
  5
),
(
  'Spiced Brambleberry & Apple Tart',
  'The Fox Den Bakery',
  'A golden, flaky pastry tart stuffed with warm spiced apples, wild blackberries, and a dusting of powdered sugar.',
  ARRAY['1 pre-made pie crust', '2 Granny Smith apples, peeled and sliced', '1 cup blackberries', '1/4 cup sugar', '1 tsp cinnamon', '1/4 tsp nutmeg', '1 egg (for egg wash)'],
  ARRAY['Preheat oven to 375°F (190°C).', 'Toss apple slices and blackberries with sugar, cinnamon, and nutmeg.', 'Roll out pie crust onto a baking sheet, pile fruit into the center leaving a 2-inch border.', 'Fold edges of crust over the fruit, brush crust with beaten egg.', 'Bake for 35 minutes until crust is deep golden brown.'],
  5
),

-- ============================================================
-- 5. NIGHTFALL ELIXIRS & WARM BREWS (Drinks & Ciders)
-- ============================================================
(
  'Spiced Fireside Fox-Cider',
  'Nightfall Elixirs & Warm Brews',
  'A steaming mug of spiced apple cider infused with cinnamon, clove, and orange slices.',
  ARRAY['4 cups fresh apple cider', '2 cinnamon sticks', '3 whole cloves', '1 star anise', '1/2 orange, sliced', 'Whipped cream and caramel drizzle'],
  ARRAY['Combine cider, cinnamon sticks, cloves, star anise, and orange slices in a pot.', 'Simmer over low heat for 20 minutes to steep spices.', 'Strain out whole spices and orange slices.', 'Pour into mugs and top with whipped cream and caramel.'],
  5
),
(
  'Curled-Tail Hot Cocoa with Marshmallow Pillows',
  'Nightfall Elixirs & Warm Brews',
  'Rich dark chocolate melted into warm milk with vanilla, topped with oversized toasted marshmallows.',
  ARRAY['3 cups whole milk or oat milk', '1/2 cup dark chocolate chips', '2 tbsp cocoa powder', '2 tbsp brown sugar', '1/2 tsp vanilla extract', 'Jumbo marshmallows'],
  ARRAY['Whisk milk, cocoa powder, and brown sugar in a saucepan over medium heat until warm.', 'Stir in dark chocolate chips and vanilla until chocolate is completely melted and silky.', 'Pour into mugs, float jumbo marshmallows on top, and toast briefly with a kitchen torch if available.'],
  5
);

-- Additional Cozy Woodland Recipes for The Silver Fox Tavern
INSERT INTO recipes (title, category, description, ingredients, instructions, cozy_rating) VALUES

-- ============================================================
-- 1. BREAKSLOW & EARLY DEN DELIGHTS (Breakfast & Morning Options)
-- ============================================================
(
  'Silver Fox Flapjack Stack',
  'Breakslow & Early Den Delights',
  'Fluffy, golden flapjacks layered with sweet huckleberry compote and a swirl of sweet whipped cream.',
  ARRAY['2 cups flour', '2 tbsp sugar', '2 tsp baking powder', '1/2 tsp salt', '2 eggs', '1.5 cups milk', '1/4 cup melted butter', '1 cup wild huckleberries or blueberries', 'Whipped cream'],
  ARRAY['Whisk flour, sugar, baking powder, and salt in a bowl.', 'In another bowl, whisk eggs, milk, and melted butter.', 'Combine wet and dry ingredients until just incorporated.', 'Gently fold in half the huckleberries.', 'Cook on a hot, greased griddle until golden on both sides.', 'Stack high and top with remaining berries and whipped cream.'],
  5
),
(
  'Bramblewood Berry & Nut Granola Bowl',
  'Breakslow & Early Den Delights',
  'Crunchy honey-roasted oats, toasted pecans, and dried mountain cranberries served over thick Greek yogurt.',
  ARRAY['2 cups rolled oats', '1/2 cup chopped pecans', '1/4 cup pumpkin seeds', '3 tbsp maple syrup', '2 tbsp melted coconut oil', '1/2 cup dried cranberries', '2 cups vanilla Greek yogurt'],
  ARRAY['Preheat oven to 325°F (165°C).', 'Toss oats, pecans, and pumpkin seeds with maple syrup and coconut oil.', 'Spread evenly on a baking sheet and bake for 20 minutes, stirring halfway, until toasted.', 'Let cool completely and stir in dried cranberries.', 'Layer over chilled Greek yogurt and serve.'],
  5
),
(
  'Red Vixen Country Egg Skillet',
  'Breakslow & Early Den Delights',
  'Farm-fresh eggs baked in a savory skillet of country sausage, sweet bell peppers, and melted sharp cheddar cheese.',
  ARRAY['1/2 lb breakfast sausage, crumbled', '1/2 red bell pepper, diced', '1/2 green bell pepper, diced', '1/2 yellow onion, diced', '4 large eggs', '1 cup sharp cheddar cheese, shredded', 'Fresh chives, chopped'],
  ARRAY['Sauté breakfast sausage, peppers, and onions in an iron skillet until meat is browned and vegetables are tender.', 'Reduce heat to low and sprinkle shredded cheddar evenly over the mixture.', 'Make four small indents and crack an egg into each.', 'Cover and cook for 6–8 minutes until egg whites are set but yolks remain soft.', 'Garnish with fresh chives and serve immediately.'],
  5
),

-- ============================================================
-- 2. MIDDAY NIBBLES & BURROW BITES (Lunch & Midday Comfort)
-- ============================================================
(
  'Old Tavern Potato & Leek Chowder',
  'Midday Nibbles & Burrow Bites',
  'A rich, velvety soup filled with tender Yukon gold potatoes, buttered leeks, and crispy smoked bacon crumble.',
  ARRAY['4 large Yukon Gold potatoes, peeled and diced', '3 large leeks, white and pale green parts sliced', '4 cups vegetable or chicken broth', '1 cup heavy cream', '3 tbsp butter', '4 slices cooked bacon, crumbled', 'Salt and white pepper'],
  ARRAY['Melt butter in a heavy soup pot over medium heat; add leeks and sauté until soft and sweet.', 'Add diced potatoes and broth; bring to a boil, then cover and simmer for 15 minutes until potatoes are soft.', 'Use an immersion blender to partially blend the soup, leaving rustic potato chunks.', 'Stir in heavy cream, season with salt and white pepper, and warm through.', 'Ladle into stoneware bowls and sprinkle with bacon crumble.'],
  5
),
(
  'Foxhole Smoked Turkey & Cranberry Sliders',
  'Midday Nibbles & Burrow Bites',
  'Warm buttered brioche rolls stuffed with smoked turkey, tangy mountain cranberry sauce, and melted provolone.',
  ARRAY['6 brioche slider buns', '1/2 lb smoked turkey breast, sliced', '1/2 cup whole-berry cranberry sauce', '6 slices provolone cheese', '2 tbsp melted butter', '1/2 tsp garlic powder', '1 tsp poppy seeds'],
  ARRAY['Preheat oven to 350°F (175°C) and slice slider buns in half horizontally.', 'Layer bottom halves with smoked turkey, cranberry sauce, and provolone slices.', 'Place top buns on, brush with melted butter mixed with garlic powder, and sprinkle with poppy seeds.', 'Cover with foil and bake for 10 minutes; unwrap and bake 5 minutes more until golden and melty.'],
  5
),
(
  'Shadowwood Harvest Club Sandwich',
  'Midday Nibbles & Burrow Bites',
  'Thick artisan grain bread layered with roasted chicken, crisp apple slices, smoked bacon, and sweet honey mustard.',
  ARRAY['3 slices toasted multigrain bread', '4 oz roasted chicken breast, sliced', '3 slices cooked bacon', '1/2 Crisp apple (such as Honeycrisp), thinly sliced', '1 leaf green head lettuce', '2 tbsp honey mustard'],
  ARRAY['Spread honey mustard across one side of each toasted bread slice.', 'Layer roasted chicken and lettuce on the bottom slice.', 'Add the middle slice of toast, then top with bacon and crisp apple slices.', 'Cap with the final slice of toast, secure with long picks, and cut diagonally.'],
  5
),

-- ============================================================
-- 3. DUSK FEASTS & DEN DINNERS (Hearty Evening Dinners)
-- ============================================================
(
  'Sly Fox Braised Beef Short Ribs',
  'Dusk Feasts & Den Dinners',
  'Fork-tender beef short ribs slow-braised in rich red wine, garlic, and fresh herbs over buttery garlic mash.',
  ARRAY['2.5 lbs bone-in beef short ribs', '1 cup dry red wine', '2 cups beef stock', '1 yellow onion, chopped', '2 carrots, diced', '3 cloves garlic, smashed', '2 sprigs fresh thyme', '2 tbsp tomato paste', '2 tbsp olive oil'],
  ARRAY['Season short ribs generously with salt and pepper.', 'Heat oil in a heavy Dutch oven and sear ribs on all sides until deeply browned; remove ribs.', 'Sauté onion, carrots, and garlic until soft; stir in tomato paste.', 'Pour in red wine to deglaze, then add beef stock and thyme.', 'Return ribs to the pot, cover, and braise at 325°F (160°C) for 3 hours until meltingly tender.'],
  5
),
(
  'Timberland Roasted Garlic & Herb Chicken',
  'Dusk Feasts & Den Dinners',
  'Crispy-skinned pan-roasted chicken thighs nestled in a gravy of garlic cloves, wild thyme, and pan drippings.',
  ARRAY['6 bone-in, skin-on chicken thighs', '10 whole garlic cloves, peeled', '1 cup chicken bone broth', '1/2 cup white wine or extra broth', '1 tbsp fresh rosemary, chopped', '1 tbsp fresh thyme leaves', '2 tbsp butter'],
  ARRAY['Season chicken thighs with salt, pepper, and herbs.', 'Sear chicken skin-side down in an oven-safe skillet over medium-high heat until skin is crisp and deep golden (about 8 minutes); flip.', 'Scatter whole garlic cloves around the chicken.', 'Pour in white wine and broth, transfer skillet to a 400°F (200°C) oven, and bake for 25 minutes.', 'Stir butter into the pan juices to create a rich gravy before serving.'],
  5
),
(
  'Copper Tail Creamy Wild Mushroom Pasta',
  'Dusk Feasts & Den Dinners',
  'Fettuccine tossed in a silky garlic-Parmesan cream sauce loaded with sautéed forest mushrooms and cracked pepper.',
  ARRAY['12 oz fettuccine pasta', '1/2 lb mixed mushrooms (shiitake, oyster, cremini), sliced', '3 tbsp butter', '3 cloves garlic, minced', '1 cup heavy cream', '3/4 cup grated Parmesan cheese', 'Fresh parsley, chopped'],
  ARRAY['Boil fettuccine in salted water until al dente; drain and reserve 1/2 cup pasta water.', 'Melt butter in a wide pan and sauté mushrooms over medium-high heat until caramelized.', 'Add garlic and cook 1 minute until fragrant.', 'Reduce heat, pour in heavy cream, and bring to a gentle simmer.', 'Stir in Parmesan cheese until smooth, toss with pasta and reserved pasta water as needed, and garnish with parsley.'],
  5
),

-- ============================================================
-- 4. THE FOX DEN BAKERY (Sweets, Pastries & Baked Treats)
-- ============================================================
(
  'Wild Brambleberry Shortbread Skillet',
  'The Fox Den Bakery',
  'A warm, buttery shortbread crust topped with bubbling blackberry-raspberry filling and a scoop of vanilla bean ice cream.',
  ARRAY['1 cup flour', '1/2 cup cold butter, cubed', '1/4 cup sugar', '2 cups mixed wild berries (blackberries, raspberries)', '2 tbsp honey', '1 tbsp lemon juice', 'Vanilla bean ice cream'],
  ARRAY['Preheat oven to 350°F (175°C).', 'Pulse flour, cold butter, and sugar in a food processor until crumbs form; press 3/4 of the mixture into a cast-iron skillet.', 'Toss berries with honey and lemon juice, then spoon over the crust.', 'Crumble the remaining shortbread dough over the top.', 'Bake for 30 minutes until bubbling and golden; serve warm with vanilla ice cream.'],
  5
),
(
  'Golden Paw Maple Pecan Pie',
  'The Fox Den Bakery',
  'A deep-dish, flaky pie filled with rich dark maple syrup, brown sugar, and toasted whole pecans.',
  ARRAY['1 unbaked 9-inch pie crust', '1 cup pure maple syrup', '1/2 cup dark brown sugar', '3 eggs', '3 tbsp melted butter', '1 tsp vanilla extract', '1.5 cups whole pecans'],
  ARRAY['Preheat oven to 350°F (175°C).', 'Whisk maple syrup, brown sugar, eggs, melted butter, and vanilla extract until smooth.', 'Arrange whole pecans in the bottom of the pie crust.', 'Pour syrup mixture over pecans; they will float to the top.', 'Bake for 45–50 minutes until the center is set; let cool completely before slicing.'],
  5
),
(
  'Fox Cub Honey & Cinnamon Biscuits',
  'The Fox Den Bakery',
  'Flaky, golden buttermilk biscuits brushed with warm wildflower honey and dusted with sweet cinnamon sugar.',
  ARRAY['2 cups self-rising flour', '1/3 cup cold butter, grated', '3/4 cup cold buttermilk', '3 tbsp wildflower honey', '1 tbsp butter, melted', '1/2 tsp ground cinnamon'],
  ARRAY['Preheat oven to 425°F (220°C).', 'Cut grated cold butter into self-rising flour using a pastry cutter.', 'Pour in buttermilk and mix gently until a dough forms.', 'Turn onto a floured surface, fold 4 times to create flaky layers, and cut into rounds.', 'Bake on a parchment-lined tray for 12–14 minutes until tall and golden brown.', 'Brush warm biscuits with honey mixed with melted butter and sprinkle with cinnamon.'] ,
  5
),

-- ============================================================
-- 5. NIGHTFALL ELIXIRS & WARM BREWS (Drinks & Ciders)
-- ============================================================
(
  'Silver Fox Spiced Chai Cream',
  'Nightfall Elixirs & Warm Brews',
  'A velvety blend of black tea, warm aromatic spices, steamed whole milk, and a dusting of nutmeg.',
  ARRAY['2 chai tea bags', '1 cup boiling water', '1 cup whole milk', '1 tbsp brown sugar or honey', '1/2 tsp vanilla extract', 'Pinch of ground nutmeg & cinnamon'],
  ARRAY['Steep chai tea bags in 1 cup of boiling water for 5–7 minutes for a strong brew.', 'In a small pot, warm milk with sugar and vanilla until steaming and frothy.', 'Remove tea bags and pour brew into two mugs.', 'Top with warm frothed milk and finish with a dusting of nutmeg and cinnamon.'],
  5
),
(
  'Whispering Pines Buttered Honey Latte',
  'Nightfall Elixirs & Warm Brews',
  'Strong dark espresso combined with steamed oat milk, a drop of browned butter, and sweet mountain honey.',
  ARRAY['2 shots espresso or 1/2 cup strong dark coffee', '1 cup oat milk', '1.5 tbsp mountain honey', '1 tsp browned butter', 'Whipped cream'],
  ARRAY['Melt browned butter and honey together in the bottom of a mug.', 'Pour hot double shot of espresso over the honey-butter mixture and stir well.', 'Steam or froth oat milk until silky.', 'Pour oat milk over espresso and crown with a dollop of whipped cream.'],
  5
),
(
  'Fireside Spiced Mulled Blackberry Cider',
  'Nightfall Elixirs & Warm Brews',
  'Warm apple cider steeped with rich blackberry juice, clove, star anise, and fresh orange zest.',
  ARRAY['3 cups apple cider', '1 cup 100% blackberry juice', '2 cinnamon sticks', '4 whole cloves', '1 star anise', 'Strips of fresh orange peel'],
  ARRAY['Combine apple cider and blackberry juice in a saucepan over medium heat.', 'Add cinnamon sticks, cloves, star anise, and orange peel strips.', 'Bring to a gentle simmer for 15–20 minutes to infuse spices.', 'Ladle into mugs through a strainer and serve warm.'],
  5
);
-- Create the stories table
CREATE TABLE stories (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(100) DEFAULT 'Tavern Keeper',
  summary TEXT,
  content TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'Fireside Lore', -- e.g., 'Legends', 'Campfire Tales'
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);INSERT INTO stories (title, author, summary, content, category) VALUES
(
  'The Legend of the Silver Fox Hearth',
  'Tavern Keeper',
  'An old tale whispered by the fire about how the eternal flame of the tavern was first kindled during the great winter freeze.',
  'Long ago, when the deep northern woods were shrouded in endless twilight and the snow piled high against the cabin eaves, travelers found warmth only in fellowship. Legend tells of a solitary silver fox who guided weary wanderers through the blinding snow straight to a glowing hearth. That very hearth now anchors our tavern, reminding every guest that no matter how cold the night, warmth and light are always waiting inside.',
  'Fireside Lore'
),
(
  'Echoes in the Pine Boughs',
  'Old Woodsman',
  'Listening to the secrets of the wind as it sweeps through the high timber at midnight.',
  'When the moon climbs high over the ridge and casts long shadows across the snow-draped branches, the forest begins to speak. If you sit quietly on the porch with a steaming mug of tea, you can hear the gentle rustle of pine needles sharing tales of seasons past and guiding stars overhead.',
  'Woodland Whispers'
); -- Create the kitchen guides table
CREATE TABLE guides (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL, -- e.g., 'Pantry Swaps', 'Kitchen Rescues', 'Emergency Rations'
  summary TEXT,
  content TEXT NOT NULL,
  difficulty VARCHAR(50) DEFAULT 'Beginner',
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Seed Data: Kitchen & Ingredient Guides
-- ============================================================
INSERT INTO guides (title, category, summary, content, difficulty) VALUES
(
  'The Outpost Pantry Swap: Missing Ingredients',
  'Pantry Swaps',
  'Don’t let a missing jar or spice halt your cooking! Here is how to swap common ingredients with what you already have in stock.',
  '1. **Out of Buttermilk?** Mix 1 cup of whole milk with 1 tablespoon of lemon juice or white vinegar. Let it sit for 5 minutes until slightly curdled.
2. **Missing Heavy Cream?** Blend 3/4 cup of whole milk with 1/3 cup of melted butter for a rich baking and soup substitute.
3. **No Brown Sugar?** Take 1 cup of regular white granulated sugar and mix it thoroughly with 1 tablespoon of dark molasses.
4. **Out of Eggs (for baking)?** Mash half a ripe banana or use 1 tablespoon of ground flaxseed mixed with 3 tablespoons of water per egg.',
  'Beginner'
),
(
  'Rescuing a Scorched or Over-Salted Stew',
  'Kitchen Rescues',
  'Saved from the brink! Quick ways to rescue evening soups and stews when the fire runs a little too hot.',
  '1. **If it is too salty:** Drop in a peeled, raw quartered potato or a chunk of thick bread to absorb excess sodium while simmering, then remove before serving. Alternatively, add a splash of apple cider vinegar or a pinch of brown sugar to balance it out.
2. **If it scorched at the bottom:** Immediately pour the unburnt top portion of the stew into a clean pot. **Do not scrape the bottom of the old pot**, or the burnt flavor will spread through the whole batch. Stir in a pat of butter or a splash of cream to smooth out any lingering taste.',
  'Intermediate'
),
(
  'The Cast-Iron Revival Guide',
  'Hearth & Care',
  'How to clean, re-season, and protect your trusted kitchen skillets from rust and wear.',
  '1. **Cleaning:** Never soak cast-iron in soapy water for long periods. Wash it while warm using a stiff brush and hot water.
2. **Drying:** Dry it completely over a warm burner on the stove for 2 minutes to ensure zero moisture remains.
3. **Seasoning:** While the pan is still warm, rub a thin layer of cooking oil or lard over every surface using a cloth or paper towel until it shines, then wipe away any excess.',
  'Beginner'
);