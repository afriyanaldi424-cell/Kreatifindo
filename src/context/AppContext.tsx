import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  Category,
  Project,
  Quotation,
  CSTicket,
  CSSettings,
  Testimonial,
  CompanySettings,
  HomepageCMS,
  ActivityLog,
  AdminUser,
  EstimateCartItem,
  UserRole,
} from '../types';
import { storage } from '../lib/storage';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message?: string;
}

interface AppContextType {
  // Data
  products: Product[];
  categories: Category[];
  projects: Project[];
  quotations: Quotation[];
  csTickets: CSTicket[];
  csSettings: CSSettings;
  testimonials: Testimonial[];
  settings: CompanySettings;
  homepageCMS: HomepageCMS;
  activityLogs: ActivityLog[];
  adminUsers: AdminUser[];
  currentAdmin: AdminUser | null;
  currentAdminUser: AdminUser | null;

  // Features
  estimateCart: EstimateCartItem[];
  comparisonIds: string[];
  wishlistIds: string[];
  recentlyViewedIds: string[];
  quickViewProduct: Product | null;
  isEstimateDrawerOpen: boolean;
  isCompareModalOpen: boolean;
  isCsWidgetOpen: boolean;
  activeCsTicket: CSTicket | null;
  toasts: ToastMessage[];

  // Routing
  currentRoute: string;
  navigate: (route: string) => void;

  // Actions
  addToEstimateCart: (product: Product, quantity?: number, customNotes?: string, selectedColor?: string) => void;
  removeFromEstimateCart: (productId: string) => void;
  updateEstimateCartQuantity: (productId: string, quantity: number) => void;
  clearEstimateCart: () => void;
  toggleCompare: (productId: string) => void;
  removeCompare: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  addRecentlyViewed: (productId: string) => void;
  setQuickView: (product: Product | null) => void;
  setIsEstimateDrawerOpen: (open: boolean) => void;
  setIsCompareModalOpen: (open: boolean) => void;
  setIsCsWidgetOpen: (open: boolean) => void;
  setActiveCsTicket: (ticket: CSTicket | null) => void;
  addToast: {
    (toast: Omit<ToastMessage, 'id'>): void;
    (type: 'success' | 'info' | 'error', title: string, message?: string): void;
  };
  removeToast: (id: string) => void;

  // Business Workflows
  submitQuotationRequest: (data: {
    customerName: string;
    customerPhone?: string;
    companyName?: string;
    whatsappNumber?: string;
    email?: string;
    customerEmail?: string;
    address?: string;
    projectAddress?: string;
    items?: { productId: string; quantity: number; customNotes?: string; materialSpec?: string; dimensions?: string }[];
    customerNotes?: string;
    notes?: string;
    timeline?: string;
    specialRequirements?: string;
  }) => Quotation;

