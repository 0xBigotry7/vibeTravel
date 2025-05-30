import { MetadataRoute } from 'next';
import { getAllGuidesData } from '@/lib/guides'; // Adjust import path as needed

const NEXT_PUBLIC_BASE_URL = 'https://www.vibetravel.club'; // Placeholder

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const guides = await getAllGuidesData(); 
  const guideEntries: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${NEXT_PUBLIC_BASE_URL}/guides/${guide.slug}`,
    lastModified: new Date(), // Or a specific date from frontmatter if available
  }));

  return [
    {
      url: `${NEXT_PUBLIC_BASE_URL}/`,
      lastModified: new Date(),
    },
    // Add other static pages here if they exist e.g.
    // {
    //   url: `${NEXT_PUBLIC_BASE_URL}/about`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `${NEXT_PUBLIC_BASE_URL}/contact`,
    //   lastModified: new Date(),
    // },
    ...guideEntries,
  ];
}
