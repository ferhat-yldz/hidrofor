import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type ServiceIconKey =
  | "activity"
  | "droplet"
  | "target"
  | "award"
  | "zap"
  | "clock"
  | "wrench"
  | "waves"
  | "shieldCheck"
  | "shield"
  | "gauge";

export type ServiceRecord = {
  title: string;
  slug: string;
  description: string;
  content: string;
  iconKey: ServiceIconKey;
  /** Tailwind text color class for the Lucide icon (e.g. text-blue-500, text-fire-red) */
  iconColorClass: string;
  color: string;
  accent: string;
  image: string;
  detailImage: string;
};

export type ServicesFile = {
  services: ServiceRecord[];
};

export type ServiceWithIcon = Omit<ServiceRecord, "iconKey" | "iconColorClass"> & {
  icon: ReactNode;
};

export type FaqItem = { q: string; a: string };
export type ReviewItem = { name: string; body: string; rating: number; location?: string };

export type SiteContent = {
  contact: {
    phoneE164: string;
    phoneDisplay: string;
    email: string;
    whatsappE164: string;
    whatsappMessage: string;
    addressLabel: string;
    mapsQuery: string;
  };
  topBar: {
    text: string;
    callToActionLabel: string;
  };
  agency: {
    nameLine: string;
    nameHighlight: string;
    tagline: string;
    phoneE164: string;
    phoneDisplay: string;
    email: string;
    address: string;
  };
  faqs: FaqItem[];
  reviews: ReviewItem[];
};

export type HomePageContent = {
  hero: {
    badgeText: string;
    titleLine1: string;
    titleHighlight: string;
    titleLine2: string;
    titleLine3: string;
    heroImage: string;
    heroImageAlt: string;
    heroCaption: string;
    floatingStatValue: string;
    floatingStatLabel: string;
  };
  heroSubtitle: string;
  trustBadges: { metin: string }[];
  hakkimizda: {
    eyebrow: string;
    title: string;
    description: string;
    bullets: { metin: string }[];
    ctaText: string;
  };
  bolgeler: {
    title: string;
    description: string;
    cards: { title: string; description: string }[];
  };
  hizmetlerBaslik: { eyebrow: string; title: string };
  galeriBaslik: { eyebrow: string; title: string };
  galeriKart: { varsayilanEtiket: string };
  hizmetKartCta: string;
  testimonials: {
    title: string;
    subtitle: string;
    backgroundImageUrl: string;
  };
  bilgiKosesi: {
    eyebrow: string;
    title: string;
    linkText: string;
    anasayfaKartSayisi: number;
  };
  sssBolumu: { baslik: string; altBaslik: string };
};

export type GalleryItem = { image: string; title: string; tag: string };
export type GalleryFile = { items: GalleryItem[] };

export type ArticleItem = {
  id: string;
  category: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  showOnHome?: boolean;
};

export type ArticlesFile = { articles: ArticleItem[] };

export type KurumsalPageContent = {
  hero: { backgroundImage: string; title: string; subtitle: string };
  founder: {
    image: string;
    imageAlt: string;
    badge: string;
    name: string;
    role: string;
  };
  hikaye: {
    baslik: string;
    girisParagrafi: string;
    alinti: string;
    kapanisParagrafi: string;
  };
  istatistikler: { deger: string; etiket: string }[];
};

export type BrandRow = {
  ad: string;
  iconKey: ServiceIconKey;
  renkSinifi: string;
  italik?: boolean;
};

export type BrandsFile = { bolumEtiketi: string; markalar: BrandRow[] };

export type ServiceIconMap = Record<ServiceIconKey, LucideIcon>;
