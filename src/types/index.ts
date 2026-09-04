export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'CS';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  lastLogin: string;
}

export type ProductStatus = 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
export type PriceDisplayMode = 'SHOW_PRICE' | 'REQUEST_QUOTE';
export type PriceMode = PriceDisplayMode;
export type StockStatus = 'Tersedia' | 'Pre-Order (14-21 Hari)' | 'Custom Made' | 'Habis';
export type ProductBadge = 'Best Seller' | 'New' | 'Custom' | 'Promo' | 'Proyek';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryId: string;
  shortDesc: string;
  description: string;
  price: number;
  priceStartingFrom?: number;
  priceMode: PriceDisplayMode;
  material: string;
  dimensions: string; // e.g., "200 x 90 x 75 cm"
  finishing: string;
  colors: string[];
  stockStatus: 'Tersedia' | 'Pre-Order (14-21 Hari)' | 'Custom Made' | 'Habis';
  badge?: ProductBadge;
  featured: boolean;
  images: string[];
  mainImage: string;
  viewCount: number;
  quoteCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  iconName?: string;
  productCount?: number;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  client: string;
  location: string;
  category: string; // "Kantor", "Residensial", "Komersial", "Cafe & Resto"
  description: string;
  date: string;
  featured: boolean;
  gallery: string[];
  mainImage: string;
  beforeAfter?: {
    before: string;
    after: string;
  };
}

export interface Customer {
  id: string;
  name: string;
  company?: string;
  phone: string;
  email: string;
  address?: string;
  createdAt: string;
  totalQuotations: number;
}

export type QuotationStatus = 
  | 'REQUESTED' 
  | 'REVIEWING' 
  | 'QUOTED' 
  | 'NEGOTIATION' 
  | 'APPROVED' 
  | 'COMPLETED' 
  | 'CANCELLED';

export interface QuotationItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number; // can be 0 initially when customer requests
  customNotes?: string;
  materialSpec?: string;
  dimensions?: string;
}

export interface Quotation {
  id: string;
  quotationNumber: string; // e.g. QT-2026-0001
  createdAt: string;
  validUntil: string;
  customerName: string;
  companyName?: string;
  whatsappNumber: string;
  customerPhone?: string;
  email: string;
  address: string;
  items: QuotationItem[];
  subtotal: number;
  discount: number;
  discountAmount?: number;
  additionalCost: number; // e.g. instalasi
  shippingCost: number;
  taxAmount?: number;
  totalAmount: number;
  customerNotes?: string;
  specialRequirements?: string;
  adminNotes?: string;
  status: QuotationStatus;
  terms: string;
  assignedCs?: string;
}

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'WAITING_CUSTOMER' | 'RESOLVED';
export type TicketCategory = 
  | 'Konsultasi Produk' 
  | 'Minta Penawaran' 
  | 'Custom Furniture' 
  | 'Tanya Pengiriman' 
  | 'Komplain' 
  | 'Lainnya';

export interface TicketMessage {
  id: string;
  sender: 'customer' | 'cs';
  senderName: string;
  message: string;
  timestamp: string;
}

export interface CSTicket {
  id: string;
  ticketNumber: string; // e.g. CS-1024
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  category: TicketCategory;
  subject: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

export interface CSSettings {
  name: string;
  title: string;
  avatar: string;
  whatsappNumber: string;
  operatingHours: string;
  greetingMessage: string;
  isOnline: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  projectType: string;
  published: boolean;
  date: string;
}

export interface CompanySettings {
  companyName: string;
  tagline: string;
  logoUrl: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  facebook: string;
  googleMapsUrl: string;
  openingHoursWeekday: string;
  openingHoursWeekend: string;
  isCurrentlyOpen: boolean;
  footerText: string;
  bankAccount: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
}

export interface HomepageCMS {
  heroBrand?: string;
  heroEyebrow?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroCtaCatalog?: string;
  heroCtaConsult?: string;
  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  experienceYears: number;
  completedProjects: number;
  clientSatisfaction?: string;
  satisfactionRate?: number | string;
  aboutTitle?: string;
  aboutText?: string;
  workshopText?: string;
}

export interface ActivityLog {
  id: string;
  userName: string;
  userRole: UserRole;
  action: string;
  target: string;
  timestamp: string;
  details?: string;
}

export interface EstimateCartItem {
  product: Product;
  quantity: number;
  customNotes?: string;
  selectedColor?: string;
}
