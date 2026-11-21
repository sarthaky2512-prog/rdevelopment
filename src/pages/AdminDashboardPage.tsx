import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Database,
  FileText,
  FolderKanban,
  Globe,
  Hammer,
  Inbox,
  Loader2,
  LogIn,
  LogOut,
  MessageSquareQuote,
  Plus,
  Settings,
  ShieldAlert,
  Trash2,
  Upload,
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import {
  CmsPage,
  InquiryStatus,
  ProjectCategory,
  ProjectItem,
  ServiceItem,
  SiteSettings,
  TestimonialItem,
} from '../types';
import { SafeImage } from '../components/SafeImage';

type AdminTab =
  | 'inquiries'
  | 'homepage'
  | 'services'
  | 'projects'
  | 'categories'
  | 'pages'
  | 'testimonials'
  | 'navigation_seo';

export function AdminDashboardPage() {
  const {
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
    updateInquiryStatus,
    deleteInquiry,
    uploadMediaFile,
    seedInitialFirestoreContent,
  } = useSiteData();

  const [activeTab, setActiveTab] = useState<AdminTab>('inquiries');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [busy, setBusy] = useState(false);

  // Local editable settings state
  const [draftSettings, setDraftSettings] = useState<SiteSettings>(settings);
  useEffect(() => {
    setDraftSettings(settings);
  }, [settings]);

  // Service Editor state
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [benefitsInput, setBenefitsInput] = useState('');

  // Project Editor state
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [scopeInput, setScopeInput] = useState('');

  // Category Editor state
  const [newCategoryName, setNewCategoryName] = useState('');

  // Page Editor state
  const [editingPage, setEditingPage] = useState<CmsPage | null>(null);

  // Testimonial Editor state
  const [editingTestimonial, setEditingTestimonial] =
    useState<TestimonialItem | null>(null);

  const notify = (msg: string) => {
    setErrorMessage('');
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 4000);
  };

  const fail = (err: unknown) => {
    setStatusMessage('');
    setErrorMessage(err instanceof Error ? err.message : 'Operation failed.');
  };

  if (!authReady) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FAFAF8]">
        <Loader2 className="w-7 h-7 animate-spin text-[#9A7420]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[75vh] bg-[#0B0B0C] text-[#FAFAF8] flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full bg-[#141416] border border-white/15 p-10 space-y-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
            Admin Portal
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold">
            {settings.companyName} Content &amp; Inquiry Management
          </h1>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Sign in with your authorized administrator Google account to manage website
            pages, hero banners, services, portfolio photography, testimonials, SEO, and
            customer inquiries.
          </p>
          <button
            type="button"
            onClick={() => signInWithGoogle().catch(fail)}
            className="w-full py-3.5 px-5 bg-[#D4AF37] text-[#0B0B0C] text-xs font-semibold uppercase tracking-wider hover:bg-[#C59B40] transition-colors inline-flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In with Google</span>
          </button>
          {errorMessage && (
            <p className="text-xs text-red-400">{errorMessage}</p>
          )}
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[75vh] bg-[#0B0B0C] text-[#FAFAF8] flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full bg-[#141416] border border-red-500/30 p-10 space-y-5">
          <ShieldAlert className="w-8 h-8 text-red-400" />
          <h1 className="font-display text-3xl font-semibold">
            Administrator Access Required
          </h1>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Signed in as <span className="font-mono text-white">{user.email}</span>,
            which is not authorized for the {settings.companyName} Admin Dashboard.
          </p>
          <button
            type="button"
            onClick={() => signOutAdmin()}
            className="px-5 py-2.5 border border-white/25 text-xs font-semibold uppercase tracking-wider hover:border-[#D4AF37]"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  const handleUploadAndSet = async (
    file: File,
    folder: string,
    onDone: (url: string) => void
  ) => {
    setBusy(true);
    try {
      const url = await uploadMediaFile(file, folder);
      onDone(url);
      notify('Image uploaded successfully.');
    } catch (err) {
      fail(err);
    } finally {
      setBusy(false);
    }
  };

  const TABS: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'inquiries', label: `Inquiries (${inquiries.length})`, icon: Inbox },
    { id: 'homepage', label: 'Homepage & Contact', icon: Settings },
    { id: 'services', label: `Services (${services.length})`, icon: Hammer },
    { id: 'projects', label: `Projects (${projects.length})`, icon: FolderKanban },
    { id: 'categories', label: 'Categories', icon: Database },
    { id: 'pages', label: `Pages (${pages.length})`, icon: FileText },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    { id: 'navigation_seo', label: 'Navigation, Footer & SEO', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-[#F3F2EE]">
      {/* Top Admin Bar */}
      <div className="bg-[#0B0B0C] text-[#FAFAF8] border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              Administrator Workspace
            </p>
            <h1 className="font-display text-3xl font-semibold">
              {settings.companyName} CMS &amp; Inquiries
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                try {
                  await seedInitialFirestoreContent();
                  notify('Default catalog & settings synced to Firestore.');
                } catch (err) {
                  fail(err);
                } finally {
                  setBusy(false);
                }
              }}
              className="px-4 py-2 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#0B0B0C] transition-colors inline-flex items-center gap-2"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Sync Defaults to Firestore</span>
            </button>
            <span className="text-xs text-neutral-400 font-mono">{user.email}</span>
            <button
              type="button"
              onClick={() => signOutAdmin()}
              className="px-4 py-2 border border-white/20 text-xs font-semibold uppercase tracking-wider hover:border-white inline-flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center gap-1 overflow-x-auto border-t border-white/10">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3.5 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                  active
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10 space-y-6">
        {statusMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="p-4 bg-red-50 border border-red-300 text-red-900 text-sm">
            {errorMessage}
          </div>
        )}

        {/* TAB 1: CUSTOMER INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl font-semibold text-[#0B0B0C]">
                Customer Inquiries &amp; Estimate Requests
              </h2>
              <span className="font-mono text-xs text-neutral-600 tabular-nums">
                {inquiries.length} Total
              </span>
            </div>

            {inquiries.length === 0 ? (
              <div className="bg-white border border-black/10 p-10 text-center text-sm text-neutral-600">
                No estimate or contact inquiries submitted yet. Submissions from the
                Request an Estimate and Contact Us forms appear here immediately.
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="bg-white border border-black/10 p-6 space-y-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/10 pb-4">
                      <div>
                        <div className="text-xs text-neutral-500 flex flex-wrap items-center gap-2">
                          <span className="uppercase font-semibold text-[#9A7420]">
                            {inq.inquirySource === 'contact'
                              ? 'Contact Message'
                              : 'Estimate Request'}
                          </span>
                          <span>·</span>
                          <span>{inq.propertyClass || 'Residential'}</span>
                          <span>·</span>
                          <span>{inq.projectType}</span>
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-[#0B0B0C] mt-1">
                          {inq.fullName}
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <select
                          value={inq.status}
                          onChange={(e) =>
                            updateInquiryStatus(
                              inq.id,
                              e.target.value as InquiryStatus
                            )
                              .then(() => notify('Inquiry status updated.'))
                              .catch(fail)
                          }
                          className="px-3 py-2 border border-neutral-300 bg-[#FAFAF8] text-xs font-semibold uppercase tracking-wider"
                        >
                          <option value="new">New</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="archived">Archived</option>
                        </select>
                        <button
                          type="button"
                          onClick={() =>
                            deleteInquiry(inq.id)
                              .then(() => notify('Inquiry removed.'))
                              .catch(fail)
                          }
                          aria-label="Delete inquiry"
                          className="p-2 border border-red-200 text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-neutral-700">
                      <div>
                        <span className="text-neutral-500 block">Email</span>
                        <a href={`mailto:${inq.email}`} className="underline">
                          {inq.email}
                        </a>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">Phone</span>
                        <a href={`tel:${inq.phone}`} className="tabular-nums">
                          {inq.phone}
                        </a>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">Budget</span>
                        <span>{inq.estimatedBudget || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">Preferred Start</span>
                        <span className="tabular-nums">
                          {inq.preferredStartDate || 'Flexible'}
                        </span>
                      </div>
                    </div>

                    {inq.projectAddress && (
                      <div className="text-xs text-neutral-700">
                        <span className="text-neutral-500">Project Address: </span>
                        {inq.projectAddress}
                      </div>
                    )}

                    <p className="text-sm text-neutral-800 bg-[#FAFAF8] p-4 border border-black/5 whitespace-pre-line">
                      {inq.description}
                    </p>

                    {inq.attachmentUrls && inq.attachmentUrls.length > 0 && (
                      <div className="flex flex-wrap gap-3 pt-2">
                        {inq.attachmentUrls.map((url, idx) => (
                          <a
                            key={`${url}-${idx}`}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-24 h-24 border border-black/15 overflow-hidden block"
                          >
                            <SafeImage
                              src={url}
                              alt={`Uploaded attachment ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: HOMEPAGE, HERO BANNER & CONTACT DETAILS */}
        {activeTab === 'homepage' && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              try {
                await saveSiteSettings(draftSettings);
                notify('Homepage & contact settings saved to Firestore.');
              } catch (err) {
                fail(err);
              } finally {
                setBusy(false);
              }
            }}
            className="bg-white border border-black/10 p-6 sm:p-8 space-y-6"
          >
            <h2 className="font-display text-3xl font-semibold text-[#0B0B0C]">
              Homepage Content, Hero Banner &amp; Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  value={draftSettings.companyName}
                  onChange={(e) =>
                    setDraftSettings({ ...draftSettings, companyName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-neutral-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Tagline
                </label>
                <input
                  type="text"
                  value={draftSettings.tagline}
                  onChange={(e) =>
                    setDraftSettings({ ...draftSettings, tagline: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-neutral-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={draftSettings.phone}
                  onChange={(e) =>
                    setDraftSettings({ ...draftSettings, phone: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-neutral-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={draftSettings.email}
                  onChange={(e) =>
                    setDraftSettings({ ...draftSettings, email: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-neutral-300 text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Business Address
                </label>
                <input
                  type="text"
                  value={draftSettings.address}
                  onChange={(e) =>
                    setDraftSettings({ ...draftSettings, address: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-neutral-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Configurable Website Domain
                </label>
                <input
                  type="text"
                  value={draftSettings.domain}
                  onChange={(e) =>
                    setDraftSettings({ ...draftSettings, domain: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-neutral-300 text-sm"
                />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input
                  id="confirmFreeEstimates"
                  type="checkbox"
                  checked={draftSettings.confirmFreeEstimates}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      confirmFreeEstimates: e.target.checked,
                    })
                  }
                  className="w-4 h-4 accent-[#0B0B0C]"
                />
                <label htmlFor="confirmFreeEstimates" className="text-sm font-medium">
                  Confirm &ldquo;Free Estimates&rdquo; Offer Across CTAs
                </label>
              </div>
            </div>

            <div className="border-t border-black/10 pt-6 space-y-5">
              <h3 className="font-display text-2xl font-semibold">Hero Banner</h3>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Hero Main Heading
                </label>
                <input
                  type="text"
                  value={draftSettings.heroHeading}
                  onChange={(e) =>
                    setDraftSettings({ ...draftSettings, heroHeading: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-neutral-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Hero Supporting Heading
                </label>
                <input
                  type="text"
                  value={draftSettings.heroSubheading}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      heroSubheading: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 border border-neutral-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Hero Description
                </label>
                <textarea
                  rows={3}
                  value={draftSettings.heroDescription}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      heroDescription: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 border border-neutral-300 text-sm"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Hero Banner Image URL
                  </label>
                  <input
                    type="text"
                    value={draftSettings.heroImageUrl}
                    onChange={(e) =>
                      setDraftSettings({
                        ...draftSettings,
                        heroImageUrl: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 border border-neutral-300 text-sm"
                  />
                </div>
                <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-black/25 bg-[#FAFAF8] text-xs font-semibold uppercase tracking-wider cursor-pointer hover:border-[#9A7420]">
                  <Upload className="w-4 h-4" />
                  <span>Upload New Hero Image</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) {
                        handleUploadAndSet(f, 'hero', (url) =>
                          setDraftSettings((prev) => ({ ...prev, heroImageUrl: url }))
                        );
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="border-t border-black/10 pt-6 space-y-5">
              <h3 className="font-display text-2xl font-semibold">About Us Section</h3>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  About Heading
                </label>
                <input
                  type="text"
                  value={draftSettings.aboutHeading}
                  onChange={(e) =>
                    setDraftSettings({ ...draftSettings, aboutHeading: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-neutral-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  About Description
                </label>
                <textarea
                  rows={4}
                  value={draftSettings.aboutDescription}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      aboutDescription: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 border border-neutral-300 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={busy}
              className="px-7 py-3.5 bg-[#0B0B0C] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider hover:bg-[#1E1E22]"
            >
              {busy ? 'Saving...' : 'Save Homepage & Contact Settings'}
            </button>
          </form>
        )}

        {/* TAB 3: SERVICES MANAGER */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl font-semibold text-[#0B0B0C]">
                Manage Services
              </h2>
              <button
                type="button"
                onClick={() => {
                  setEditingService({
                    id: `svc-${Date.now()}`,
                    number: services.length + 1,
                    category: 'Construction Services',
                    title: '',
                    description: '',
                    benefits: ['Dedicated project coordination'],
                    imageUrl: settings.heroImageUrl,
                    featured: false,
                  });
                  setBenefitsInput('Dedicated project coordination');
                }}
                className="px-4 py-2.5 bg-[#0B0B0C] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            {editingService && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setBusy(true);
                  try {
                    await saveService({
                      ...editingService,
                      benefits: benefitsInput
                        .split('\n')
                        .map((b) => b.trim())
                        .filter(Boolean),
                    });
                    setEditingService(null);
                    notify('Service saved.');
                  } catch (err) {
                    fail(err);
                  } finally {
                    setBusy(false);
                  }
                }}
                className="bg-white border border-black/15 p-6 space-y-4"
              >
                <h3 className="font-display text-2xl font-semibold">
                  {editingService.title ? `Edit: ${editingService.title}` : 'New Service'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">
                      Number
                    </label>
                    <input
                      type="number"
                      value={editingService.number}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          number: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">
                      Category
                    </label>
                    <select
                      value={editingService.category}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 text-sm"
                    >
                      <option value="Construction Services">Construction Services</option>
                      <option value="Architecture & Design">Architecture &amp; Design</option>
                      <option value="Remodeling Services">Remodeling Services</option>
                      <option value="Exterior Services">Exterior Services</option>
                      <option value="Specialized Services">Specialized Services</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      required
                      value={editingService.title}
                      onChange={(e) =>
                        setEditingService({ ...editingService, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editingService.description}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">
                    Key Benefits (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={benefitsInput}
                    onChange={(e) => setBenefitsInput(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      required
                      value={editingService.imageUrl}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          imageUrl: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 text-sm"
                    />
                  </div>
                  <label className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-black/25 text-xs font-semibold uppercase cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>Upload Service Image</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) {
                          handleUploadAndSet(f, 'services', (url) =>
                            setEditingService((prev) =>
                              prev ? { ...prev, imageUrl: url } : null
                            )
                          );
                        }
                      }}
                    />
                  </label>
                </div>

                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={Boolean(editingService.featured)}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        featured: e.target.checked,
                      })
                    }
                  />
                  <span>Feature on Homepage</span>
                </label>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={busy}
                    className="px-6 py-2.5 bg-[#0B0B0C] text-[#D4AF37] text-xs font-semibold uppercase"
                  >
                    Save Service
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-6 py-2.5 border border-black/20 text-xs font-semibold uppercase"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="bg-white border border-black/10 p-5 flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="text-xs text-[#9A7420] font-mono tabular-nums">
                      #{svc.number} · {svc.category}
                    </div>
                    <h3 className="font-display text-xl font-semibold mt-1">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
                      {svc.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingService(svc);
                        setBenefitsInput((svc.benefits || []).join('\n'));
                      }}
                      className="px-3 py-1.5 border border-black/20 text-xs font-semibold uppercase hover:border-[#9A7420]"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        deleteService(svc.id)
                          .then(() => notify('Service deleted.'))
                          .catch(fail)
                      }
                      className="px-3 py-1.5 border border-red-200 text-red-700 text-xs font-semibold uppercase hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROJECTS & BEFORE/AFTER MANAGER */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl font-semibold text-[#0B0B0C]">
                Projects, Photos &amp; Before/After Comparisons
              </h2>
              <button
                type="button"
                onClick={() => {
                  const id = `proj-${Date.now()}`;
                  setEditingProject({
                    id,
                    slug: id,
                    title: '',
                    category: categories[0]?.name || 'Residential Construction',
                    projectStatus: 'completed',
                    location: 'Clifton, Virginia',
                    summary: '',
                    description: '',
                    scopeItems: [],
                    imageUrl: settings.heroImageUrl,
                    beforeImageUrl: '',
                    afterImageUrl: '',
                    galleryImages: [],
                  });
                  setScopeInput('');
                }}
                className="px-4 py-2.5 bg-[#0B0B0C] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            {editingProject && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setBusy(true);
                  try {
                    const slug = (editingProject.slug || editingProject.title)
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/^-|-$/g, '');
                    await saveProject({
                      ...editingProject,
                      slug: slug || editingProject.id,
                      scopeItems: scopeInput
                        .split('\n')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    });
                    setEditingProject(null);
                    notify('Project saved.');
                  } catch (err) {
                    fail(err);
                  } finally {
                    setBusy(false);
                  }
                }}
                className="bg-white border border-black/15 p-6 space-y-5"
              >
                <h3 className="font-display text-2xl font-semibold">
                  {editingProject.title ? `Edit: ${editingProject.title}` : 'New Project'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProject.title}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProject.slug}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, slug: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">
                      Category
                    </label>
                    <select
                      value={editingProject.category}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 text-sm"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">
                      Classification (Sample vs Completed)
                    </label>
                    <select
                      value={editingProject.projectStatus}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          projectStatus: e.target.value as 'sample' | 'completed',
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 text-sm"
                    >
                      <option value="sample">Sample Showcase</option>
                      <option value="completed">Completed Company Project</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold uppercase mb-1">
                      Location Label
                    </label>
                    <input
                      type="text"
                      value={editingProject.location || ''}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          location: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">
                    Short Summary *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={editingProject.summary}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, summary: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">
                    Full Project Description *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={editingProject.description}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">
                    Scope Highlights (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={scopeInput}
                    onChange={(e) => setScopeInput(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 text-sm"
                  />
                </div>

                {/* Primary, Before, and After Photograph Uploads */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-black/10 pt-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase">
                      Primary Photograph *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProject.imageUrl}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          imageUrl: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 text-xs"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 border border-black/25 text-xs font-semibold uppercase cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) {
                            handleUploadAndSet(f, 'projects', (url) =>
                              setEditingProject((prev) =>
                                prev ? { ...prev, imageUrl: url } : null
                              )
                            );
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase">
                      Before Photograph (Optional)
                    </label>
                    <input
                      type="text"
                      value={editingProject.beforeImageUrl || ''}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          beforeImageUrl: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 text-xs"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 border border-black/25 text-xs font-semibold uppercase cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Before</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) {
                            handleUploadAndSet(f, 'projects', (url) =>
                              setEditingProject((prev) =>
                                prev ? { ...prev, beforeImageUrl: url } : null
                              )
                            );
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase">
                      After Photograph (Optional)
                    </label>
                    <input
                      type="text"
                      value={editingProject.afterImageUrl || ''}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          afterImageUrl: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 text-xs"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 border border-black/25 text-xs font-semibold uppercase cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload After</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) {
                            handleUploadAndSet(f, 'projects', (url) =>
                              setEditingProject((prev) =>
                                prev ? { ...prev, afterImageUrl: url } : null
                              )
                            );
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={busy}
                    className="px-6 py-2.5 bg-[#0B0B0C] text-[#D4AF37] text-xs font-semibold uppercase"
                  >
                    Save Project
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="px-6 py-2.5 border border-black/20 text-xs font-semibold uppercase"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white border border-black/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] bg-[#141416] overflow-hidden">
                      <SafeImage
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5 space-y-2">
                      <div className="text-xs text-[#9A7420] font-semibold">
                        {proj.projectStatus === 'completed'
                          ? 'Completed Project'
                          : 'Sample Showcase'}{' '}
                        · {proj.category}
                      </div>
                      <h3 className="font-display text-xl font-semibold">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-neutral-600 line-clamp-2">
                        {proj.summary}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 pt-0 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProject(proj);
                        setScopeInput((proj.scopeItems || []).join('\n'));
                      }}
                      className="px-3 py-1.5 border border-black/20 text-xs font-semibold uppercase"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        deleteProject(proj.id)
                          .then(() => notify('Project deleted.'))
                          .catch(fail)
                      }
                      className="px-3 py-1.5 border border-red-200 text-red-700 text-xs font-semibold uppercase"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="bg-white border border-black/10 p-6 sm:p-8 space-y-6 max-w-3xl">
            <h2 className="font-display text-3xl font-semibold text-[#0B0B0C]">
              Manage Project Categories
            </h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (newCategoryName.trim().length < 2) return;
                setBusy(true);
                try {
                  const cat: ProjectCategory = {
                    id: `cat-${Date.now()}`,
                    name: newCategoryName.trim(),
                    order: categories.length + 1,
                  };
                  await saveCategory(cat);
                  setNewCategoryName('');
                  notify('Category added.');
                } catch (err) {
                  fail(err);
                } finally {
                  setBusy(false);
                }
              }}
              className="flex gap-3"
            >
              <input
                type="text"
                placeholder="New category name (e.g., Custom Millwork)"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-neutral-300 text-sm"
              />
              <button
                type="submit"
                disabled={busy}
                className="px-5 py-2.5 bg-[#0B0B0C] text-[#D4AF37] text-xs font-semibold uppercase"
              >
                Add Category
              </button>
            </form>

            <ul className="divide-y divide-black/10 border-t border-b border-black/10">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className="py-3 flex items-center justify-between text-sm"
                >
                  <span>
                    <span className="font-mono text-xs text-neutral-500 mr-3 tabular-nums">
                      {String(cat.order).padStart(2, '0')}
                    </span>
                    {cat.name}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      deleteCategory(cat.id)
                        .then(() => notify('Category removed.'))
                        .catch(fail)
                    }
                    className="text-xs text-red-700 hover:underline"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* TAB 6: CUSTOM WEBSITE PAGES */}
        {activeTab === 'pages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl font-semibold text-[#0B0B0C]">
                Add, Edit &amp; Delete Website Pages
              </h2>
              <button
                type="button"
                onClick={() => {
                  const id = `page-${Date.now()}`;
                  setEditingPage({
                    id,
                    slug: `custom-page-${pages.length + 1}`,
                    title: '',
                    subtitle: '',
                    body: '',
                    heroImageUrl: '',
                    showInNav: false,
                    showInFooter: true,
                  });
                }}
                className="px-4 py-2.5 bg-[#0B0B0C] text-[#D4AF37] text-xs font-semibold uppercase inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Page</span>
              </button>
            </div>

            {editingPage && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setBusy(true);
                  try {
                    const slug = editingPage.slug
                      .toLowerCase()
                      .replace(/[^a-z0-9-]+/g, '-')
                      .replace(/^-|-$/g, '');
                    await savePage({ ...editingPage, slug });
                    setEditingPage(null);
                    notify('Website page saved.');
                  } catch (err) {
                    fail(err);
                  } finally {
                    setBusy(false);
                  }
                }}
                className="bg-white border border-black/15 p-6 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">
                      Page Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingPage.title}
                      onChange={(e) =>
                        setEditingPage({ ...editingPage, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">
                      URL Slug (/pages/slug) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingPage.slug}
                      onChange={(e) =>
                        setEditingPage({ ...editingPage, slug: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={editingPage.subtitle || ''}
                    onChange={(e) =>
                      setEditingPage({ ...editingPage, subtitle: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">
                    Page Content *
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={editingPage.body}
                    onChange={(e) =>
                      setEditingPage({ ...editingPage, body: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 text-sm"
                  />
                </div>
                <div className="flex flex-wrap gap-6">
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={editingPage.showInNav}
                      onChange={(e) =>
                        setEditingPage({
                          ...editingPage,
                          showInNav: e.target.checked,
                        })
                      }
                    />
                    <span>Show in Header Navigation</span>
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={editingPage.showInFooter}
                      onChange={(e) =>
                        setEditingPage({
                          ...editingPage,
                          showInFooter: e.target.checked,
                        })
                      }
                    />
                    <span>Show in Footer Links</span>
                  </label>
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={busy}
                    className="px-6 py-2.5 bg-[#0B0B0C] text-[#D4AF37] text-xs font-semibold uppercase"
                  >
                    Save Page
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingPage(null)}
                    className="px-6 py-2.5 border border-black/20 text-xs font-semibold uppercase"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pages.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border border-black/10 p-5 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="font-display text-xl font-semibold">
                      {p.title}
                    </div>
                    <div className="text-xs font-mono text-neutral-500">
                      /pages/{p.slug}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingPage(p)}
                      className="px-3 py-1.5 border border-black/20 text-xs font-semibold uppercase"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        deletePage(p.id)
                          .then(() => notify('Page deleted.'))
                          .catch(fail)
                      }
                      className="px-3 py-1.5 border border-red-200 text-red-700 text-xs font-semibold uppercase"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {pages.length === 0 && (
                <div className="bg-white border border-black/10 p-8 text-sm text-neutral-600 md:col-span-2">
                  No custom pages added yet. All 18 core pages are built-in, and you
                  can add additional landing or service pages here at any time.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 7: TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl font-semibold text-[#0B0B0C]">
                Manage Testimonials
              </h2>
              <button
                type="button"
                onClick={() =>
                  setEditingTestimonial({
                    id: `test-${Date.now()}`,
                    customerName: '',
                    projectType: 'Residential Remodeling',
                    feedback: '',
                    rating: 5,
                    isSampleLayout: false,
                  })
                }
                className="px-4 py-2.5 bg-[#0B0B0C] text-[#D4AF37] text-xs font-semibold uppercase inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Verified Review</span>
              </button>
            </div>

            {editingTestimonial && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setBusy(true);
                  try {
                    await saveTestimonial(editingTestimonial);
                    setEditingTestimonial(null);
                    notify('Testimonial saved.');
                  } catch (err) {
                    fail(err);
                  } finally {
                    setBusy(false);
                  }
                }}
                className="bg-white border border-black/15 p-6 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingTestimonial.customerName}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          customerName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">
                      Project Type *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingTestimonial.projectType}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          projectType: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">
                      Star Rating (1-5)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={editingTestimonial.rating}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          rating: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">
                    Feedback *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editingTestimonial.feedback}
                    onChange={(e) =>
                      setEditingTestimonial({
                        ...editingTestimonial,
                        feedback: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 text-sm"
                  />
                </div>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={editingTestimonial.isSampleLayout}
                    onChange={(e) =>
                      setEditingTestimonial({
                        ...editingTestimonial,
                        isSampleLayout: e.target.checked,
                      })
                    }
                  />
                  <span>Mark as Placeholder / Sample Layout</span>
                </label>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={busy}
                    className="px-6 py-2.5 bg-[#0B0B0C] text-[#D4AF37] text-xs font-semibold uppercase"
                  >
                    Save Testimonial
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingTestimonial(null)}
                    className="px-6 py-2.5 border border-black/20 text-xs font-semibold uppercase"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-white border border-black/10 p-5 flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="text-xs font-semibold text-[#9A7420]">
                      {t.isSampleLayout ? 'Sample Layout' : 'Verified Client'} ·{' '}
                      {t.rating}/5 Stars
                    </div>
                    <h3 className="font-display text-xl font-semibold mt-1">
                      {t.customerName}
                    </h3>
                    <p className="text-xs text-neutral-500">{t.projectType}</p>
                    <p className="text-xs text-neutral-700 mt-2 line-clamp-3">
                      {t.feedback}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingTestimonial(t)}
                      className="px-3 py-1.5 border border-black/20 text-xs font-semibold uppercase"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        deleteTestimonial(t.id)
                          .then(() => notify('Testimonial removed.'))
                          .catch(fail)
                      }
                      className="px-3 py-1.5 border border-red-200 text-red-700 text-xs font-semibold uppercase"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: NAVIGATION, FOOTER, SOCIAL & SEO */}
        {activeTab === 'navigation_seo' && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              try {
                await saveSiteSettings(draftSettings);
                notify('SEO, navigation, social & footer settings saved.');
              } catch (err) {
                fail(err);
              } finally {
                setBusy(false);
              }
            }}
            className="bg-white border border-black/10 p-6 sm:p-8 space-y-8"
          >
            <div className="space-y-4">
              <h2 className="font-display text-3xl font-semibold text-[#0B0B0C]">
                SEO Settings
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">
                    SEO Page Title
                  </label>
                  <input
                    type="text"
                    value={draftSettings.seoTitle}
                    onChange={(e) =>
                      setDraftSettings({ ...draftSettings, seoTitle: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-neutral-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">
                    SEO Meta Description
                  </label>
                  <textarea
                    rows={2}
                    value={draftSettings.seoDescription}
                    onChange={(e) =>
                      setDraftSettings({
                        ...draftSettings,
                        seoDescription: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 border border-neutral-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">
                    SEO Keywords
                  </label>
                  <input
                    type="text"
                    value={draftSettings.seoKeywords}
                    onChange={(e) =>
                      setDraftSettings({
                        ...draftSettings,
                        seoKeywords: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 border border-neutral-300 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-black/10 pt-6 space-y-4">
              <h3 className="font-display text-2xl font-semibold">
                Social Media Links (Optional Configurable URLs)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="url"
                  placeholder="Instagram URL (https://...)"
                  value={draftSettings.socialInstagram}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      socialInstagram: e.target.value,
                    })
                  }
                  className="px-3 py-2.5 border border-neutral-300 text-sm"
                />
                <input
                  type="url"
                  placeholder="LinkedIn URL (https://...)"
                  value={draftSettings.socialLinkedIn}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      socialLinkedIn: e.target.value,
                    })
                  }
                  className="px-3 py-2.5 border border-neutral-300 text-sm"
                />
                <input
                  type="url"
                  placeholder="Facebook URL (https://...)"
                  value={draftSettings.socialFacebook}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      socialFacebook: e.target.value,
                    })
                  }
                  className="px-3 py-2.5 border border-neutral-300 text-sm"
                />
                <input
                  type="url"
                  placeholder="Houzz URL (https://...)"
                  value={draftSettings.socialHouzz}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      socialHouzz: e.target.value,
                    })
                  }
                  className="px-3 py-2.5 border border-neutral-300 text-sm"
                />
              </div>
            </div>

            <div className="border-t border-black/10 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-semibold">
                  Header Navigation Links
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    setDraftSettings({
                      ...draftSettings,
                      navLinks: [
                        ...draftSettings.navLinks,
                        { label: 'New Link', path: '/services' },
                      ],
                    })
                  }
                  className="px-3 py-1.5 border border-black/20 text-xs font-semibold uppercase"
                >
                  Add Nav Link
                </button>
              </div>
              <div className="space-y-2">
                {draftSettings.navLinks.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2">
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => {
                        const next = [...draftSettings.navLinks];
                        next[idx] = { ...next[idx], label: e.target.value };
                        setDraftSettings({ ...draftSettings, navLinks: next });
                      }}
                      className="col-span-5 px-3 py-2 border border-neutral-300 text-sm"
                    />
                    <input
                      type="text"
                      value={item.path}
                      onChange={(e) => {
                        const next = [...draftSettings.navLinks];
                        next[idx] = { ...next[idx], path: e.target.value };
                        setDraftSettings({ ...draftSettings, navLinks: next });
                      }}
                      className="col-span-5 px-3 py-2 border border-neutral-300 text-sm font-mono"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setDraftSettings({
                          ...draftSettings,
                          navLinks: draftSettings.navLinks.filter(
                            (_, i) => i !== idx
                          ),
                        })
                      }
                      className="col-span-2 border border-red-200 text-red-700 text-xs uppercase"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-black/10 pt-6 space-y-3">
              <h3 className="font-display text-2xl font-semibold">
                Footer Disclaimer Content
              </h3>
              <textarea
                rows={3}
                value={draftSettings.footerDisclaimer}
                onChange={(e) =>
                  setDraftSettings({
                    ...draftSettings,
                    footerDisclaimer: e.target.value,
                  })
                }
                className="w-full px-3 py-2.5 border border-neutral-300 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="px-7 py-3.5 bg-[#0B0B0C] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider"
            >
              {busy ? 'Saving...' : 'Save Navigation, Footer & SEO'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
