import { useState, useEffect, useRef, useCallback } from "react";
import { mainNav, ctaLink } from "../../config/navigation";
import type { TenantConfig } from "../../config/business";

/**
 * Header — Refined navigation with editorial typography.
 * Receives tenant data as a prop so it works across all subdomains.
 */
export default function Header({ tenant }: { tenant: TenantConfig }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!menuOpen || !mobileMenuRef.current) return;

    const panel = mobileMenuRef.current;
    const handleTrapKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    // Focus first focusable element in the menu
    const firstFocusable = panel.querySelector<HTMLElement>(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    firstFocusable?.focus();

    panel.addEventListener("keydown", handleTrapKey);
    return () => panel.removeEventListener("keydown", handleTrapKey);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = useCallback(() => setMenuOpen(false), []);

  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "/";

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden bg-primary-800 text-primary-200 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-xs tracking-wide">
          <span>
            {tenant.address.street}, {tenant.address.city},{" "}
            {tenant.address.stateAbbr} {tenant.address.zip}
          </span>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${tenant.phone.replace(/[^+\d]/g, "")}`}
              className="text-primary-200 no-underline transition-colors hover:text-white"
            >
              {tenant.phone}
            </a>
            <span className="h-3 w-px bg-primary-600" aria-hidden="true" />
            <a
              href={`mailto:${tenant.email}`}
              className="text-primary-200 no-underline transition-colors hover:text-white"
            >
              {tenant.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? "border-neutral-200/80 bg-white/95 shadow-sm backdrop-blur-md"
            : "border-transparent bg-white"
        }`}
        role="banner"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Wordmark */}
          <a
            href="/"
            className="group flex items-center gap-2.5 no-underline"
            aria-label={`${tenant.name} — Home`}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 transition-colors group-hover:bg-primary-500">
              <svg
                className="h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <circle cx="7" cy="5" r="2.5" />
                <circle cx="17" cy="5" r="2.5" />
                <circle cx="4" cy="12" r="2.5" />
                <circle cx="20" cy="12" r="2.5" />
                <ellipse cx="12" cy="17" rx="5" ry="4" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl font-bold tracking-tight text-dark">
                {tenant.name}
              </span>
              <span className="mt-0.5 hidden text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400 sm:block">
                Pet Grooming
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="Main navigation"
          >
            {mainNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-2 text-[13px] font-medium tracking-wide uppercase transition-colors ${
                  currentPath === item.href
                    ? "text-primary-600"
                    : "text-neutral-600 hover:text-dark"
                }`}
                aria-current={currentPath === item.href ? "page" : undefined}
              >
                {item.label}
                {currentPath === item.href && (
                  <span className="absolute bottom-0.5 left-3.5 right-3.5 h-0.5 rounded-full bg-accent-400" />
                )}
              </a>
            ))}
            <a
              href={ctaLink.href}
              className="ml-4 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-[13px] font-semibold tracking-wide text-white transition-all hover:bg-primary-500 active:scale-[0.97]"
            >
              {ctaLink.label}
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg text-dark transition-colors hover:bg-neutral-100 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <div className="flex w-5 flex-col items-end gap-1.25">
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "w-5 translate-y-1.75 rotate-45" : "w-5"}`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-3.5"}`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "w-5 -translate-y-1.75 -rotate-45" : "w-4"}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-40 bg-dark/50 backdrop-blur-sm lg:hidden"
            onClick={close}
            aria-hidden="true"
          />
        )}

        {/* Mobile panel */}
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className={`fixed right-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal={menuOpen}
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
            <span className="font-display text-lg font-bold text-dark">
              Menu
            </span>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100"
              onClick={close}
              aria-label="Close menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav
            className="flex-1 overflow-y-auto px-3 py-4"
            aria-label="Mobile navigation"
          >
            {mainNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between rounded-lg px-4 py-3 text-[15px] font-medium transition-colors ${
                  currentPath === item.href
                    ? "bg-primary-50 text-primary-600"
                    : "text-dark hover:bg-neutral-50"
                }`}
                aria-current={currentPath === item.href ? "page" : undefined}
                onClick={close}
              >
                {item.label}
                <svg
                  className="h-4 w-4 text-neutral-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </a>
            ))}
          </nav>

          <div className="border-t border-neutral-100 p-5">
            <a
              href={ctaLink.href}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-500 active:scale-[0.97]"
              onClick={close}
            >
              {ctaLink.label}
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
            <div className="mt-4 flex items-center gap-3 text-sm text-neutral-500">
              <svg
                className="h-4 w-4 shrink-0 text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              <a
                href={`tel:${tenant.phone.replace(/[^+\d]/g, "")}`}
                className="text-neutral-600 no-underline hover:text-primary-600"
              >
                {tenant.phone}
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
