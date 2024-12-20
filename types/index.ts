import { ComponentType } from 'react';
import { LucideProps } from 'lucide-react';

// Unified Category Interface
export interface Category {
    id: string;
    name: string;
    icon: ComponentType<LucideProps> | string; // Allows both React components and string paths
    subcategories: Subcategory[]; // Link to Subcategory array
    description: string
}

// Subcategory Interface
export interface Subcategory {
    id: string;
    name: string;
    icon: ComponentType<any> | string; // Accept React components or string paths
    skills: string[];
}

// Skill Interface
export interface Skill {
    icon: any;
    id: string;
    name: string;
    category: string;
    subcategory: string;
    description: string;
    prompt: string;
    duration: string,
    difficulty: string
}

// User Details Interface
export interface UserDetails {
    name: string;
    email: string;
    company: string;
}

// Chat Message Interface
export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}
