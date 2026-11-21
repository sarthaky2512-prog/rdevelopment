import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {
  OperationType,
  auth,
  db,
  googleProvider,
  handleFirestoreError,
  storage,
} from '../firebase';
import {
  DEFAULT_CATEGORIES,
  DEFAULT_PAGES,
  DEFAULT_PROJECTS,
  DEFAULT_SERVICES,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_TESTIMONIALS,
  IMAGES,
} from '../data/defaultContent';
import {
  CmsPage,
  CustomerInquiry,
  InquiryStatus,
  ProjectCategory,
  ProjectItem,
  ServiceItem,
  SiteSettings,
  TestimonialItem,
} from '../types';

const BOOTSTRAPPED_ADMIN_EMAIL = 'sarthaky2512@gmail.com';

interface SiteDataContextValue {
  settings: SiteSettings;
  services: ServiceItem[];
  projects: ProjectItem[];
  categories: ProjectCategory[];
  pages: CmsPage[];
  testimonials: TestimonialItem[];
  inquiries: CustomerInquiry[];
  user: User | null;
  authReady: boolean;
  isAdmin: boolean;
  mapsApiKey: string;
  siteUrl: string;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutAdmin: () => Promise<void>;
  saveSiteSettings: (next: SiteSettings) => Promise<void>;
  saveService: (item: ServiceItem) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  saveProject: (item: ProjectItem) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  saveCategory: (item: ProjectCategory) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  savePage: (item: CmsPage) => Promise<void>;
  deletePage: (id: string) => Promise<void>;
  saveTestimonial: (item: TestimonialItem) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  submitInquiry: (
    payload: Omit<CustomerInquiry, 'id' | 'status' | 'createdAt'>
  ) => Promise<{ id: string; emailed: boolean }>;
  updateInquiryStatus: (id: string, status: InquiryStatus) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
  uploadMediaFile: (file: File, folder?: string) => Promise<string>;
  seedInitialFirestoreContent: () => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextValue | null>(null);

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [projects, setProjects] = useState<ProjectItem[]>(DEFAULT_PROJECTS);
  const [categories, setCategories] = useState<ProjectCategory[]>(DEFAULT_CATEGORIES);
  const [pages, setPages] = useState<CmsPage[]>(DEFAULT_PAGES);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mapsApiKey, setMapsApiKey] = useState<string>(
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  );
  const [siteUrl, setSiteUrl] = useState<string>(
    import.meta.env.VITE_SITE_URL || ''
  );
  const [loading, setLoading] = useState(true);

  // Fetch public runtime config (Maps key / domain)
  useEffect(() => {
    fetch('/api/public-config')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.mapsApiKey) {
          setMapsApiKey(data.mapsApiKey);
        }
        if (data?.siteUrl) {
          setSiteUrl(data.siteUrl);
        }
      })
      .catch(() => {
        // Fallback silently to env defaults
      });
  }, []);

  // Auth listener & verified admin check
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (!currentUser || !currentUser.emailVerified) {
        setIsAdmin(false);
        setAuthReady(true);
        return;
      }

      if (currentUser.email?.toLowerCase() === BOOTSTRAPPED_ADMIN_EMAIL) {
        setIsAdmin(true);
        setAuthReady(true);
        return;
      }

      try {
        const adminDoc = await getDoc(doc(db, 'admins', currentUser.uid));
        setIsAdmin(adminDoc.exists());
      } catch {
        setIsAdmin(false);
      } finally {
        setAuthReady(true);
      }
    });

    return () => unsub();
  }, []);

  // Public CMS subscriptions
  useEffect(() => {
    const unsubSettings = onSnapshot(
      doc(db, 'site_settings', 'global'),
      (snap) => {
        if (snap.exists()) {
          const data = snap.data() as Partial<SiteSettings>;
          const normalizedFaqs =
            Array.isArray(data.faqs) && data.faqs.length > 0
              ? data.faqs.map((faq) => ({
                  ...faq,
                  answer: faq.answer.replace(/\+8444543465/g, '+1 8444543465'),
                }))
              : DEFAULT_SITE_SETTINGS.faqs;
          setSettings({
            ...DEFAULT_SITE_SETTINGS,
            ...data,
            phone:
              data.phone === '+8444543465' || !data.phone
                ? '+1 8444543465'
                : data.phone,
            heroVideoUrl:
              data.heroVideoUrl && data.heroVideoUrl.trim()
                ? data.heroVideoUrl
                : DEFAULT_SITE_SETTINGS.heroVideoUrl,
            navLinks:
              Array.isArray(data.navLinks) && data.navLinks.length > 0
                ? data.navLinks
                : DEFAULT_SITE_SETTINGS.navLinks,
            footerLinks:
              Array.isArray(data.footerLinks) && data.footerLinks.length > 0
                ? data.footerLinks
                : DEFAULT_SITE_SETTINGS.footerLinks,
            faqs: normalizedFaqs,
          });
        }
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );

    const LEGACY_COMMERCIAL_IMG =
      '/src/assets/images/commercial_office_architecture_1795255906442.jpg';

    const unsubServices = onSnapshot(
      query(collection(db, 'services'), orderBy('number', 'asc')),
      (snap) => {
        if (!snap.empty) {
          setServices(
            snap.docs.map((d) => {
              const item = d.data() as ServiceItem;
              return item.imageUrl === LEGACY_COMMERCIAL_IMG
                ? { ...item, imageUrl: IMAGES.commercialOffice }
                : item;
            })
          );
        }
      },
      () => {
        // Retain default content on initial unseeded state
      }
    );

    const unsubProjects = onSnapshot(
      collection(db, 'projects'),
      (snap) => {
        if (!snap.empty) {
          setProjects(
            snap.docs.map((d) => {
              const item = d.data() as ProjectItem;
              return item.imageUrl === LEGACY_COMMERCIAL_IMG
                ? { ...item, imageUrl: IMAGES.commercialOffice }
                : item;
            })
          );
        }
      },
      () => {}
    );

    const unsubCategories = onSnapshot(
      query(collection(db, 'categories'), orderBy('order', 'asc')),
      (snap) => {
        if (!snap.empty) {
          setCategories(snap.docs.map((d) => d.data() as ProjectCategory));
        }
      },
      () => {}
    );

    const unsubPages = onSnapshot(
      collection(db, 'pages'),
      (snap) => {
        setPages(snap.docs.map((d) => d.data() as CmsPage));
      },
      () => {}
    );

    const unsubTestimonials = onSnapshot(
      collection(db, 'testimonials'),
      (snap) => {
        if (!snap.empty) {
          setTestimonials(snap.docs.map((d) => d.data() as TestimonialItem));
        }
      },
      () => {}
    );

    return () => {
      unsubSettings();
      unsubServices();
      unsubProjects();
      unsubCategories();
      unsubPages();
      unsubTestimonials();
    };
  }, []);

  // Admin-only inquiries subscription
  useEffect(() => {
    if (!authReady || !isAdmin) {
      setInquiries([]);
      return;
    }

    const unsubInquiries = onSnapshot(
      query(collection(db, 'inquiries'), orderBy('createdAt', 'desc')),
      (snap) => {
        setInquiries(snap.docs.map((d) => d.data() as CustomerInquiry));
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'inquiries');
      }
    );

    return () => unsubInquiries();
  }, [authReady, isAdmin]);

  // Apply dynamic SEO title & meta description
  useEffect(() => {
    if (settings.seoTitle) {
      document.title = settings.seoTitle;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && settings.seoDescription) {
      metaDesc.setAttribute('content', settings.seoDescription);
    }
  }, [settings.seoTitle, settings.seoDescription]);

  const signInWithGoogle = useCallback(async () => {
    await signInWithPopup(auth, googleProvider);
  }, []);

  const signOutAdmin = useCallback(async () => {
    await signOut(auth);
  }, []);

  const saveSiteSettings = useCallback(async (next: SiteSettings) => {
    const path = 'site_settings/global';
    try {
      await setDoc(doc(db, 'site_settings', 'global'), {
        companyName: next.companyName.slice(0, 100),
        tagline: (next.tagline || '').slice(0, 200),
        phone: next.phone.slice(0, 30),
        email: next.email.slice(0, 120),
        address: next.address.slice(0, 250),
        domain: (next.domain || '').slice(0, 200),
        confirmFreeEstimates: Boolean(next.confirmFreeEstimates),
        heroHeading: next.heroHeading.slice(0, 160),
        heroSubheading: (next.heroSubheading || '').slice(0, 160),
        heroDescription: (next.heroDescription || '').slice(0, 600),
        heroImageUrl: (next.heroImageUrl || '').slice(0, 600),
        heroVideoUrl: (next.heroVideoUrl || '').slice(0, 600),
        aboutHeading: (next.aboutHeading || '').slice(0, 160),
        aboutDescription: (next.aboutDescription || '').slice(0, 1500),
        seoTitle: (next.seoTitle || '').slice(0, 120),
        seoDescription: (next.seoDescription || '').slice(0, 320),
        seoKeywords: (next.seoKeywords || '').slice(0, 400),
        socialInstagram: (next.socialInstagram || '').slice(0, 300),
        socialLinkedIn: (next.socialLinkedIn || '').slice(0, 300),
        socialFacebook: (next.socialFacebook || '').slice(0, 300),
        socialHouzz: (next.socialHouzz || '').slice(0, 300),
        footerDisclaimer: (next.footerDisclaimer || '').slice(0, 800),
        navLinks: (next.navLinks || []).slice(0, 14),
        footerLinks: (next.footerLinks || []).slice(0, 16),
        faqs: (next.faqs || []).slice(0, 20),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  }, []);

  const saveService = useCallback(async (item: ServiceItem) => {
    const cleanId = item.id.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 128);
    const path = `services/${cleanId}`;
    try {
      await setDoc(doc(db, 'services', cleanId), {
        id: cleanId,
        number: Number(item.number) || 1,
        category: item.category.slice(0, 80),
        title: item.title.slice(0, 120),
        description: item.description.slice(0, 1000),
        benefits: (item.benefits || []).slice(0, 10).map((b) => String(b).slice(0, 200)),
        imageUrl: item.imageUrl.slice(0, 600),
        featured: Boolean(item.featured),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  }, []);

  const deleteService = useCallback(async (id: string) => {
    const path = `services/${id}`;
    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }, []);

  const saveProject = useCallback(async (item: ProjectItem) => {
    const cleanId = item.id.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 128);
    const cleanSlug = item.slug.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 128);
    const path = `projects/${cleanId}`;
    try {
      await setDoc(doc(db, 'projects', cleanId), {
        id: cleanId,
        slug: cleanSlug,
        title: item.title.slice(0, 140),
        category: item.category.slice(0, 80),
        projectStatus: item.projectStatus === 'completed' ? 'completed' : 'sample',
        location: (item.location || '').slice(0, 120),
        summary: item.summary.slice(0, 600),
        description: item.description.slice(0, 2500),
        scopeItems: (item.scopeItems || []).slice(0, 12).map((s) => String(s).slice(0, 200)),
        imageUrl: item.imageUrl.slice(0, 600),
        beforeImageUrl: (item.beforeImageUrl || '').slice(0, 600),
        afterImageUrl: (item.afterImageUrl || '').slice(0, 600),
        galleryImages: (item.galleryImages || []).slice(0, 12).map((u) => String(u).slice(0, 600)),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    const path = `projects/${id}`;
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }, []);

  const saveCategory = useCallback(async (item: ProjectCategory) => {
    const cleanId = item.id.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 128);
    const path = `categories/${cleanId}`;
    try {
      await setDoc(doc(db, 'categories', cleanId), {
        id: cleanId,
        name: item.name.slice(0, 80),
        order: Number(item.order) || 1,
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  }, []);

  const deleteCategory = useCallback(async (id: string) => {
    const path = `categories/${id}`;
    try {
      await deleteDoc(doc(db, 'categories', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }, []);

  const savePage = useCallback(async (item: CmsPage) => {
    const cleanId = item.id.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 128);
    const cleanSlug = item.slug.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 128);
    const path = `pages/${cleanId}`;
    try {
      await setDoc(doc(db, 'pages', cleanId), {
        id: cleanId,
        slug: cleanSlug,
        title: item.title.slice(0, 140),
        subtitle: (item.subtitle || '').slice(0, 300),
        body: item.body.slice(0, 8000),
        heroImageUrl: (item.heroImageUrl || '').slice(0, 600),
        showInNav: Boolean(item.showInNav),
        showInFooter: Boolean(item.showInFooter),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  }, []);

  const deletePage = useCallback(async (id: string) => {
    const path = `pages/${id}`;
    try {
      await deleteDoc(doc(db, 'pages', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }, []);

  const saveTestimonial = useCallback(async (item: TestimonialItem) => {
    const cleanId = item.id.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 128);
    const path = `testimonials/${cleanId}`;
    try {
      await setDoc(doc(db, 'testimonials', cleanId), {
        id: cleanId,
        customerName: item.customerName.slice(0, 100),
        projectType: item.projectType.slice(0, 100),
        feedback: item.feedback.slice(0, 800),
        rating: Math.min(5, Math.max(1, Number(item.rating) || 5)),
        isSampleLayout: Boolean(item.isSampleLayout),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  }, []);

  const deleteTestimonial = useCallback(async (id: string) => {
    const path = `testimonials/${id}`;
    try {
      await deleteDoc(doc(db, 'testimonials', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }, []);

  const submitInquiry = useCallback(
    async (payload: Omit<CustomerInquiry, 'id' | 'status' | 'createdAt'>) => {
      const id = `inq-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const path = `inquiries/${id}`;

      const docData: Record<string, unknown> = {
        id,
        inquirySource: payload.inquirySource,
        fullName: payload.fullName.trim().slice(0, 120),
        email: payload.email.trim().slice(0, 160),
        phone: payload.phone.trim().slice(0, 40),
        projectType: payload.projectType.trim().slice(0, 80),
        propertyClass: payload.propertyClass === 'Commercial' ? 'Commercial' : 'Residential',
        projectAddress: (payload.projectAddress || '').trim().slice(0, 250),
        estimatedBudget: (payload.estimatedBudget || '').trim().slice(0, 80),
        preferredStartDate: (payload.preferredStartDate || '').trim().slice(0, 60),
        description: payload.description.trim().slice(0, 3000),
        attachmentUrls: (payload.attachmentUrls || []).slice(0, 5),
        privacyConsent: true,
        status: 'new',
        createdAt: serverTimestamp(),
      };

      try {
        await setDoc(doc(db, 'inquiries', id), docData);
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, path);
      }

      let emailed = false;
      try {
        const res = await fetch('/api/notify-inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(docData),
        });
        if (res.ok) {
          const json = await res.json();
          emailed = Boolean(json.emailed);
        }
      } catch {
        // Notification service failure does not invalidate persisted inquiry
      }

      return { id, emailed };
    },
    []
  );

  const updateInquiryStatus = useCallback(async (id: string, status: InquiryStatus) => {
    const path = `inquiries/${id}`;
    try {
      await updateDoc(doc(db, 'inquiries', id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  }, []);

  const deleteInquiry = useCallback(async (id: string) => {
    const path = `inquiries/${id}`;
    try {
      await deleteDoc(doc(db, 'inquiries', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }, []);

  const uploadMediaFile = useCallback(async (file: File, folder = 'uploads') => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Only JPEG, PNG, and WebP images are allowed.');
    }
    if (file.size > 4 * 1024 * 1024) {
      throw new Error('Image size must be 4 MB or less.');
    }

    // Try Firebase Cloud Storage first when authenticated or configured
    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').slice(0, 60);
      const storageRef = ref(storage, `${folder}/${Date.now()}-${safeName}`);
      const snapshot = await uploadBytes(storageRef, file, {
        contentType: file.type,
      });
      return await getDownloadURL(snapshot.ref);
    } catch {
      // Fallback to validated Express upload endpoint
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error('Could not read file.'));
        reader.readAsDataURL(file);
      });

      const res = await fetch('/api/upload-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, dataUrl }),
      });

      const json = await res.json();
      if (!res.ok || !json.url) {
        throw new Error(json.error || 'Image upload failed.');
      }
      return json.url as string;
    }
  }, []);

  const seedInitialFirestoreContent = useCallback(async () => {
    await saveSiteSettings(DEFAULT_SITE_SETTINGS);
    for (const svc of DEFAULT_SERVICES) {
      await saveService(svc);
    }
    for (const cat of DEFAULT_CATEGORIES) {
      await saveCategory(cat);
    }
    for (const proj of DEFAULT_PROJECTS) {
      await saveProject(proj);
    }
    for (const test of DEFAULT_TESTIMONIALS) {
      await saveTestimonial(test);
    }
  }, [saveCategory, saveProject, saveService, saveSiteSettings, saveTestimonial]);

  const value = useMemo<SiteDataContextValue>(
    () => ({
      settings,
      services,
      projects,
      categories,
      pages,
      testimonials,
      inquiries,
      user,
      authReady,
      isAdmin,
      mapsApiKey,
      siteUrl,
      loading,
      signInWithGoogle,
      signOutAdmin,
      saveSiteSettings,
      saveService,
      deleteService,
      saveProject,
      deleteProject,
      saveCategory,
      deleteCategory,
      savePage,
      deletePage,
      saveTestimonial,
      deleteTestimonial,
      submitInquiry,
      updateInquiryStatus,
      deleteInquiry,
      uploadMediaFile,
      seedInitialFirestoreContent,
    }),
    [
      settings,
      services,
      projects,
      categories,
      pages,
      testimonials,
      inquiries,
      user,
      authReady,
      isAdmin,
      mapsApiKey,
      siteUrl,
      loading,
      signInWithGoogle,
      signOutAdmin,
      saveSiteSettings,
      saveService,
      deleteService,
      saveProject,
      deleteProject,
      saveCategory,
      deleteCategory,
      savePage,
      deletePage,
      saveTestimonial,
      deleteTestimonial,
      submitInquiry,
      updateInquiryStatus,
      deleteInquiry,
      uploadMediaFile,
      seedInitialFirestoreContent,
    ]
  );

  return (
    <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    throw new Error('useSiteData must be used inside SiteDataProvider');
  }
  return ctx;
}
