
export enum View {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

export enum OrderType {
  DINE_IN = 'Dine-In',
  DRIVE_THRU = 'Drive-Thru',
}

export enum OrderStatus {
  PENDING = 'Pending',
  PREPARING = 'Preparing',
  READY = 'Ready',
  COMPLETED = 'Completed',
}

export interface Branch {
  id: number;
  name: string;
  location: string;
  imageUrl: string;
}

export interface User {
  id: string;
  branchId: number;
  name: string;
  role: 'barista' | 'manager';
}

export interface MenuItem {
  id: string;
  branchId: number;
  name: string;
  description: string;
  price: number;
  category: 'Coffee' | 'Tea' | 'Pastries' | 'Sandwiches';
  imageUrl: string;
  isSpecial: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  branchId: number;
  customerName: string;
  customerMobile: string;
  orderType: OrderType;
  details: {
    tableNumber?: string;
    carMake?: string;
    carColor?: string;
    licensePlate?: string;
  };
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
}
