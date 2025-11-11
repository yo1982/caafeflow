
import React, { useState } from 'react';
import Header from '../common/Header';
import { MenuItem as MenuItemType, CartItem } from '../../types';
import { useAppContext } from '../../hooks/useAppContext';
import MenuItemCard from '../customer/MenuItemCard';
import CartSidebar from '../customer/CartSidebar';
import { CoffeeIcon, TeaIcon, PastryIcon, SandwichIcon } from '../common/Icons';

interface CustomerViewProps {
    onResetBranch: () => void;
}

const categoryIcons = {
  'Coffee': <CoffeeIcon className="w-6 h-6 mr-3" />,
  'Tea': <TeaIcon className="w-6 h-6 mr-3" />,
  'Pastries': <PastryIcon className="w-6 h-6 mr-3" />,
  'Sandwiches': <SandwichIcon className="w-6 h-6 mr-3" />,
};

const PromotionsBanner = () => (
  <div className="bg-brand-secondary text-brand-primary text-center p-4 rounded-lg my-8 shadow-md">
    <h2 className="font-bold text-xl">🎉 Weekend Special! 20% off all Pastries! 🎉</h2>
    <p>Offer valid this Saturday and Sunday. Discount applied at checkout.</p>
  </div>
);

const CustomerView: React.FC<CustomerViewProps> = ({ onResetBranch }) => {
  const { menuItems, currentBranch } = useAppContext();
  const [cart, setCart] = useState<CartItem[]>([]);

  const branchMenu = menuItems.filter(item => item.branchId === currentBranch?.id);
  const categories = [...new Set(branchMenu.map(item => item.category))];

  const addToCart = (item: MenuItemType) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.menuItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.menuItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { menuItem: item, quantity: 1 }];
    });
  };
  
  const updateCartQuantity = (itemId: string, newQuantity: number) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.menuItem.id !== itemId);
      }
      return prevCart.map(item =>
        item.menuItem.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const clearCart = () => setCart([]);

  return (
    <>
      <Header onResetBranch={onResetBranch} />
      <div className="flex">
        <main className="w-full lg:w-2/3 p-4 sm:p-6 lg:p-8">
          <div className="container mx-auto">
            <PromotionsBanner />
            {categories.map(category => (
              <div key={category} id={category.toLowerCase()} className="mb-12">
                <div className="flex items-center mb-6">
                  {categoryIcons[category]}
                  <h2 className="text-3xl font-serif font-bold text-brand-primary">{category}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {branchMenu.filter(item => item.category === category).map(item => (
                    <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
        <aside className="hidden lg:block w-1/3 p-6 sticky top-16 h-[calc(100vh-4rem)]">
           <CartSidebar cart={cart} updateCartQuantity={updateCartQuantity} clearCart={clearCart} />
        </aside>
      </div>
       <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
           <CartSidebar cart={cart} updateCartQuantity={updateCartQuantity} clearCart={clearCart} isMobile={true} />
       </div>
    </>
  );
};

export default CustomerView;

