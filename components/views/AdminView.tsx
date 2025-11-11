
import React, { useState } from 'react';
import Header from '../common/Header';
import { useAppContext } from '../../hooks/useAppContext';
import { User, View } from '../../types';
import OrdersView from '../admin/OrdersView';

interface AdminViewProps {
  onResetBranch: () => void;
}

const AdminLogin: React.FC<{ onLogin: (user: User) => void }> = ({ onLogin }) => {
    const { users, currentBranch } = useAppContext();
    const branchUsers = users.filter(u => u.branchId === currentBranch?.id);
  
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-xl text-center w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-2 text-brand-primary">Admin Panel Login</h2>
          <p className="text-gray-600 mb-6">Select a user to continue</p>
          <div className="space-y-3">
            {branchUsers.map(user => (
              <button
                key={user.id}
                onClick={() => onLogin(user)}
                className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 flex items-center justify-between transition"
              >
                <div>
                  <span className="font-semibold">{user.name}</span>
                  <span className="text-sm text-gray-500 ml-2 capitalize">({user.role})</span>
                </div>
                <span className="text-xs font-bold text-brand-secondary">LOG IN &rarr;</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
};

const AdminDashboard: React.FC = () => {
    const { currentUser } = useAppContext();
    return (
        <main className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-brand-primary mb-4">Welcome, {currentUser?.name}!</h1>
            <p className="text-gray-600 mb-8">Here's what's happening at your branch today.</p>
            <OrdersView />
        </main>
    );
}


const AdminView: React.FC<AdminViewProps> = ({ onResetBranch }) => {
    const { currentUser, setCurrentUser } = useAppContext();

    if (!currentUser) {
        return <AdminLogin onLogin={setCurrentUser} />;
    }

    return (
        <div>
            <Header onResetBranch={onResetBranch} />
            <AdminDashboard />
        </div>
    );
};

export default AdminView;
