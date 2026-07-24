export interface Tool {
  _id: string;
  name: string;
  company: string;
  description: string;
  category: string;
  pricing: string;
  website: string;
  apiAvailable: boolean;
  featured: boolean;
  rating: number | null;
  views: number;
  bookmarkCount: number;
  comparisonCount: number;
  tags: string[];
  createdAt: string;
  createdBy?: {
    name: string;
    email: string;
  };
}