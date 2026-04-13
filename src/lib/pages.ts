import homeFile from "../../content/home.json";
import galleryFile from "../../content/gallery.json";
import articlesFile from "../../content/articles.json";
import kurumsalFile from "../../content/kurumsal.json";
import brandsFile from "../../content/brands.json";
import type {
  HomePageContent,
  GalleryFile,
  ArticlesFile,
  KurumsalPageContent,
  BrandsFile,
  ArticleItem,
} from "@/types/content";

export function getHomeContent(): HomePageContent {
  return homeFile as HomePageContent;
}

export function getGallery(): GalleryFile {
  return galleryFile as GalleryFile;
}

export function getArticlesFile(): ArticlesFile {
  return articlesFile as ArticlesFile;
}

export function getArticles(): ArticleItem[] {
  return (articlesFile as ArticlesFile).articles;
}

export function getHomeFeaturedArticles(limit: number): ArticleItem[] {
  const all = getArticles().filter((a) => a.showOnHome !== false);
  return all.slice(0, limit);
}

export function getKurumsalContent(): KurumsalPageContent {
  return kurumsalFile as KurumsalPageContent;
}

export function getBrandsContent(): BrandsFile {
  return brandsFile as BrandsFile;
}
