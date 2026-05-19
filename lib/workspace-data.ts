export interface WorkspaceItem {
  id: string;
  name: string;
  category: 'desk' | 'chair' | 'monitor' | 'accessory' | 'lighting' | 'plant' | 'coffee';
  image: string;
  pricePerWeek: number;
  description: string;
  specs?: string[];
  popular?: boolean;
}

export interface SelectedItem extends WorkspaceItem {
  quantity: number;
}

export const workspaceItems: WorkspaceItem[] = [
  // Desks
  {
    id: 'desk-modern',
    name: 'Electric Standing Desk',
    category: 'desk',
    image: '/workspace/desk-modern.jpg',
    pricePerWeek: 12,
    description: 'Height-adjustable electric desk, perfect for sit-stand working',
    specs: ['Electric height adjustment (70-118cm)', 'Spacious 140x70cm top', 'Quiet motor'],
    popular: true,
  },
  {
    id: 'desk-bamboo',
    name: 'Bamboo Desk',
    category: 'desk',
    image: '/workspace/desk-bamboo.jpg',
    pricePerWeek: 8,
    description: 'Eco-friendly bamboo desk with natural tropical vibes',
    specs: ['Sustainable bamboo', '120x60cm top', 'Natural finish'],
  },
  {
    id: 'desk-compact',
    name: 'Compact Desk',
    category: 'desk',
    image: '/workspace/desk-compact.jpg',
    pricePerWeek: 5,
    description: 'Perfect for small spaces and minimal setups',
    specs: ['100x50cm top', 'Lightweight', 'Easy to move'],
  },
  // Chairs
  {
    id: 'chair-ergonomic',
    name: 'Ergonomic Mesh Chair',
    category: 'chair',
    image: '/workspace/chair-ergonomic.jpg',
    pricePerWeek: 10,
    description: 'Full-featured ergonomic chair with lumbar support',
    specs: ['4D adjustable armrests', 'Breathable mesh', 'Adjustable lumbar', 'Headrest'],
    popular: true,
  },
  {
    id: 'chair-minimal',
    name: 'Minimal Office Chair',
    category: 'chair',
    image: '/workspace/chair-minimal.jpg',
    pricePerWeek: 5,
    description: 'Simple, clean chair for light office use',
    specs: ['Mesh back', 'Height adjustable', 'Compact design'],
  },
  {
    id: 'chair-lounge',
    name: 'Bean Bag Lounge',
    category: 'chair',
    image: '/workspace/chair-lounge.jpg',
    pricePerWeek: 4,
    description: 'Relaxed seating for creative work sessions',
    specs: ['Comfortable foam fill', 'Easy to move', 'Casual vibes'],
  },
  // Monitors
  {
    id: 'monitor-27',
    name: '27" 4K Monitor',
    category: 'monitor',
    image: '/workspace/monitor-27.jpg',
    pricePerWeek: 8,
    description: 'Crystal clear 4K display for detailed work',
    specs: ['27" 4K UHD', 'USB-C', '99% sRGB', '60Hz'],
    popular: true,
  },
  {
    id: 'monitor-ultrawide',
    name: '34" Ultrawide Curved',
    category: 'monitor',
    image: '/workspace/monitor-ultrawide.jpg',
    pricePerWeek: 15,
    description: 'Immersive curved ultrawide for ultimate productivity',
    specs: ['34" WQHD curved', '144Hz', '1ms response', 'Gaming ready'],
  },
  // Accessories
  {
    id: 'keyboard',
    name: 'Wireless Keyboard',
    category: 'accessory',
    image: '/workspace/keyboard.jpg',
    pricePerWeek: 3,
    description: 'Premium wireless mechanical keyboard',
    specs: ['Wireless + Bluetooth', 'Backlit keys', 'Multi-device'],
  },
  {
    id: 'mouse',
    name: 'Ergonomic Mouse',
    category: 'accessory',
    image: '/workspace/mouse.jpg',
    pricePerWeek: 2,
    description: 'Comfortable ergonomic wireless mouse',
    specs: ['8000 DPI sensor', 'Wireless', '70 days battery'],
  },
  {
    id: 'laptop-stand',
    name: 'Laptop Stand',
    category: 'accessory',
    image: '/workspace/laptop-stand.jpg',
    pricePerWeek: 2,
    description: 'Aluminum stand for better ergonomics',
    specs: ['Adjustable angle', 'Aluminum build', '10-17" laptops'],
  },
  {
    id: 'webcam',
    name: '4K Webcam',
    category: 'accessory',
    image: '/workspace/webcam.jpg',
    pricePerWeek: 4,
    description: 'Professional 4K webcam for video calls',
    specs: ['4K Ultra HD', 'Noise canceling mic', 'Auto-focus'],
  },
  {
    id: 'headphones',
    name: 'Noise-Canceling Headphones',
    category: 'accessory',
    image: '/workspace/headphones.jpg',
    pricePerWeek: 5,
    description: 'Premium wireless headphones for focus',
    specs: ['Active noise canceling', '30h battery', 'Premium sound'],
  },
  // Lighting
  {
    id: 'lamp',
    name: 'Smart LED Desk Lamp',
    category: 'lighting',
    image: '/workspace/lamp-desk.jpg',
    pricePerWeek: 2,
    description: 'Adjustable LED lamp with multiple modes',
    specs: ['4 lighting modes', 'Dimmable', 'Eye-care tech'],
  },
  // Plants
  {
    id: 'plant-monstera',
    name: 'Monstera Plant',
    category: 'plant',
    image: '/workspace/plant-monstera.jpg',
    pricePerWeek: 3,
    description: 'Bring tropical Bali vibes to your desk',
    specs: ['Easy care', 'Air purifying', 'Ceramic pot included'],
  },
  {
    id: 'plant-snake',
    name: 'Snake Plant',
    category: 'plant',
    image: '/workspace/plant-snake.jpg',
    pricePerWeek: 3,
    description: 'Low-maintenance, air-purifying beauty',
    specs: ['Low light tolerant', 'Drought resistant', 'Terracotta pot'],
  },
  // Coffee
  {
    id: 'coffee-maker',
    name: 'Nespresso Machine',
    category: 'coffee',
    image: '/workspace/coffee-maker.jpg',
    pricePerWeek: 5,
    description: 'Premium coffee at your desk',
    specs: ['19-bar pressure', 'Quick heat-up', 'Compact design'],
    popular: true,
  },
];

export const categories = [
  { id: 'desk', label: 'Desks', icon: '🪑', emoji: 'desk' },
  { id: 'chair', label: 'Chairs', icon: '💺', emoji: 'chair' },
  { id: 'monitor', label: 'Monitors', icon: '🖥️', emoji: 'monitor' },
  { id: 'accessory', label: 'Accessories', icon: '⌨️', emoji: 'keyboard' },
  { id: 'lighting', label: 'Lighting', icon: '💡', emoji: 'lamp' },
  { id: 'plant', label: 'Plants', icon: '🌿', emoji: 'plant' },
  { id: 'coffee', label: 'Coffee', icon: '☕', emoji: 'coffee' },
] as const;

export type Category = (typeof categories)[number]['id'];

// Aliases for compatibility
export type Product = WorkspaceItem;
export const products = workspaceItems;
