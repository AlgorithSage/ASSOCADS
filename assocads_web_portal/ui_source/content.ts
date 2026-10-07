// All page copy lives here. Content is mocked for the landing page (no backend calls).
// Source of truth: "Proposed Roadmap for ASSOCADS.pptx" (27 Sept 2026) + the Trust deed.
import { GraduationCap, Building2, Lightbulb, Rocket, HeartHandshake, Wrench, ShieldCheck, Handshake, FlaskConical, Landmark, Briefcase, Globe, type LucideIcon } from 'lucide-react';
import type {
  NavLink,
  Stat,
  Program,
  Milestone,
  Goals,
  TierGroup,
  Tier,
  EventItem,
  TeamRole,
  FaqItem
} from './types';

export const SUMMIT_DATE = '2027-09-25T09:30:00+05:30';

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'What we do', href: '#programs' },
  { label: 'Plan', href: '#plan' },
  { label: 'Goals', href: '#goals' },
  { label: 'Membership', href: '#membership' },
  { label: 'Events', href: '#events' },
  { label: 'FAQ', href: '#faq' }
];

export const hero = {
  eyebrow: 'Association for AI and Data Science',
  titleLines: ['Learn it. Build it.', 'Share it with'],
  intro:
    'ASSOCADS brings students, teachers, companies, startups and government together to learn data science, work on real projects and make sure the benefits reach every community in the state.',
  primaryCta: 'Become a member',
  secondaryCta: 'See what we do'
};

// Year-one targets from the roadmap (slide 6)
export const stats: Stat[] = [
  { name: 'Members', value: 5000, suffix: '+', label: 'Members we aim to welcome in year one' },
  { name: 'Workshops', value: 100, suffix: '+', label: 'Workshops in year one' },
  { name: 'Meetups', value: 12, suffix: '', label: 'Meetups a year, one every month' },
  { name: 'Conferences', value: 4, suffix: '', label: 'Conferences a year, one every quarter' }
];

export const mission =
  'We are a not-for-profit trust. Every rupee we raise goes back into training, scholarships and projects that help people, especially students who would otherwise be left out.';

export const aboutPoints = [
  {
    title: 'Open to everyone',
    text: 'Students, teachers, working professionals, colleges, startups and companies can all join. Fees are kept low for students.'
  },
  {
    title: 'Run as a public trust',
    text: 'We are a registered non-profit. Our accounts are audited and published every year.'
  },
  {
    title: 'Focused on real work',
    text: 'Less talk, more doing. Workshops, internships, research and projects that solve local problems.'
  }
];

// Roadmap slide 3
export const vision =
  'To build the largest community in the state for data science, AI and new technology, one that connects colleges, companies, startups, government and the public.';

// Each mission point with one plain sentence saying what it means in practice
export const missionPoints: { title: string; text: string; icon: LucideIcon }[] = [
  { title: 'Build real technical skills', text: 'Hands-on classes so people can actually do the work, not just read about it.', icon: Wrench },
  { title: 'Promote safe and fair use of AI', text: 'Simple guidelines so AI helps people and does not harm or exclude anyone.', icon: ShieldCheck },
  { title: 'Close the gap between colleges and companies', text: 'Students learn what jobs need, and companies find people who are ready.', icon: Handshake },
  { title: 'Encourage research and new ideas', text: 'Support for studies and projects that solve problems in our own state.', icon: FlaskConical },
  { title: 'Help startups grow', text: 'Mentors, investors and a stage to show your work.', icon: Rocket },
  { title: 'Guide public policy with solid research', text: 'Clear, honest reports the government and public can rely on.', icon: Landmark },
  { title: 'Help more people get good jobs', text: 'Internships, career fairs and a job board for members.', icon: Briefcase },
  { title: 'Build a state community the world recognises', text: 'A strong network here that partners with others across the world.', icon: Globe }
];

