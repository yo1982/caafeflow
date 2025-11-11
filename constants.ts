
import { Branch, User, MenuItem, Order, OrderStatus, OrderType } from './types';

export const MOCK_BRANCHES: Branch[] = [
  { id: 1, name: 'Downtown Brew', location: '123 Main St, Metropolis', imageUrl: 'https://picsum.photos/seed/downtown/800/600' },
  { id: 2, name: 'Uptown Grind', location: '456 Oak Ave, Star City', imageUrl: 'https://picsum.photos/seed/uptown/800/600' },
  { id: 3, name: 'Seaside Sips', location: '789 Beach Blvd, Coast City', imageUrl: 'https://picsum.photos/seed/seaside/800/600' },
];

export const MOCK_USERS: User[] = [
  { id: 'user1', branchId: 1, name: 'Alice', role: 'manager' },
  { id: 'user2', branchId: 1, name: 'Bob', role: 'barista' },
  { id: 'user3', branchId: 2, name: 'Charlie', role: 'manager' },
  { id: 'user4', branchId: 2, name: 'Diana', role: 'barista' },
  { id: 'user5', branchId: 3, name: 'Eve', role: 'manager' },
  { id: 'user6', branchId: 3, name: 'Frank', role: 'barista' },
];

export const MOCK_MENU: MenuItem[] = [
  // Branch 1 Menu
  { id: 'm1', branchId: 1, name: 'Espresso', description: 'A concentrated coffee beverage brewed by forcing a small amount of nearly boiling water under pressure through finely-ground coffee beans.', price: 3.50, category: 'Coffee', imageUrl: 'https://picsum.photos/seed/espresso/400/300', isSpecial: false },
  { id: 'm2', branchId: 1, name: 'Caramel Macchiato', description: 'Freshly steamed milk with vanilla-flavored syrup marked with espresso and topped with a caramel drizzle.', price: 5.25, category: 'Coffee', imageUrl: 'https://picsum.photos/seed/macchiato/400/300', isSpecial: true },
  { id: 'm3', branchId: 1, name: 'Green Tea', description: 'A classic, healthy green tea.', price: 2.75, category: 'Tea', imageUrl: 'https://picsum.photos/seed/greentea/400/300', isSpecial: false },
  { id: 'm4', branchId: 1, name: 'Croissant', description: 'A buttery, flaky, viennoiserie pastry.', price: 3.00, category: 'Pastries', imageUrl: 'https://picsum.photos/seed/croissant/400/300', isSpecial: false },
  { id: 'm5', branchId: 1, name: 'Turkey Club', description: 'A sandwich of bread, sliced cooked turkey, bacon, lettuce, tomato, and mayonnaise.', price: 8.50, category: 'Sandwiches', imageUrl: 'https://picsum.photos/seed/turkeyclub/400/300', isSpecial: false },

  // Branch 2 Menu
  { id: 'm6', branchId: 2, name: 'Cold Brew', description: 'Coffee brewed with cold water over a long period, resulting in a smooth, less acidic flavor.', price: 4.75, category: 'Coffee', imageUrl: 'https://picsum.photos/seed/coldbrew/400/300', isSpecial: true },
  { id: 'm7', branchId: 2, name: 'Chai Latte', description: 'A creamy mixture of black tea and fragrant spices.', price: 4.50, category: 'Tea', imageUrl: 'https://picsum.photos/seed/chai/400/300', isSpecial: false },
  { id: 'm8', branchId: 2, name: 'Blueberry Muffin', description: 'A soft, sweet muffin packed with blueberries.', price: 3.25, category: 'Pastries', imageUrl: 'https://picsum.photos/seed/muffin/400/300', isSpecial: false },
  { id: 'm9', branchId: 2, name: 'Roast Beef Panini', description: 'Warm panini with roast beef, cheese, and caramelized onions.', price: 9.00, category: 'Sandwiches', imageUrl: 'https://picsum.photos/seed/panini/400/300', isSpecial: false },

  // Branch 3 Menu
  { id: 'm10', branchId: 3, name: 'Iced Latte', description: 'Chilled espresso mixed with cold milk over ice.', price: 4.50, category: 'Coffee', imageUrl: 'https://picsum.photos/seed/icedlatte/400/300', isSpecial: false },
  { id: 'm11', branchId: 3, name: 'Matcha Latte', description: 'A sweet and earthy drink made with matcha green tea powder and steamed milk.', price: 5.00, category: 'Tea', imageUrl: 'https://picsum.photos/seed/matcha/400/300', isSpecial: true },
  { id: 'm12', branchId: 3, name: 'Cinnamon Roll', description: 'A sweet baked dough filled with a cinnamon-sugar filling.', price: 3.75, category: 'Pastries', imageUrl: 'https://picsum.photos/seed/cinnamon/400/300', isSpecial: false },
  { id: 'm13', branchId: 3, name: 'Caprese Sandwich', description: 'Fresh mozzarella, tomatoes, and basil on a toasted ciabatta.', price: 8.00, category: 'Sandwiches', imageUrl: 'https://picsum.photos/seed/caprese/400/300', isSpecial: false },
];

export const MOCK_ORDERS: Order[] = [
    {
        id: 'o1',
        branchId: 1,
        customerName: 'John Doe',
        customerMobile: '555-1234',
        orderType: OrderType.DINE_IN,
        details: { tableNumber: '5' },
        items: [
            { menuItem: MOCK_MENU[0], quantity: 1 },
            { menuItem: MOCK_MENU[3], quantity: 1 },
        ],
        total: 6.50,
        status: OrderStatus.PENDING,
        createdAt: new Date(new Date().getTime() - 10 * 60000),
    },
    {
        id: 'o2',
        branchId: 1,
        customerName: 'Jane Smith',
        customerMobile: '555-5678',
        orderType: OrderType.DRIVE_THRU,
        details: { carMake: 'Honda', carColor: 'Blue', licensePlate: 'XYZ-123' },
        items: [
            { menuItem: MOCK_MENU[1], quantity: 2 },
        ],
        total: 10.50,
        status: OrderStatus.PREPARING,
        createdAt: new Date(new Date().getTime() - 5 * 60000),
    },
     {
        id: 'o3',
        branchId: 2,
        customerName: 'Peter Jones',
        customerMobile: '555-9876',
        orderType: OrderType.DINE_IN,
        details: { tableNumber: '12' },
        items: [
            { menuItem: MOCK_MENU[6], quantity: 1 },
            { menuItem: MOCK_MENU[7], quantity: 1 },
        ],
        total: 7.75,
        status: OrderStatus.READY,
        createdAt: new Date(new Date().getTime() - 15 * 60000),
    },
];
