
import React from 'react';
import { View } from '../../types';
import { useAppContext } from '../../hooks/useAppContext';
import { CoffeeIcon } from './Icons';

interface HeaderProps {
    onResetBranch: () => void;
}

const Header: React.FC<HeaderProps> = ({ onResetBranch }) => {
  const { currentBranch, view, setView } = useAppContext();

  return (
    <header className="bg-brand-primary text-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <CoffeeIcon className="h-8 w-8 text-brand-secondary" />
            <div className="flex flex-col">
              <h1 className="text-xl font-serif font-bold">{currentBranch?.name}</h1>
              <button onClick={onResetBranch} className="text-xs text-gray-300 hover:text-brand-secondary transition-colors">
                (Change Location)
              </button>
            </div>
          </div>

          <div className="flex items-center bg-gray-700 rounded-full p-1">
            <button
              onClick={() => setView(View.CUSTOMER)}
              className={`px-4 py-1 text-sm font-medium rounded-full transition-colors ${
                view === View.CUSTOMER ? 'bg-brand-secondary text-brand-primary' : 'text-white hover:bg-gray-600'
              }`}
            >
              Menu
            </button>
            <button
              onClick={() => setView(View.ADMIN)}
              className={`px-4 py-1 text-sm font-medium rounded-full transition-colors ${
                view === View.ADMIN ? 'bg-brand-secondary text-brand-primary' : 'text-white hover:bg-gray-600'
              }`}
            >
              Admin Panel
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
