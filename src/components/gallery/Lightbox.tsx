/**
 * Lightbox — Accessible, keyboard-navigable image lightbox
 *
 * Features:
 * - Escape key to close
 * - Arrow keys to navigate
 * - Click overlay to close
 * - Focus trap
 * - Body scroll lock
 * - Swipe support on mobile
 * - Smooth transitions
 */
import { useCallback, useEffect, useRef, useState } from "react";

export interface LightboxImage {
  src: string;
  alt: string;
  title?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoaded, setIsLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Reset index when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsLoaded(false);
    }
  }, [isOpen, initialIndex]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  const goNext = useCallback(() => {
    setIsLoaded(false);
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setIsLoaded(false);
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation + focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          goNext();
          break;
        case "ArrowLeft":
          goPrev();
          break;
        case "Tab": {
          // Focus trap: cycle through interactive elements inside the lightbox
          const dialog = overlayRef.current;
          if (!dialog) break;
          const focusable = dialog.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
          if (focusable.length === 0) break;
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
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, goNext, goPrev]);

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
  };

  if (!isOpen || images.length === 0) return null;

  const current = images[currentIndex];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Image gallery, showing image ${currentIndex + 1} of ${images.length}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Close lightbox"
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

      {/* Counter */}
      <div className="absolute left-4 top-4 z-10 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 sm:left-6"
          aria-label="Previous image"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      )}

      {/* Image */}
      <div className="relative flex max-h-[85vh] max-w-[90vw] items-center justify-center sm:max-w-[80vw]">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          </div>
        )}
        <img
          src={current.src}
          alt={current.alt}
          className={`max-h-[85vh] rounded-lg object-contain transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
          draggable={false}
        />
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 sm:right-6"
          aria-label="Next image"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      )}

      {/* Caption */}
      {current.title && (
        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm">
          {current.title}
        </div>
      )}
    </div>
  );
}
