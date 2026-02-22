/**
 * GalleryGrid — Masonry-style image grid with lightbox integration
 *
 * Renders gallery images in a responsive grid and opens a lightbox on click.
 * Accessible: all images are focusable and triggerable via Enter/Space.
 */
import { useState } from "react";
import Lightbox from "./Lightbox";
import type { LightboxImage } from "./Lightbox";

interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  category: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

const categoryLabels: Record<string, string> = {
  all: "All",
  dogs: "Dogs",
  cats: "Cats",
  "before-after": "Before & After",
  salon: "Our Salon",
};

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");

  // Determine available categories from data
  const categories = [
    "all",
    ...Array.from(new Set(items.map((i) => i.category))),
  ];

  const filteredItems =
    activeFilter === "all"
      ? items
      : items.filter((i) => i.category === activeFilter);

  const lightboxImages: LightboxImage[] = filteredItems.map((item) => ({
    src: item.src,
    alt: item.alt,
    title: item.title,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Category filters */}
      <div
        className="mb-10 flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filter gallery by category"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              activeFilter === cat
                ? "bg-primary-600 text-white shadow-md shadow-primary-600/20"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
            aria-pressed={activeFilter === cat}
          >
            {categoryLabels[cat] || cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        id="gallery-grid"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        aria-live="polite"
      >
        {filteredItems.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            type="button"
            onClick={() => openLightbox(index)}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-neutral-900/10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label={`View ${item.title} — ${item.alt}`}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="eager"
              decoding="async"
            />
            {/* Hover overlay with title */}
            <div className="absolute inset-0 flex flex-col items-center justify-end bg-linear-to-t from-black/60 via-black/0 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100">
              <p className="text-sm font-semibold text-white drop-shadow-md">
                {item.title}
              </p>
              <p className="mt-0.5 text-xs text-white/70">
                {categoryLabels[item.category] || item.category}
              </p>
            </div>
            {/* Zoom icon hint */}
            <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-neutral-700 opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filteredItems.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-neutral-400">No images in this category yet.</p>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
