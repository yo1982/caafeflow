
import React, { createContext } from 'react';
import { Branch, User, View, Order, MenuItem } from '../types';

export interface AppContextType {
  branches: Branch[];
  users: User[];
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  currentBranch: Branch | null;
  setCurrentBranch: (branch: Branch | null) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  view: View;
  setView: (view: View) => void;
}

export const AppContext = createContext<AppContextType | null>(null);
