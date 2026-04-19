export type PoseCategory = 'Solo' | 'Couple' | 'Group' | 'Portrait' | 'Sitting';

export interface Pose {
  id: string;
  title: string;
  category: PoseCategory;
  src: string; // path to the SVG asset
  description: string;
}

export const poses: Pose[] = [
  {
    id: 'solo-standing-01',
    title: 'Casual Lean',
    category: 'Solo',
    src: '/poses/solo/standing-01.svg',
    description: 'A relaxed standing pose with one hand on hip',
  },
  // I'll reuse the standing-01.svg placeholder for testing multiple items
  {
    id: 'solo-portrait-01',
    title: 'Headshot Flow',
    category: 'Portrait',
    src: '/poses/solo/standing-01.svg',
    description: 'Close up portrait pose reference',
  },
  {
    id: 'couple-hug-01',
    title: 'Warm Hug',
    category: 'Couple',
    src: '/poses/solo/standing-01.svg',
    description: 'A close standing couple hug',
  },
  {
    id: 'group-party-01',
    title: 'Friends Jump',
    category: 'Group',
    src: '/poses/solo/standing-01.svg',
    description: 'Action pose for three or more people',
  },
];
