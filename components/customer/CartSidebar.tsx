
import React, { useState } from 'react';
import { CartItem } from '../../types';
import { MinusIcon, PlusIcon, TrashIcon } from '../common/Icons';
import CheckoutModal from './CheckoutModal';

interface CartSidebarProps {
  cart: CartItem[];
  updateCartQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  isMobile?: boolean;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ cart, updateCartQuantity, clearCart, isMobile = false }) => {
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartContent = (
    <>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
          <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="font-semibold">Your cart is empty</p>
          <p className="text-sm">Add items from the menu to get started.</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-serif font-bold">My Order</h3>
            <button onClick={clearCart} className="text-sm text-gray-500 hover:text-brand-accent transition-colors flex items-center">
              <TrashIcon className="w-4 h-4 mr-1" /> Clear
            </button>
          </div>
          <div className="flex-grow overflow-y-auto pr-2 -mr-2">
            {cart.map(({ menuItem, quantity }) => (
              <div key={menuItem.id} className="flex items-center mb-4">
                <img src={menuItem.imageUrl} alt={menuItem.name} className="w-16 h-16 rounded-md object-cover mr-4" />
                <div className="flex-grow">
                  <p className="font-semibold text-brand-primary">{menuItem.name}</p>
                  <p className="text-sm text-gray-500">${menuItem.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                  <button onClick={() => updateCartQuantity(menuItem.id, quantity - 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"><MinusIcon className="w-4 h-4" /></button>
                  <span className="w-8 text-center font-semibold">{quantity}</span>
                  <button onClick={() => updateCartQuantity(menuItem.id, quantity + 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"><PlusIcon className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 mt-auto">
            <div className="flex justify-between text-sm mb-1"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm mb-2"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <button
                onClick={() => setCheckoutOpen(true)}
                disabled={cart.length === 0}
                className="w-full mt-4 bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                Checkout
            </button>
          </div>
        </>
      )}
    </>
  );

  if (isMobile) {
    return (
      <>
        <div className={`bg-brand-surface shadow-2xl transition-all duration-300 ease-in-out ${isExpanded ? 'h-96' : 'h-20'}`}>
          <div className="p-4 flex flex-col h-full">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
              <h3 className="text-xl font-serif font-bold">
                {isExpanded ? 'My Order' : `View Order (${totalItems} items)`}
              </h3>
              <div className="flex items-center">
                <span className="font-bold text-lg mr-4">${total.toFixed(2)}</span>
                <svg className={`w-6 h-6 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </div>
            </div>
            {isExpanded && <div className="flex-grow mt-4 overflow-hidden flex flex-col">{cartContent}</div>}
          </div>
        </div>
        {isCheckoutOpen && <CheckoutModal cart={cart} total={total} onClose={() => setCheckoutOpen(false)} onOrderPlaced={clearCart} />}
      </>
    );
  }

  return (
    <>
        <div className="bg-brand-surface rounded-xl shadow-lg h-full flex flex-col p-6">
            {cartContent}
        </div>
        {isCheckoutOpen && <CheckoutModal cart={cart} total={total} onClose={() => setCheckoutOpen(false)} onOrderPlaced={clearCart} />}
    </>
  );
};

export default CartSidebar;

