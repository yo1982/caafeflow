
import React, { useState, useMemo } from 'react';
import { MOCK_BRANCHES, MOCK_ORDERS, MOCK_USERS, MOCK_MENU } from './constants';
import { Branch, User, View, Order, MenuItem as MenuItemType } from './types';

import BranchSelector from './components/BranchSelector';
import CustomerView from './components/views/CustomerView';
import AdminView from './components/views/AdminView';
import { AppContext, AppContextType } from './context/AppContext';

export default function App() {
  const [branches, setBranches] = useState<Branch[]>(MOCK_BRANCHES);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [menuItems, setMenuItems] = useState<MenuItemType[]>(MOCK_MENU);

  const [currentBranch, setCurrentBranch] = useState<Branch | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<View>(View.CUSTOMER);

  const contextValue: AppContextType = useMemo(() => ({
    branches,
    users,
    orders,
    setOrders,
    menuItems,
    setMenuItems,
    currentBranch,
    setCurrentBranch,
    currentUser,
    setCurrentUser,
    view,
    setView,
  }), [branches, users, orders, menuItems, currentBranch, currentUser, view]);

  const handleBranchSelect = (branch: Branch) => {
    setCurrentBranch(branch);
    setView(View.CUSTOMER);
    setCurrentUser(null);
  };

  const resetBranch = () => {
    setCurrentBranch(null);
    setCurrentUser(null);
  }

  if (!currentBranch) {
    return <BranchSelector onSelectBranch={handleBranchSelect} />;
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-brand-bg text-brand-primary">
        {view === View.CUSTOMER ? (
          <CustomerView onResetBranch={resetBranch} />
        ) : (
          <AdminView onResetBranch={resetBranch} />
        )}
      </div>
    </AppContext.Provider>
  );
}
