import { Category, Product } from '../core/models/shop.models';

const descriptions: Record<Category, string> = {
  Beef: 'Rich, carefully selected beef prepared for memorable meals.',
  Pork: 'Versatile pork cut for Filipino family favorites.',
  Chicken: 'Kitchen-ready chicken with clean, dependable quality.',
  'Frozen Products': 'Convenient freezer staples for quick and satisfying meals.',
  Seafood: 'Fresh-tasting seafood favorites, cleaned and ready to cook.',
  'Sausages & Processed Meat': 'Savory breakfast and grilling favorites for easy meals.',
};

const positions: Record<Category, string> = {
  Beef: '0% 0%',
  Pork: '50% 0%',
  Chicken: '100% 0%',
  'Frozen Products': '0% 100%',
  Seafood: '50% 100%',
  'Sausages & Processed Meat': '100% 100%',
};

const catalog: Array<[string, Category, number, string, number?, boolean?]> = [
  ['Beef Ribeye', 'Beef', 950, 'per kg', 899, true],
  ['Beef Sirloin', 'Beef', 720, 'per kg', undefined, true],
  ['Beef Tenderloin', 'Beef', 1100, 'per kg'],
  ['Beef Brisket', 'Beef', 620, 'per kg'],
  ['Beef Short Ribs', 'Beef', 680, 'per kg', 649, true],
  ['Beef Shank', 'Beef', 480, 'per kg'],
  ['Ground Beef', 'Beef', 420, 'per kg'],
  ['Pork Belly / Liempo', 'Pork', 390, 'per kg', 369, true],
  ['Pork Chop', 'Pork', 360, 'per kg'],
  ['Pork Shoulder / Kasim', 'Pork', 345, 'per kg'],
  ['Pork Leg / Pigue', 'Pork', 330, 'per kg'],
  ['Pork Ribs', 'Pork', 410, 'per kg'],
  ['Pork Tenderloin', 'Pork', 470, 'per kg'],
  ['Ground Pork', 'Pork', 320, 'per kg'],
  ['Whole Chicken', 'Chicken', 240, 'per kg', undefined, true],
  ['Chicken Breast', 'Chicken', 290, 'per kg'],
  ['Chicken Thigh', 'Chicken', 260, 'per kg'],
  ['Chicken Wings', 'Chicken', 280, 'per kg', 259, true],
  ['Chicken Drumsticks', 'Chicken', 255, 'per kg'],
  ['Chicken Fillet', 'Chicken', 310, 'per kg'],
  ['Chicken Nuggets', 'Frozen Products', 195, '500g pack', 179, true],
  ['French Fries', 'Frozen Products', 165, '1kg pack'],
  ['Burger Patties', 'Frozen Products', 260, '6-piece pack'],
  ['Hotdogs', 'Frozen Products', 185, '500g pack'],
  ['Siomai', 'Frozen Products', 210, '25-piece pack'],
  ['Tocino', 'Frozen Products', 230, '500g pack'],
  ['Longganisa', 'Frozen Products', 225, '500g pack', undefined, true],
  ['Frozen Meatballs', 'Frozen Products', 215, '500g pack'],
  ['Shrimp', 'Seafood', 520, 'per kg', 489, true],
  ['Squid', 'Seafood', 440, 'per kg'],
  ['Fish Fillet', 'Seafood', 390, 'per kg'],
  ['Hungarian Sausage', 'Sausages & Processed Meat', 295, '500g pack', 279, true],
  ['Bacon', 'Sausages & Processed Meat', 275, '250g pack'],
  ['Ham', 'Sausages & Processed Meat', 245, '500g pack'],
];

export const PRODUCTS: Product[] = catalog.map(
  ([name, category, price, unit, salePrice, featured], index) => ({
    id: `BTM-${String(index + 1).padStart(3, '0')}`,
    name,
    category,
    price,
    salePrice,
    unit,
    description: descriptions[category],
    stock: index === 16 ? 0 : 8 + ((index * 7) % 31),
    featured: !!featured,
    imagePosition: positions[category],
  }),
);

export const CATEGORIES = (Object.keys(descriptions) as Category[]).map((name) => ({
  name,
  imagePosition: positions[name],
  description: descriptions[name],
}));
