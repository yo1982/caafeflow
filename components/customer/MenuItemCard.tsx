
import React, { useState } from 'react';
import { MenuItem } from '../../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(item);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="bg-brand-surface rounded-lg shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={item.imageUrl} alt={item.name} />
        {item.isSpecial && (
          <span className="absolute top-2 right-2 bg-brand-accent text-white text-xs font-bold px-2 py-1 rounded-full">
            SPECIAL
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold text-brand-primary">{item.name}</h3>
        <p className="text-gray-600 text-sm mt-1 flex-grow">{item.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-brand-primary">${item.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className={`px-4 py-2 text-sm font-bold rounded-full transition-all duration-300 ${
              isAdded 
                ? 'bg-green-500 text-white' 
                : 'bg-brand-secondary text-brand-primary group-hover:bg-brand-primary group-hover:text-white'
            }`}
          >
            {isAdded ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
