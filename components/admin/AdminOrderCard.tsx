
import React from 'react';
import { Order, OrderStatus, OrderType } from '../../types';
import { useAppContext } from '../../hooks/useAppContext';
import { TableIcon, CarIcon, PhoneIcon } from '../common/Icons';

interface AdminOrderCardProps {
  order: Order;
}

const AdminOrderCard: React.FC<AdminOrderCardProps> = ({ order }) => {
  const { setOrders } = useAppContext();
  
  const timeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };
  
  const updateStatus = (newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === order.id ? {...o, status: newStatus} : o));
  };
  
  const getNextStatus = (): OrderStatus | null => {
      switch(order.status) {
          case OrderStatus.PENDING: return OrderStatus.PREPARING;
          case OrderStatus.PREPARING: return OrderStatus.READY;
          case OrderStatus.READY: return OrderStatus.COMPLETED;
          default: return null;
      }
  }

  const nextStatus = getNextStatus();
  
  const whatsappLink = `https://wa.me/${order.customerMobile.replace(/\D/g, '')}?text=Hello ${order.customerName}, your order is ready for pickup!`;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-brand-secondary">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-brand-primary">{order.customerName}</h4>
          <span className="text-xs text-gray-500">{timeSince(order.createdAt)}</span>
        </div>
        <div className="flex items-center text-sm font-semibold bg-brand-secondary/20 text-brand-primary px-2 py-1 rounded-full">
            {order.orderType === OrderType.DINE_IN ? <TableIcon className="w-4 h-4 mr-1" /> : <CarIcon className="w-4 h-4 mr-1" />}
            {order.orderType}
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-3">
        {order.orderType === OrderType.DINE_IN
            ? <p>Table: <span className="font-medium">{order.details.tableNumber}</span></p>
            : <>
                <p>Car: <span className="font-medium">{order.details.carColor} {order.details.carMake}</span></p>
                <p>Plate: <span className="font-medium">{order.details.licensePlate}</span></p>
              </>
        }
      </div>

      <ul className="text-sm space-y-1 mb-4 border-t border-b py-2 my-2">
        {order.items.map(item => (
            <li key={item.menuItem.id} className="flex justify-between">
                <span>{item.quantity} x {item.menuItem.name}</span>
                <span>${(item.quantity * item.menuItem.price).toFixed(2)}</span>
            </li>
        ))}
        <li className="font-bold flex justify-between">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
        </li>
      </ul>
      
      <div className="flex items-center space-x-2">
          {nextStatus && (
              <button onClick={() => updateStatus(nextStatus)} className="flex-grow bg-brand-primary text-white text-sm font-bold py-2 px-3 rounded-md hover:bg-opacity-90 transition">
                  Mark as {nextStatus}
              </button>
          )}
          {order.status === OrderStatus.READY && (
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                <PhoneIcon className="w-5 h-5"/>
              </a>
          )}
      </div>
    </div>
  );
};

export default AdminOrderCard;