export const programs: Program[] = [
  {
    id: 'skills',
    title: 'Skills and training',
    summary: 'Hands-on classes that take you from the basics to job-ready.',
    points: ['100+ workshops across the state', 'Training for college teachers', 'Bootcamps for students', 'Certificates and skill badges'],
    icon: GraduationCap
  },
  {
    id: 'industry',
    title: 'Colleges meet companies',
    summary: 'We connect classrooms with workplaces so students learn what jobs actually need.',
    points: ['Internships and placement partners', 'Career fairs', 'Webinars by people from industry', 'A job and internship board'],
    icon: Building2
  },
  {
    id: 'research',
    title: 'Research and public policy',
    summary: 'Clear, honest research the government and public can rely on.',
    points: ['A yearly state report on data and AI', 'White papers', 'Open datasets for research', 'Guidelines for safe and fair use'],
    icon: Lightbulb
  },
  {
    id: 'startups',
    title: 'Help for startups',
    summary: 'Support for young companies, from first idea to first customers.',
    points: ['A startup showcase every year', 'Introductions to investors', 'A network of mentors', 'Innovation challenges'],
    icon: Rocket
  },
  {
    id: 'community',
    title: 'Good for the community',
    summary: 'Using technology where it is needed most, and helping students who need support.',
    points: ['Projects in health, farming and education', 'Better local government and a cleaner environment', 'Scholarships for students in need', 'Classes in local languages'],
    icon: HeartHandshake
  }
];

// Roadmap slide 5
export const milestones: Milestone[] = [
  {
    when: 'Month 1',
    title: 'Set up the association',
    detail: 'Agree our vision and rules, bring the founding members together, complete legal registration, form the executive committee and start our special-interest groups.',
    status: 'Done'
  },
  {
    when: 'Month 2',
    title: 'Go live and open membership',
    detail: 'Launch this website and our brand, start the membership drive and open our social media pages.',
    status: 'Now'
  },
  {
    when: 'Month 3',
    title: 'Sign our first partners',
    detail: 'First agreements with colleges, universities and companies.',
    status: 'Next'
  },
  {
    when: 'Months 4–6',
    title: 'Meetups, webinars and campus ambassadors',
    detail: 'Monthly meetups, online webinars and a campus ambassador programme in colleges.',
    status: 'Later'
  },
  {
    when: 'Months 7–9',
    title: 'State report, hackathons and startup showcase',
    detail: 'Publish our first state report on AI and data science, and run hackathons and a startup showcase with industry and colleges.',
    status: 'Later'
  },
  {
    when: 'Months 10–12',
    title: 'Our first state summit',
    detail: 'Host the first State Data Science Summit, honour people who made a difference, publish our yearly impact report and plan year two.',
    status: 'Later'
  }
];

// Roadmap slides 6–8
export const goals: Goals[] = [
  {
    id: 'near',
    label: 'Near term',
    period: '0–12 months',
    groups: [
      { title: 'Community building', items: ['5,000+ members', 'Monthly meetups', 'Quarterly conferences', 'Annual Data Science Summit'] },
      { title: 'Learning', items: ['100+ workshops', 'Faculty development programmes', 'Student bootcamps', 'Industry webinars'] },
      { title: 'Digital presence', items: ['Website', 'Member portal', 'Job board', 'Resource library', 'Newsletter', 'Podcast'] },
      { title: 'Partnerships', items: ['Universities', 'IT companies', 'Government', 'Startups', 'Incubators'] }
    ]
  },
  {
    id: 'mid',
    label: 'Mid term',
    period: '15–24 months',
    groups: [
      { title: 'Professional recognition', items: ['State AI Awards', 'Data Scientist Awards', 'AI Startup Awards', 'Distinguished Fellow Programme'] },
      { title: 'Research', items: ['White papers', 'State AI reports', 'Benchmark datasets', 'Responsible AI work'] },
      { title: 'Certification', items: ['Community certificates', 'Faculty certification', 'Skill badges that industry recognises'] },
      { title: 'Startup support', items: ['AI incubator', 'Investor connects', 'Mentor network', 'Innovation challenges'] },
      { title: 'Employability', items: ['Career fairs', 'Internship programmes', 'Placement partnerships'] }
    ]
  },
  {
    id: 'long',
    label: 'Long term',
    period: '24+ months',
    groups: [
      { title: 'Become the state’s leading AI body', items: ['Policy advisory role', 'Government consultation', 'International collaborations', 'Standards and best practices', 'Global conferences'] },
      { title: 'Research leadership', items: ['AI Centres of Excellence', 'Shared research labs', 'Open-source projects', 'An international journal'] },
      { title: 'Social impact', items: ['AI for healthcare', 'AI for agriculture', 'AI for education', 'AI for governance', 'AI for sustainability'] }
    ]
  }
];

export const tierGroups: { id: TierGroup; label: string }[] = [
  { id: 'individuals', label: 'Individuals' },
  { id: 'organisations', label: 'Organisations' },
  { id: 'honorary', label: 'Honorary' }
];

