
import React from 'react';
import { Order, OrderStatus } from '../../types';
import { useAppContext } from '../../hooks/useAppContext';
import AdminOrderCard from './AdminOrderCard';

const OrdersView: React.FC = () => {
  const { orders, currentBranch } = useAppContext();
  const branchOrders = orders.filter(o => o.branchId === currentBranch?.id);

  const filterOrdersByStatus = (status: OrderStatus) =>
    branchOrders
        .filter(order => order.status === status)
        .sort((a,b) => a.createdAt.getTime() - b.createdAt.getTime());

  const pendingOrders = filterOrdersByStatus(OrderStatus.PENDING);
  const preparingOrders = filterOrdersByStatus(OrderStatus.PREPARING);
  const readyOrders = filterOrdersByStatus(OrderStatus.READY);
  const completedOrders = filterOrdersByStatus(OrderStatus.COMPLETED);
  
  const columns = [
    { title: 'Pending', orders: pendingOrders, color: 'bg-red-500' },
    { title: 'Preparing', orders: preparingOrders, color: 'bg-yellow-500' },
    { title: 'Ready', orders: readyOrders, color: 'bg-green-500' },
    { title: 'Completed', orders: completedOrders, color: 'bg-gray-400' },
  ];

  return (
    <div>
        <h2 className="text-2xl font-bold text-brand-primary mb-6">Live Order Queue</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {columns.map(col => (
                <div key={col.title} className="bg-gray-100 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                        <span className={`w-3 h-3 rounded-full mr-2 ${col.color}`}></span>
                        <h3 className="font-bold text-lg text-gray-800">{col.title} ({col.orders.length})</h3>
                    </div>
                    <div className="space-y-4 h-[60vh] overflow-y-auto">
                        {col.orders.length > 0 ? col.orders.map(order => (
                           <AdminOrderCard key={order.id} order={order} />
                        )) : (
                            <div className="text-center text-gray-500 pt-16">
                                <p>No orders in this column.</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default OrdersView;
