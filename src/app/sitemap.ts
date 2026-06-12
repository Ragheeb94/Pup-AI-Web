import { MetadataRoute } from 'next'
import { breeds } from '@/data/breeds'
import { getAllPosts } from '@/lib/blog'

const BASE_URL = 'https://pupai.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/breeds`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/scan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ]
  const breedRoutes: MetadataRoute.Sitemap = breeds.map(b => ({
    url: `${BASE_URL}/breeds/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map(p => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))
  return [...staticRoutes, ...breedRoutes, ...blogRoutes]
}
