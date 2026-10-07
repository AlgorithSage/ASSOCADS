import type { LucideIcon } from 'lucide-react';

export interface NavLink {
  label: string;
  href: `#${string}`;
}

export interface Stat {
  name: string;
  value: number;
  suffix: string;
  label: string;
}

export interface Program {
  id: string;
  title: string;
  summary: string;
  points: string[];
  icon: LucideIcon;
}

export type MilestoneStatus = 'Done' | 'Now' | 'Next' | 'Later';

export interface Milestone {
  when: string;
  title: string;
  detail: string;
  status: MilestoneStatus;
}

export type TierGroup = 'individuals' | 'organisations' | 'honorary';

export interface Tier {
  name: string;
  forWho: string;
  price: string;
  period: string;
  perks: string[];
  excludedPerks?: string[];
  highlight?: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  image: string;
  featured?: boolean;
}

export type EventKind = 'Meetup' | 'Workshop' | 'Teacher training' | 'Hackathon' | 'Summit';

export interface EventItem {
  id: string;
  title: string;
  kind: EventKind;
  date: string;
  place: string;
  summary: string;
  status: string;
  image: string;
}

export type GoalHorizon = 'near' | 'mid' | 'long';

export interface GoalGroup {
  title: string;
  items: string[];
}

export interface Goals {
  id: GoalHorizon;
  label: string;
  period: string;
  groups: GoalGroup[];
}

export interface TeamRole {
  role: string;
  looksAfter: string;
  initials: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

// Kept for the API client (apiService.ts), used once the backend is wired back in.
export interface MembershipFormData {
  fullName: string;
  email: string;
  phone: string;
  applicantType: string;
  organization: string;
  designation: string;
  district: string;
  linkedIn: string;
  interestAreas: string[];
  statement: string;
}

export interface ApplicationSubmissionResult {
  success: boolean;
  message: string;
  application: {
    id: string;
    fullName: string;
    status: string;
    submittedAt?: string;
  };
}
