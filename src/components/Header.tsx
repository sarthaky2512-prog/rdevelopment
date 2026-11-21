import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

const SERVICE_SUBPAGES = [
  { label: 'All 26 Services', path: '/services' },
  { label: 'Residential Construction', path: '/residential-construction' },
  { label: 'Commercial Construction', path: '/commercial-construction' },
  { label: 'Architecture & Design', path: '/architecture-design' },
  { label: 'Interior Design', path: '/interior-design' },
  { label: 'Exterior Design', path: '/exterior-design' },
  { label: 'Kitchen Remodeling', path: '/kitchen-remodeling' },
  { label: 'Bathroom Remodeling', path: '/bathroom-remodeling' },
  { label: 'Roofing & Exterior Services', path: '/roofing-exterior' },
];

export function Header() {
  const { settings, pages } = useSiteData();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);

  const estimateLabel = settings.confirmFreeEstimates
    ? 'Get a Free Estimate'
    : 'Request an Estimate';

  const customNavPages = pages.filter((p) => p.showInNav);

  const primaryNav = [
    ...settings.navLinks.slice(0, 6),
    ...customNavPages.map((p) => ({ label: p.title, path: `/pages/${p.slug}` })),
  ];

  // Ensure Contact Us is accessible if trimmed
  const hasContact = primaryNav.some((item) => item.path === '/contact');
  const displayNav = hasContact
    ? primaryNav
    : [...primaryNav.slice(0, 6), { label: 'Contact Us', path: '/contact' }];

  return (
    <header className="sticky top-0 z-40 bg-[#0B0B0C]/95 backdrop-blur-md text-[#FAFAF8] border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Single-element Brand Wordmark */}
        <Link
          to="/"
          className="font-display text-xl sm:text-2xl font-semibold tracking-wide text-[#FAFAF8] hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
        >
          {settings.companyName}
        </Link>

        {/* Zone 2: Concise Single-Line Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden xl:flex items-center gap-6 text-[13px] font-medium tracking-wide text-neutral-300"
        >
          {displayNav.map((item) => {
            const isActive = location.pathname === item.path;
            if (item.path === '/services') {
              return (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => setServicesMenuOpen(true)}
                  onMouseLeave={() => setServicesMenuOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setServicesMenuOpen((prev) => !prev)}
                    className={`inline-flex items-center gap-1 py-2 whitespace-nowrap shrink-0 transition-colors ${
                      isActive ? 'text-[#D4AF37]' : 'hover:text-[#FAFAF8]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {servicesMenuOpen && (
                    <div className="absolute left-0 top-full w-64 bg-[#141416] border border-white/15 py-2 shadow-2xl">
                      {SERVICE_SUBPAGES.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          onClick={() => setServicesMenuOpen(false)}
                          className={`block px-4 py-2.5 text-xs tracking-wide transition-colors ${
                            location.pathname === sub.path
                              ? 'text-[#D4AF37] bg-white/5'
                              : 'text-neutral-300 hover:text-[#FAFAF8] hover:bg-white/5'
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`py-2 whitespace-nowrap shrink-0 border-b transition-colors ${
                  isActive
                    ? 'text-[#D4AF37] border-[#D4AF37]'
                    : 'border-transparent hover:text-[#FAFAF8] hover:border-white/30'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Clickable Phone + Primary CTA */}
        <div className="hidden lg:flex items-center gap-5 shrink-0">
          <a
            href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`}
            className="inline-flex items-center gap-2 text-xs font-medium tracking-wider text-neutral-300 hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 tabular-nums"
          >
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{settings.phone}</span>
          </a>
          <Link
            to="/estimate"
            className="px-5 py-2.5 bg-[#D4AF37] text-[#0B0B0C] text-xs font-semibold uppercase tracking-wider hover:bg-[#C59B40] transition-colors whitespace-nowrap shrink-0"
          >
            {estimateLabel}
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex xl:hidden items-center gap-3">
          <a
            href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`}
            aria-label={`Call ${settings.companyName}`}
            className="lg:hidden p-2.5 text-[#D4AF37] hover:text-[#FAFAF8] transition-colors"
          >
            <Phone className="w-5 h-5" />
          </a>
          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="p-2.5 text-[#FAFAF8] hover:text-[#D4AF37] transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="xl:hidden bg-[#0B0B0C] border-t border-white/10 max-h-[80vh] overflow-y-auto px-6 py-6 space-y-5">
          <nav aria-label="Mobile Navigation" className="grid grid-cols-1 gap-2">
            {settings.navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`py-2.5 text-sm font-medium border-b border-white/5 ${
                  location.pathname === item.path ? 'text-[#D4AF37]' : 'text-neutral-200'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 pb-1 text-xs uppercase tracking-widest text-neutral-500">
              Specialty Trades &amp; Design
            </div>
            {SERVICE_SUBPAGES.slice(3).map((sub) => (
              <Link
                key={sub.path}
                to={sub.path}
                onClick={() => setMobileOpen(false)}
                className="py-2 pl-3 text-sm text-neutral-300 hover:text-[#D4AF37]"
              >
                {sub.label}
              </Link>
            ))}
            {customNavPages.map((page) => (
              <Link
                key={page.id}
                to={`/pages/${page.slug}`}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-sm text-neutral-300 hover:text-[#D4AF37]"
              >
                {page.title}
              </Link>
            ))}
            <Link
              to="/faq"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-sm text-neutral-300 hover:text-[#D4AF37]"
            >
              FAQ
            </Link>
          </nav>

          <div className="pt-3 flex flex-col gap-3">
            <a
              href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`}
              className="inline-flex items-center justify-center gap-2 py-3 border border-white/20 text-sm text-[#FAFAF8]"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>{settings.phone}</span>
            </a>
            <Link
              to="/estimate"
              onClick={() => setMobileOpen(false)}
              className="text-center py-3 bg-[#D4AF37] text-[#0B0B0C] text-xs font-semibold uppercase tracking-wider"
            >
              {estimateLabel}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
