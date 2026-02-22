/**
 * Business Configuration
 * ─────────────────────
 * Single source of truth for all client-specific business details.
 * Update this file when deploying for a real client — every template
 * and component pulls from here.
 */

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface BusinessConfig {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    stateAbbr: string;
    zip: string;
    country: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  serviceArea: string[];
  hours: BusinessHours[];
  social: SocialLink[];
  founded: number;
  certifications: string[];
}

const business: BusinessConfig = {
  name: "Paws & Polish Pet Grooming",
  tagline: "Where every pet leaves looking pawfect",
  description:
    "Professional pet grooming services for dogs and cats. Certified groomers, gentle handling, and a stress-free experience your pet will love.",
  phone: "(555) 123-4567",
  email: "hello@pawsandpolish.com",

  address: {
    street: "123 Main Street",
    city: "Manteca",
    state: "California",
    stateAbbr: "CA",
    zip: "95337",
    country: "US",
  },

  coordinates: {
    lat: 37.8063,
    lng: -121.2161,
  },

  serviceArea: ["Manteca", "Lathrop", "Ripon", "Escalon", "Tracy", "Stockton"],

  hours: [
    { day: "Monday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Tuesday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Wednesday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Thursday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Friday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Saturday", open: "9:00 AM", close: "4:00 PM" },
    { day: "Sunday", open: "9:00 AM", close: "4:00 PM", closed: true },
  ],

  social: [
    {
      platform: "Facebook",
      url: "https://facebook.com/pawsandpolish",
      label: "Follow us on Facebook",
    },
    {
      platform: "Instagram",
      url: "https://instagram.com/pawsandpolish",
      label: "Follow us on Instagram",
    },
    {
      platform: "Google",
      url: "https://g.page/pawsandpolish",
      label: "Find us on Google",
    },
  ],

  founded: 2020,
  certifications: [
    "National Dog Groomers Association of America (NDGAA)",
    "International Professional Groomers Inc. (IPG)",
    "Pet First Aid & CPR Certified",
  ],
};

export default business;