// Roadmap slide 9
export const tiers: Record<TierGroup, Tier[]> = {
  individuals: [
    {
      name: 'Student',
      forWho: 'Undergraduate, postgraduate and research students',
      price: '₹500–₹1,000',
      period: 'per year',
      perks: ['Events', 'Learning material', 'Mentors', 'Student competitions']
    },
    {
      name: 'Professional',
      forWho: 'Working professionals',
      price: '₹2,000–₹5,000',
      period: 'per year',
      highlight: true,
      perks: ['Networking', 'Lower prices for events', 'Special-interest groups', 'Job board']
    },
    {
      name: 'Academic',
      forWho: 'Teachers and researchers',
      price: '₹2,000–₹5,000',
      period: 'per year',
      perks: ['Research partners', 'Teacher training programmes', 'Chances to publish', 'Academic forums']
    },
    {
      name: 'Life member',
      forWho: 'Individuals who want to stay involved for good',
      price: '₹20,000–₹50,000',
      period: 'one time',
      perks: ['Membership for life', 'Recognition', 'A long-term role with us']
    }
  ],
  organisations: [
    {
      name: 'College or university',
      forWho: 'Universities and colleges',
      price: '₹25,000–₹2,00,000',
      period: 'per year',
      perks: ['Campus chapters', 'Training for your teachers', 'Activities for your students']
    },
    {
      name: 'Startup',
      forWho: 'Early-stage startups',
      price: '₹5,000–₹10,000',
      period: 'per year',
      highlight: true,
      perks: ['Chances to show your work', 'Mentoring', 'Meetings with investors']
    },
    {
      name: 'Company',
      forWho: 'Companies of any size',
      price: '₹50,000–₹5,00,000',
      period: 'per year',
      perks: ['Your brand at our events', 'Hiring from our network', 'Speaking slots', 'Long-term partnerships']
    }
  ],
  honorary: [
    {
      name: 'Fellow',
      forWho: 'Distinguished contributors, by invitation',
      price: 'By invitation',
      period: 'no fee or a small one',
      perks: ['Recognition', 'Advisory roles', 'A voice in our thinking']
    },
    {
      name: 'Patron',
      forWho: 'Donors and senior industry leaders',
      price: 'Any contribution',
      period: 'donation',
      highlight: true,
      perks: ['Special recognition', 'An advisory role in our plans']
    }
  ]
};

// Roadmap slide 10 — included in every membership
export const memberBenefits = [
  'Access to workshops, webinars and conferences',
  'Members-only technical talks and recordings',
  'A place in Special Interest Groups',
  'Networking with colleges, industry and government',
  'Job and internship openings',
  'Mentorship programmes',
  'Research partnerships',
  'Eligibility for awards and recognition',
  'Volunteer and leadership roles',
  'Discounts on certificates and events'
];

export const summit = {
  title: 'State Data Science Summit 2027',
  date: '25–26 September 2027',
  place: 'Kolkata',
  text: 'Our first summit: two days of talks, hands-on sessions and awards for the people who made a difference this year. Students, teachers, companies and government, all in one place.'
};

// Mock events, placed in line with the 12-month plan
export const events: EventItem[] = [
  {
    id: 'ev-launch',
    title: 'Launch evening: meet the founding members',
    kind: 'Meetup',
    date: '14 November 2026',
    place: 'Salt Lake, Kolkata',
    summary: 'Hear what we plan to do this year, meet the team and sign up as a member on the spot.',
    status: 'Free · registration open',
    image: '/images/group-discussion.webp'
  },
  {
    id: 'ev-workshop',
    title: 'Hands-on workshop: build your first machine learning project',
    kind: 'Workshop',
    date: '16 January 2027',
    place: 'Salt Lake, Kolkata + online',
    summary: 'A full day of guided practice. Bring a laptop and leave with a working project.',
    status: 'Opens in December',
    image: '/images/coding-together.webp'
  },
  {
    id: 'ev-teachers',
    title: 'Five-day course for college teachers',
    kind: 'Teacher training',
    date: '15–19 February 2027',
    place: 'Partner university campus',
    summary: 'Practical training on teaching data science and using it fairly and safely, with lab material to take back.',
    status: 'Nominations open soon',
    image: '/images/classroom.webp'
  },
  {
    id: 'ev-hackathon',
    title: 'State hackathon and startup showcase',
    kind: 'Hackathon',
    date: '17–19 April 2027',
    place: 'Kolkata + online',
    summary: 'Students and professionals work on health, farming, education and local government problems. Startups show their work to investors.',
    status: 'Opens in February',
    image: '/images/laptop-discussion.webp'
  },
  {
    id: 'ev-summit',
    title: 'State Data Science Summit 2027',
    kind: 'Summit',
    date: '25–26 September 2027',
    place: 'Kolkata',
    summary: 'Our biggest event of the year: talks, awards and our first yearly impact report.',
    status: 'Talk proposals open soon',
    image: '/images/stage-screen.webp'
  }
];

