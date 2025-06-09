import { fetchBeehiivPosts } from '@/lib/fetchBeehiivPosts';

interface BeehiivPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

export default async function BlogSection() {
  const posts: BeehiivPost[] = await fetchBeehiivPosts('https://rss.beehiiv.com/feeds/EiaFGtMMhr.xml', 5);

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container px-4">
        <h2 className="text-3xl font-bold mb-8">Latest from Our Beehiiv Blog</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <a key={post.link} href={post.link} target="_blank" rel="noopener noreferrer" className="block p-6 border rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-muted-foreground mb-2" dangerouslySetInnerHTML={{ __html: post.description }} />
              <span className="text-xs text-gray-500">{new Date(post.pubDate).toLocaleDateString()}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
} 