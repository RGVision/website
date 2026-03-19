import { MetadataRoute } from 'next';
import { getVillas } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use NEXTAUTH_URL as a base, or fallback to the production domain
  const baseUrl = process.env.NEXTAUTH_URL?.replace(/\/$/, '') || 'https://vorastays.in';

  const villas = await getVillas();

  const villaUrls = villas.map((villa) => ({
    url: `${baseUrl}/villas/${villa.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/villas`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  return [...staticPages, ...villaUrls];
}
