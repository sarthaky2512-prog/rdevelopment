export interface NavLinkItem {
  label: string;
  path: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  domain: string;
  confirmFreeEstimates: boolean;
  heroHeading: string;
  heroSubheading: string;
  heroDescription: string;
  heroImageUrl: string;
  heroVideoUrl?: string;
  aboutHeading: string;
  aboutDescription: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  socialInstagram: string;
  socialLinkedIn: string;
  socialFacebook: string;
  socialHouzz: string;
  footerDisclaimer: string;
  navLinks: NavLinkItem[];
  footerLinks: NavLinkItem[];
  faqs: FaqItem[];
  updatedAt?: unknown;
}

export type ServiceCategory =
  | 'Construction Services'
  | 'Architecture & Design'
  | 'Remodeling Services'
  | 'Exterior Services'
  | 'Specialized Services';

export interface ServiceItem {
  id: string;
  number: number;
  category: ServiceCategory | string;
  title: string;
  description: string;
  benefits: string[];
  imageUrl: string;
  featured?: boolean;
  updatedAt?: unknown;
}

export type ProjectStatus = 'sample' | 'completed';

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  projectStatus: ProjectStatus;
  location?: string;
  summary: string;
  description: string;
  scopeItems?: string[];
  imageUrl: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  galleryImages?: string[];
  updatedAt?: unknown;
}

export interface ProjectCategory {
  id: string;
  name: string;
  order: number;
}

export interface CmsPage {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  body: string;
  heroImageUrl?: string;
  showInNav: boolean;
  showInFooter: boolean;
  updatedAt?: unknown;
}

export interface TestimonialItem {
  id: string;
  customerName: string;
  projectType: string;
  feedback: string;
  rating: number;
  isSampleLayout: boolean;
  updatedAt?: unknown;
}

export type InquiryStatus = 'new' | 'reviewed' | 'scheduled' | 'archived';

export interface CustomerInquiry {
  id: string;
  inquirySource: 'estimate' | 'contact';
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  propertyClass?: 'Residential' | 'Commercial';
  projectAddress?: string;
  estimatedBudget?: string;
  preferredStartDate?: string;
  description: string;
  attachmentUrls?: string[];
  privacyConsent: boolean;
  status: InquiryStatus;
  createdAt?: unknown;
}
