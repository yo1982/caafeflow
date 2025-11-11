
import React, { useState } from 'react';
import { CartItem, OrderType, OrderStatus, Order } from '../../types';
import { useAppContext } from '../../hooks/useAppContext';
import { CarIcon, CreditCardIcon, PhoneIcon, TableIcon, UserIcon, XIcon } from '../common/Icons';

interface CheckoutModalProps {
  cart: CartItem[];
  total: number;
  onClose: () => void;
  onOrderPlaced: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ cart, total, onClose, onOrderPlaced }) => {
  const { currentBranch, setOrders } = useAppContext();
  const [step, setStep] = useState(1);
  const [orderType, setOrderType] = useState<OrderType>(OrderType.DINE_IN);
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [carMake, setCarMake] = useState('');
  const [carColor, setCarColor] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  const handlePlaceOrder = () => {
    if (!currentBranch) return;

    const newOrder: Order = {
        id: `o${Date.now()}`,
        branchId: currentBranch.id,
        customerName,
        customerMobile,
        orderType,
        details: orderType === OrderType.DINE_IN
            ? { tableNumber }
            : { carMake, carColor, licensePlate },
        items: cart,
        total,
        status: OrderStatus.PENDING,
        createdAt: new Date(),
    };

    setOrders(prev => [newOrder, ...prev]);
    setStep(3); // Move to confirmation step
  };
  
  const isDetailsValid = () => {
      if (!customerName || !customerMobile) return false;
      if(orderType === OrderType.DINE_IN && !tableNumber) return false;
      if(orderType === OrderType.DRIVE_THRU && (!carMake || !carColor || !licensePlate)) return false;
      return true;
  };


  const renderStep = () => {
    switch (step) {
      case 1: // Details
        return (
          <>
            <h3 className="text-2xl font-serif font-bold text-center mb-6">Your Details</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setOrderType(OrderType.DINE_IN)}
                className={`flex items-center justify-center p-4 border-2 rounded-lg transition-colors ${orderType === OrderType.DINE_IN ? 'border-brand-primary bg-brand-primary/10' : 'border-gray-300'}`}
              >
                <TableIcon className="w-6 h-6 mr-2" /> Dine-In
              </button>
              <button
                onClick={() => setOrderType(OrderType.DRIVE_THRU)}
                className={`flex items-center justify-center p-4 border-2 rounded-lg transition-colors ${orderType === OrderType.DRIVE_THRU ? 'border-brand-primary bg-brand-primary/10' : 'border-gray-300'}`}
              >
                <CarIcon className="w-6 h-6 mr-2" /> Drive-Thru
              </button>
            </div>
            <div className="space-y-4">
              <div className="relative"><UserIcon className="w-5 h-5 absolute top-3.5 left-3 text-gray-400" /><input type="text" placeholder="Your Name" value={customerName} onChange={e => setCustomerName(e.target.value)} className="w-full pl-10 p-3 border rounded-lg" /></div>
              <div className="relative"><PhoneIcon className="w-5 h-5 absolute top-3.5 left-3 text-gray-400" /><input type="text" placeholder="Mobile Number" value={customerMobile} onChange={e => setCustomerMobile(e.target.value)} className="w-full pl-10 p-3 border rounded-lg" /></div>
              {orderType === OrderType.DINE_IN ? (
                <div className="relative"><TableIcon className="w-5 h-5 absolute top-3.5 left-3 text-gray-400" /><input type="text" placeholder="Table Number" value={tableNumber} onChange={e => setTableNumber(e.target.value)} className="w-full pl-10 p-3 border rounded-lg" /></div>
              ) : (
                <>
                  <input type="text" placeholder="Car Make" value={carMake} onChange={e => setCarMake(e.target.value)} className="w-full p-3 border rounded-lg" />
                  <input type="text" placeholder="Car Color" value={carColor} onChange={e => setCarColor(e.target.value)} className="w-full p-3 border rounded-lg" />
                  <input type="text" placeholder="License Plate" value={licensePlate} onChange={e => setLicensePlate(e.target.value)} className="w-full p-3 border rounded-lg" />
                </>
              )}
            </div>
            <button onClick={() => setStep(2)} disabled={!isDetailsValid()} className="w-full mt-6 bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition disabled:bg-gray-400">Continue to Payment</button>
          </>
        );
      case 2: // Payment
        return (
          <>
            <h3 className="text-2xl font-serif font-bold text-center mb-6">Payment</h3>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="text-center text-gray-600">This is a simulated payment gateway.</p>
              <p className="text-center font-bold text-2xl my-4">Total: ${total.toFixed(2)}</p>
            </div>
            <button onClick={handlePlaceOrder} className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition flex items-center justify-center">
              <CreditCardIcon className="w-6 h-6 mr-2" /> Pay and Place Order
            </button>
            <button onClick={() => setStep(1)} className="w-full mt-2 text-gray-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition">Back to Details</button>
          </>
        );
      case 3: // Confirmation
        return (
          <div className="text-center">
            <svg className="w-24 h-24 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-2xl font-serif font-bold mb-2">Order Placed!</h3>
            <p className="text-gray-600 mb-6">Your order has been sent to the barista. We'll notify you when it's ready!</p>
            <button onClick={() => { onOrderPlaced(); onClose(); }} className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition">Done</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <XIcon className="w-6 h-6" />
        </button>
        {renderStep()}
      </div>
    </div>
  );
};

export default CheckoutModal;