// Roadmap slide 11 — office bearers
export const team: TeamRole[] = [
  { role: 'President', looksAfter: 'Vision, strategy, public representation and partnerships', initials: 'PR' },
  { role: 'Vice President (2)', looksAfter: 'Supports the President and oversees key projects', initials: 'VP' },
  { role: 'General Secretary', looksAfter: 'Day-to-day running, meetings, governance and compliance', initials: 'GS' },
  { role: 'Joint Secretary (2)', looksAfter: 'Membership records, communication and documents', initials: 'JS' },
  { role: 'Treasurer', looksAfter: 'Budgets, accounts, audits, fundraising and financial reports', initials: 'TR' },
  { role: 'Chairman of Industry Relations', looksAfter: 'Company partnerships, sponsorships and the advisory board', initials: 'IR' },
  { role: 'Chairman of Academic Relations', looksAfter: 'University partnerships and work with faculty', initials: 'AR' },
  { role: 'Chairman of Research & Innovation', looksAfter: 'Research groups, publications and grants', initials: 'RI' },
  { role: 'Chairman of Events', looksAfter: 'Conferences, meetups, hackathons and summits', initials: 'EV' },
  { role: 'Chairman of Training & Certifications', looksAfter: 'Workshops, bootcamps and certificates', initials: 'TC' },
  { role: 'Chairman of Startups & Entrepreneurship', looksAfter: 'Incubation, mentoring and investor connects', initials: 'SE' },
  { role: 'Chairman of Government Relations', looksAfter: 'Government projects and policy work', initials: 'GR' },
  { role: 'Chairman of Digital Platforms', looksAfter: 'Website, social media and online community', initials: 'DP' },
  { role: 'Chairman of Marketing & Branding', looksAfter: 'Brand building, outreach and media', initials: 'MB' },
  { role: 'Chairman of Membership', looksAfter: 'Membership growth, onboarding and keeping members engaged', initials: 'ME' },
  { role: 'Legal Advisor', looksAfter: 'Governance and legal matters', initials: 'LA' },
  { role: 'Chartered Accountant', looksAfter: 'Financial oversight and statutory compliance', initials: 'CA' }
];

export const faqs: FaqItem[] = [
  {
    question: 'What is ASSOCADS?',
    answer:
      'ASSOCADS is the Association for AI and Data Science. We are a non-profit trust that runs training, research and community projects, and connects colleges with companies, startups and government.'
  },
  {
    question: 'How does a student benefit from joining?',
    answer:
      'You get events, learning material, mentors and student competitions, plus access to our job and internship board. Students from families who need support can also apply for our scholarships.'
  },
  {
    question: 'I teach at a college. Which membership is for me?',
    answer:
      'Choose Academic membership. It gives you research partners, teacher training programmes, chances to publish and our academic forums. Your college can also join as an institution to start a campus chapter.'
  },
  {
    question: 'Are membership fees and donations properly recorded?',
    answer:
      'Yes. We are a registered non-profit trust. You get a receipt for every payment, and our audited accounts are published every year.'
  },
  {
    question: 'When is the state summit?',
    answer:
      'Our first State Data Science Summit is on 25–26 September 2027 in Kolkata. Members get lower ticket prices and first access to talk proposals.'
  }
];

// Tagline from the logo, used in the scrolling band
export const tagline = ['Collaborate', 'Connect', 'Create impact'];

// Who the hero typing line cycles through
export const heroAudiences = ['students', 'teachers', 'companies', 'startups', 'government', 'everyone'];

// Mock photos (Unsplash, full colour). Replace with real ASSOCADS photos later.
export const photos = {
  strip: [
    { src: '/images/students-laptops.webp', alt: 'Students working together on laptops' },
    { src: '/images/meetup-talk.webp', alt: 'A speaker giving a talk at a meetup' },
    { src: '/images/workshop-board.webp', alt: 'A workshop with ideas on a wall' },
    { src: '/images/conference-audience.webp', alt: 'An audience at a conference' },
    { src: '/images/mentoring.webp', alt: 'A mentor helping two students' }
  ],
  about: { src: '/images/classroom.webp', alt: 'A class listening to a lecture' },
  summit: { src: '/images/microphone.webp', alt: '' }
};

export const contact = {
  email: 'secretariat@assocads.org',
  address: 'Salt Lake Sector V, Kolkata, West Bengal'
};
