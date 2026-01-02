export interface Problem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  domain: string;
  stage: 'Draft' | 'Team Formation' | 'Building' | 'MVP';
  author: {
    name: string;
    avatar: string;
  };
  requiredRoles: { role: string; count: number; filled: number }[];
  likes: number;
  createdAt: string;
}

export const MOCK_PROBLEMS: Problem[] = [
  {
    id: '1',
    title: 'Sustainable Food Delivery for Remote Areas',
    tagline: 'Connecting local farmers with remote communities using autonomous drones.',
    description: 'Remote communities often lack access to fresh produce due to high transportation costs. We want to build a decentralized logistics network...',
    domain: 'Logistics',
    stage: 'Team Formation',
    author: {
      name: 'Alice Johnson',
      avatar: 'https://i.pravatar.cc/150?u=alice',
    },
    requiredRoles: [
      { role: 'Frontend Dev', count: 1, filled: 0 },
      { role: 'Drone Engineer', count: 2, filled: 1 },
      { role: 'Product Manager', count: 1, filled: 1 },
    ],
    likes: 24,
    createdAt: '2025-01-10T10:00:00Z',
  },
  {
    id: '2',
    title: 'AI-Powered Language Tutor for Dialects',
    tagline: 'Preserving endangered languages through interactive AI conversations.',
    description: 'Most language apps focus on major languages. We want to create a platform that allows communities to document and teach their local dialects...',
    domain: 'EdTech',
    stage: 'Building',
    author: {
      name: 'Bob Smith',
      avatar: 'https://i.pravatar.cc/150?u=bob',
    },
    requiredRoles: [
      { role: 'AI Researcher', count: 1, filled: 1 },
      { role: 'Mobile Dev', count: 2, filled: 2 },
    ],
    likes: 56,
    createdAt: '2025-01-12T14:30:00Z',
  },
  {
    id: '3',
    title: 'Decentralized Energy Trading',
    tagline: 'Peer-to-peer solar energy trading for neighborhoods.',
    description: 'Enabling neighbors to trade excess solar energy with each other using blockchain smart contracts, bypassing the central grid inefficiencies...',
    domain: 'FinTech',
    stage: 'Draft',
    author: {
      name: 'Charlie Davis',
      avatar: 'https://i.pravatar.cc/150?u=charlie',
    },
    requiredRoles: [
      { role: 'Blockchain Dev', count: 2, filled: 0 },
      { role: 'UI/UX Designer', count: 1, filled: 0 },
    ],
    likes: 12,
    createdAt: '2025-01-15T09:15:00Z',
  },
  {
    id: '4',
    title: 'Smart Waste Management',
    tagline: 'IoT sensors for optimized city waste collection.',
    description: 'Using IoT sensors in trash bins to optimize collection routes, reducing fuel consumption and overflowing bins in urban areas...',
    domain: 'Smart City',
    stage: 'MVP',
    author: {
      name: 'Diana Prince',
      avatar: 'https://i.pravatar.cc/150?u=diana',
    },
    requiredRoles: [
      { role: 'Backend Dev', count: 1, filled: 1 },
      { role: 'Data Scientist', count: 1, filled: 1 },
    ],
    likes: 89,
    createdAt: '2024-12-20T11:00:00Z',
  },
];