  createCsTicket: (data: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    category: CSTicket['category'];
    subject: string;
    initialMessage: string;
  }) => CSTicket;

  sendTicketMessage: (ticketId: string, messageText: string, sender: 'customer' | 'cs' | 'agent' | 'system', senderName?: string) => void;
  updateTicketStatus: (ticketId: string, status: CSTicket['status']) => void;

  // Admin Ops
  loginAdmin: (emailOrRole?: string, password?: string) => boolean;
  logoutAdmin: () => void;
  saveProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  saveProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  updateQuotationStatus: (id: string, status: any) => void;
  updateQuotationDetails: (quotation: Quotation) => void;
  deleteQuotation: (id: string) => void;
  updateCsSettings: (newSettings: Partial<CSSettings>) => void;
  updateHomepageCMS: (newCms: Partial<HomepageCMS>) => void;
  updateSettings: (newSettings: Partial<CompanySettings>) => void;
  refreshData: () => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Core state from storage
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [csTickets, setCsTickets] = useState<CSTicket[]>([]);
  const [csSettings, setCsSettings] = useState<CSSettings>(storage.getCSSettings());
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [settings, setSettings] = useState<CompanySettings>(storage.getCompanySettings());
  const [homepageCMS, setHomepageCMS] = useState<HomepageCMS>(storage.getHomepageCMS());
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);

  // Client interactive state
  const [estimateCart, setEstimateCart] = useState<EstimateCartItem[]>([]);
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isEstimateDrawerOpen, setIsEstimateDrawerOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isCsWidgetOpen, setIsCsWidgetOpen] = useState(false);
  const [activeCsTicket, setActiveCsTicket] = useState<CSTicket | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Simple Hash Routing with smooth scroll to top
  const [currentRoute, setCurrentRoute] = useState<string>(window.location.hash || '#/');

  const navigate = (route: string) => {
    window.location.hash = route;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || '#/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const refreshData = () => {
    setProducts(storage.getProducts());
    setCategories(storage.getCategories());
    setProjects(storage.getProjects());
    setQuotations(storage.getQuotations());
    setCsTickets(storage.getCSTickets());
    setCsSettings(storage.getCSSettings());
    setTestimonials(storage.getTestimonials());
    setSettings(storage.getCompanySettings());
    setHomepageCMS(storage.getHomepageCMS());
    setActivityLogs(storage.getActivityLogs());
    setAdminUsers(storage.getAdminUsers());
    setWishlistIds(storage.getWishlist());
    setRecentlyViewedIds(storage.getRecentlyViewed());
  };

  // Initial load
  useEffect(() => {
    refreshData();
    // Pre-fill admin session for easy demo evaluation if stored, or default to super admin when accessing #/admin
    const storedAdmin = localStorage.getItem('kreatifindo_active_admin');
    if (storedAdmin) {
      try {
        setCurrentAdmin(JSON.parse(storedAdmin));
      } catch {
        // no-op
      }
    }
  }, []);

  const addToast = (
    toastOrType: Omit<ToastMessage, 'id'> | 'success' | 'info' | 'error',
    title?: string,
    message?: string
  ) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    let newToast: ToastMessage;
    if (typeof toastOrType === 'string') {
      newToast = { id, type: toastOrType, title: title || '', message };
    } else {
      newToast = { ...toastOrType, id };
    }
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addRecentlyViewed = (productId: string) => {
    storage.addRecentlyViewed(productId);
    setRecentlyViewedIds(storage.getRecentlyViewed());
  };

  // Estimate Cart Actions
  const addToEstimateCart = (product: Product, quantity = 1, customNotes = '', selectedColor?: string) => {
    setEstimateCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                customNotes: customNotes || item.customNotes,
                selectedColor: selectedColor || item.selectedColor,
              }
            : item
        );
      }
      return [...prev, { product, quantity, customNotes, selectedColor }];
    });

    addToast({
      type: 'success',
      title: 'Ditambahkan ke Daftar Kebutuhan',
      message: `${quantity}x ${product.name} telah masuk ke daftar penawaran Anda.`,
    });
  };

  const removeFromEstimateCart = (productId: string) => {
    setEstimateCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast({
      type: 'info',
      title: 'Item Dihapus',
      message: 'Produk telah dikeluarkan dari daftar kebutuhan.',
    });
  };

  const updateEstimateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromEstimateCart(productId);
      return;
    }
    setEstimateCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearEstimateCart = () => {
    setEstimateCart([]);
  };

  // Compare Actions
  const toggleCompare = (productId: string) => {
    if (comparisonIds.includes(productId)) {
      setComparisonIds((prev) => prev.filter((id) => id !== productId));
      addToast({
        type: 'info',
        title: 'Dihapus dari Perbandingan',
        message: 'Produk dikeluarkan dari perbandingan spesifikasi.',
      });
    } else {
      if (comparisonIds.length >= 4) {
        addToast({
          type: 'error',
          title: 'Batas Perbandingan',
          message: 'Maksimal membandingkan 4 produk sekaligus.',
        });
        return;
      }
      setComparisonIds((prev) => [...prev, productId]);
      addToast({
        type: 'success',
        title: 'Ditambahkan ke Perbandingan',
        message: 'Buka panel perbandingan untuk melihat perbedaan spek.',
      });
    }
  };

  const removeCompare = (productId: string) => {
    setComparisonIds((prev) => prev.filter((id) => id !== productId));
  };

  // Wishlist Action
  const toggleWishlist = (productId: string) => {
    const isAdded = storage.toggleWishlist(productId);
    setWishlistIds(storage.getWishlist());
    const prod = products.find((p) => p.id === productId);
    addToast({
      type: 'success',
      title: isAdded ? 'Disimpan ke Wishlist' : 'Dihapus dari Wishlist',
      message: prod ? prod.name : 'Produk diperbarui di daftar favorit Anda.',
    });
  };

  // Public Submit Quotation
  const submitQuotationRequest = (data: {
    customerName: string;
    customerPhone?: string;
    companyName?: string;
    whatsappNumber?: string;
    email?: string;
    customerEmail?: string;
    address?: string;
    projectAddress?: string;
    items?: { productId: string; quantity: number; customNotes?: string; materialSpec?: string; dimensions?: string }[];
    customerNotes?: string;
    notes?: string;
    timeline?: string;
    specialRequirements?: string;
  }): Quotation => {
    const resolvedPhone = data.whatsappNumber || data.customerPhone || '';
    const resolvedEmail = data.email || data.customerEmail || '';
    const resolvedAddress = data.address || data.projectAddress || '';
    const resolvedNotes = data.customerNotes || data.notes || '';
    const resolvedRequirements =
      data.specialRequirements ||
      (data.timeline ? `Timeline target pengerjaan: ${data.timeline}` : '');

    const rawItems =
      data.items && data.items.length > 0
        ? data.items
        : estimateCart.map((cartItem) => ({
            productId: cartItem.product.id,
            quantity: cartItem.quantity,
            customNotes: cartItem.customNotes,
            materialSpec: cartItem.product.material,
            dimensions: cartItem.product.dimensions,
          }));

    const quotationItems = rawItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        productId: item.productId,
        productName: product ? product.name : 'Custom Furniture Item',
        productImage: product ? product.mainImage : '',
        quantity: item.quantity,
        unitPrice: product && product.priceMode === 'SHOW_PRICE' ? product.price : 0,
        customNotes: item.customNotes,
        materialSpec: item.materialSpec || (product ? product.material : ''),
        dimensions: item.dimensions || (product ? product.dimensions : ''),
      };
    });

    const subtotal = quotationItems.reduce((acc, it) => acc + it.unitPrice * it.quantity, 0);

    const created = storage.createQuotation({
      validUntil: '',
      customerName: data.customerName,
      companyName: data.companyName,
      whatsappNumber: resolvedPhone,
      customerPhone: resolvedPhone,
      email: resolvedEmail,
      address: resolvedAddress,
      items: quotationItems,
      subtotal,
      discount: 0,
      additionalCost: 0,
      shippingCost: 0,
      totalAmount: subtotal,
      customerNotes: resolvedNotes,
      specialRequirements: resolvedRequirements,
      terms: 'DP 50% saat PO disepakati, pelunasan 50% setelah instalasi tuntas di lokasi.',
    });

    refreshData();
    clearEstimateCart();
    addToast({
      type: 'success',
      title: 'Permintaan Penawaran Terkirim!',
      message: `Nomor Quotation Anda: ${created.quotationNumber}. Tim konsultan kami akan segera menghubungi Anda.`,
    });
    return created;
  };

  // CS Ticket Creation
  const createCsTicket = (data: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    category: CSTicket['category'];
    subject: string;
    initialMessage: string;
  }): CSTicket => {
    const created = storage.createTicket(data);
    refreshData();
    setActiveCsTicket(created);
    addToast({
      type: 'success',
      title: 'Tiket Konsultasi Dibuat!',
      message: `Nomor Tiket: #${created.ticketNumber}. Staff kami siap membantu.`,
    });
    return created;
  };

  const sendTicketMessage = (
    ticketId: string,
    messageText: string,
    sender: 'customer' | 'cs' | 'agent' | 'system',
    senderName?: string
  ) => {
    const isCsSender = sender === 'cs' || sender === 'agent';
    const resolvedName = senderName || (isCsSender ? csSettings.name : 'Pelanggan');
    storage.addTicketMessage(ticketId, {
      sender: isCsSender ? 'cs' : 'customer',
      senderName: resolvedName,
      message: messageText,
    });
    refreshData();
    const updated = storage.getCSTickets().find((t) => t.id === ticketId);
    if (updated) {
      setActiveCsTicket(updated);
    }
  };

  const updateTicketStatus = (ticketId: string, status: CSTicket['status']) => {
    storage.updateTicketStatus(ticketId, status);
    refreshData();
    addToast({
      type: 'info',
      title: 'Status Tiket Diperbarui',
      message: `Status tiket sekarang: ${status}`,
    });
  };

  // Admin Auth simulation
  const loginAdmin = (emailOrRole?: string, password?: string): boolean => {
    const users = storage.getAdminUsers();
    let matched: AdminUser | undefined;

    if (!emailOrRole || emailOrRole === 'SUPER_ADMIN') {
      matched = users[0];
    } else {
      matched = users.find(
        (u) =>
          u.email.toLowerCase() === emailOrRole.toLowerCase() ||
          u.role.toLowerCase() === emailOrRole.toLowerCase()
      );
      if (!matched && emailOrRole.includes('admin')) {
        matched = users[0];
      }
    }

    if (!matched) {
      matched = users[0];
    }

    setCurrentAdmin(matched);
    localStorage.setItem('kreatifindo_active_admin', JSON.stringify(matched));
    storage.addLog('Login Admin Dashboard', `User: ${matched.name} (${matched.role})`);
    refreshData();
    addToast({
      type: 'success',
      title: 'Login Berhasil',
      message: `Selamat datang, ${matched.name} (${matched.role})`,
    });
    return true;
  };

  const logoutAdmin = () => {
    if (currentAdmin) {
      storage.addLog('Logout Admin Dashboard', `User: ${currentAdmin.name}`);
    }
    setCurrentAdmin(null);
    localStorage.removeItem('kreatifindo_active_admin');
    navigate('#/');
    addToast({
      type: 'info',
      title: 'Logout Berhasil',
      message: 'Anda telah keluar dari Dashboard Admin.',
    });
  };

  // Product CRUD
  const saveProduct = (product: Product) => {
    storage.saveProduct(product);
    refreshData();
    addToast({
      type: 'success',
      title: 'Produk Disimpan',
      message: `Produk "${product.name}" berhasil disimpan ke katalog.`,
    });
  };

  const deleteProduct = (id: string) => {
    storage.deleteProduct(id);
    refreshData();
    addToast({
      type: 'info',
      title: 'Produk Dihapus',
      message: 'Item telah dihapus dari katalog.',
    });
  };

  // Project CRUD
  const saveProject = (project: Project) => {
    storage.saveProject(project);
    refreshData();
    addToast({
      type: 'success',
      title: 'Proyek Disimpan',
      message: `Proyek "${project.name}" berhasil diperbarui di portofolio.`,
    });
  };

  const deleteProject = (id: string) => {
    storage.deleteProject(id);
    refreshData();
    addToast({
      type: 'info',
      title: 'Proyek Dihapus',
      message: 'Item portofolio telah dihapus.',
    });
  };

  // Quotation Management
  const updateQuotationStatus = (id: string, status: any) => {
    const q = storage.getQuotations().find((item) => item.id === id);
    if (q) {
      const updated = { ...q, status };
      storage.updateQuotation(updated);
      refreshData();
      addToast({
        type: 'info',
        title: 'Status Quotation Berubah',
        message: `${q.quotationNumber} sekarang: ${status}`,
      });
    }
  };

  const updateQuotationDetails = (quotation: Quotation) => {
    storage.updateQuotation(quotation);
    refreshData();
    addToast({
      type: 'success',
      title: 'Penawaran Diperbarui',
      message: `Penawaran ${quotation.quotationNumber} berhasil disimpan.`,
    });
  };

  const deleteQuotation = (id: string) => {
    const quotations = storage.getQuotations().filter((q) => q.id !== id);
    storage.saveQuotations(quotations);
    refreshData();
    addToast({
      type: 'info',
      title: 'Penawaran Dihapus',
      message: 'Data penawaran telah dihapus dari sistem.',
    });
  };

  // CS Settings Update
  const updateCsSettings = (newSettings: Partial<CSSettings>) => {
    const updated = { ...csSettings, ...newSettings };
    storage.saveCSSettings(updated);
    setCsSettings(updated);
    refreshData();
    addToast({
      type: 'success',
      title: 'Profil CS Diperbarui',
      message: 'Konfigurasi customer service berhasil disimpan.',
    });
  };

  // Homepage CMS Update
  const updateHomepageCMS = (newCms: Partial<HomepageCMS>) => {
    const updated = { ...homepageCMS, ...newCms };
    storage.saveHomepageCMS(updated);
    setHomepageCMS(updated);
    refreshData();
    addToast({
      type: 'success',
      title: 'Beranda Diperbarui',
      message: 'Perubahan teks dan banner beranda telah dipublikasikan.',
    });
  };

  // Company Settings Update
  const updateSettings = (newSettings: Partial<CompanySettings>) => {
    const updated = { ...settings, ...newSettings };
    storage.saveCompanySettings(updated);
    setSettings(updated);
    refreshData();
    addToast({
      type: 'success',
      title: 'Pengaturan Disimpan',
      message: 'Profil perusahaan & info rekening berhasil diperbarui.',
    });
  };

  const resetAllData = () => {
    storage.resetToDefaults();
    refreshData();
    addToast({
      type: 'info',
      title: 'Data Direset',
      message: 'Seluruh katalog dan konfigurasi dikembalikan ke bawaan sistem.',
    });
  };

  return (
    <AppContext.Provider
      value={{
        products,
        categories,
        projects,
        quotations,
        csTickets,
        csSettings,
        testimonials,
        settings,
        homepageCMS,
        activityLogs,
        adminUsers,
        currentAdmin,
        currentAdminUser: currentAdmin,
        estimateCart,
        comparisonIds,
        wishlistIds,
        recentlyViewedIds,
        quickViewProduct,
        isEstimateDrawerOpen,
        isCompareModalOpen,
        isCsWidgetOpen,
        activeCsTicket,
        toasts,
        currentRoute,
        navigate,
        addToEstimateCart,
        removeFromEstimateCart,
        updateEstimateCartQuantity,
        clearEstimateCart,
        toggleCompare,
        removeCompare,
        toggleWishlist,
        addRecentlyViewed,
        setQuickView: setQuickViewProduct,
        setIsEstimateDrawerOpen,
        setIsCompareModalOpen,
        setIsCsWidgetOpen,
        setActiveCsTicket,
        addToast,
        removeToast,
        submitQuotationRequest,
        createCsTicket,
        sendTicketMessage,
        updateTicketStatus,
        loginAdmin,
        logoutAdmin,
        saveProduct,
        deleteProduct,
        saveProject,
        deleteProject,
        updateQuotationStatus,
        updateQuotationDetails,
        deleteQuotation,
        updateCsSettings,
        updateHomepageCMS,
        updateSettings,
        refreshData,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
