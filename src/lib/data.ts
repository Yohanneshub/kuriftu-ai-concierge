import { LucideIcon, Coffee, Utensils, Waves, Compass, Sparkles, Heart, Bell, Settings, LayoutDashboard, UserCircle, LogOut } from 'lucide-react';

export type UserMode = 'guest' | 'staff';

export interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'adventure' | 'wellness' | 'culture' | 'dining';
  matchScore: number;
  price: string;
  duration: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  timestamp: Date;
}

export interface SentimentUpdate {
  id: string;
  room: string;
  guest: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  text: string;
  time: string;
}

export const ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Sunrise Coffee Ceremony',
    description: 'A private, authentic Ethiopian coffee experience overlooking the lake. Includes traditional snacks and history lesson.',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/8d617753-1dac-44c3-9a35-a9313ef4cc8d/coffee-ceremony-7d166abd-1774531114612.webp',
    category: 'culture',
    matchScore: 98,
    price: '$25',
    duration: '1.5 hrs'
  },
  {
    id: '2',
    title: 'Lakeside Traditional Dinner',
    description: 'Authentic injera and kitfo prepared by our master chefs with a panoramic view of Lake Bishoftu.',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/8d617753-1dac-44c3-9a35-a9313ef4cc8d/traditional-dinner-new-974bb9f7-1774531112820.webp',
    category: 'dining',
    matchScore: 92,
    price: '$45',
    duration: '2 hrs'
  },
  {
    id: '3',
    title: 'Full Body Spa Ritual',
    description: 'Relaxing massage using locally sourced botanical oils and ancient healing techniques.',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/8d617753-1dac-44c3-9a35-a9313ef4cc8d/spa-ritual-new-f244d34b-1774531113583.webp',
    category: 'wellness',
    matchScore: 85,
    price: '$60',
    duration: '1 hr'
  },
  {
    id: '4',
    title: 'Bishoftu Lake Exploration',
    description: 'Guided boat tour to explore the hidden gems and diverse birdlife of the volcanic lake.',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/8d617753-1dac-44c3-9a35-a9313ef4cc8d/lake-exploration-d96a5a1f-1774531113682.webp',
    category: 'adventure',
    matchScore: 78,
    price: '$35',
    duration: '2.5 hrs'
  }
];

export const REVENUE_DATA = [
  { name: 'Mon', revenue: 4500, occupancy: 65, avgSpend: 120 },
  { name: 'Tue', revenue: 5200, occupancy: 72, avgSpend: 135 },
  { name: 'Wed', revenue: 4800, occupancy: 68, avgSpend: 118 },
  { name: 'Thu', revenue: 6100, occupancy: 85, avgSpend: 155 },
  { name: 'Fri', revenue: 9500, occupancy: 95, avgSpend: 210 },
  { name: 'Sat', revenue: 11200, occupancy: 100, avgSpend: 245 },
  { name: 'Sun', revenue: 8800, occupancy: 88, avgSpend: 190 },
];

export const SENTIMENT_DATA: SentimentUpdate[] = [
  { id: '1', room: '302', guest: 'Dr. Abiy', sentiment: 'positive', text: 'The room lighting presets are incredible!', time: '2 mins ago' },
  { id: '2', room: '105', guest: 'Sarah J.', sentiment: 'negative', text: 'Wait time for coffee was slightly long.', time: '15 mins ago' },
  { id: '3', room: '411', guest: 'Yared M.', sentiment: 'neutral', text: 'Requested extra pillows via chat.', time: '45 mins ago' },
  { id: '4', room: '205', guest: 'Hana K.', sentiment: 'positive', text: 'The lakeside dinner was breathtaking. 10/10.', time: '1 hour ago' },
];

export const NAV_ITEMS = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Experience Dashboard' },
  { id: 'activities', icon: Compass, label: 'Explore Activities' },
  { id: 'profile', icon: UserCircle, label: 'My Sanctuary' },
  { id: 'settings', icon: Settings, label: 'Preferences' },
];