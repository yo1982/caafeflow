
import React from 'react';
import { MOCK_BRANCHES } from '../constants';
import { Branch } from '../types';
import { CoffeeIcon } from './common/Icons';

interface BranchSelectorProps {
  onSelectBranch: (branch: Branch) => void;
}

const BranchSelector: React.FC<BranchSelectorProps> = ({ onSelectBranch }) => {
  return (
    <div className="min-h-screen bg-brand-primary flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <CoffeeIcon className="h-20 w-20 text-brand-secondary mx-auto mb-4" />
        <h1 className="text-5xl font-serif font-bold text-white mb-2">Welcome to Cafe Flow</h1>
        <p className="text-lg text-brand-secondary">Please select your location to continue</p>
      </div>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {MOCK_BRANCHES.map((branch) => (
          <div
            key={branch.id}
            onClick={() => onSelectBranch(branch)}
            className="bg-brand-bg rounded-lg overflow-hidden shadow-2xl transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer group"
          >
            <img src={branch.imageUrl} alt={branch.name} className="w-full h-48 object-cover" />
            <div className="p-6 text-center">
              <h2 className="text-2xl font-serif font-bold text-brand-primary mb-1">{branch.name}</h2>
              <p className="text-gray-600">{branch.location}</p>
              <button className="mt-4 w-full bg-brand-secondary text-brand-primary font-bold py-2 px-4 rounded-full group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                View Menu
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchSelector;
