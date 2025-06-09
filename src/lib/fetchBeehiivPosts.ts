import { XMLParser } from 'fast-xml-parser';

export interface BeehiivPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

export async function fetchBeehiivPosts(rssUrl: string, limit = 5): Promise<BeehiivPost[]> {
  const res = await fetch(rssUrl, { next: { revalidate: 3600 } }); // cache for 1 hour
  if (!res.ok) throw new Error('Failed to fetch Beehiiv RSS feed');
  const xml = await res.text();
  const parser = new XMLParser();
  const json = parser.parse(xml);

  // RSS structure: rss.channel.item[]
  const items = (json.rss?.channel?.item || []) as Array<Partial<BeehiivPost>>;
  return items.slice(0, limit).map((item) => ({
    title: item.title ?? '',
    link: item.link ?? '',
    pubDate: item.pubDate ?? '',
    description: item.description ?? '',
  }));
} 