import { getAllGuidesData, getGuideData, GuideData } from '@/lib/guides';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const guides = await getAllGuidesData();
  return guides.map((guide) => ({
    slug: guide.slug, // This slug comes from frontmatter (or filename if frontmatter slug is missing)
  }));
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata // parent is available for more complex metadata merging if needed
): Promise<Metadata> {
  const { slug } = params;
  const guide = await getGuideData(slug);

  if (!guide) {
    // If guide is not found by getGuideData (which now returns null for not found),
    // return metadata suitable for a 404 page or a generic error.
    return {
      title: "Guide Not Found - VibeTravel.club",
      description: "The travel guide you are looking for does not exist.",
    };
  }

  return {
    title: `${guide.title} - VibeTravel.club`,
    description: guide.description,
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = params;
  const guideData = await getGuideData(slug);

  if (!guideData) {
    // This will trigger the nearest not-found.js file or a default Next.js 404 page.
    notFound(); 
  }

  // At this point, guideData is guaranteed to be non-null.
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button asChild variant="outline">
          <Link href="/#guides">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Guides
          </Link>
        </Button>
      </div>
      <article className="prose lg:prose-xl max-w-none">
        <h1>{guideData.title}</h1>
        {guideData.image && (
          <div className="relative h-96 w-full mb-8">
            <Image
              src={guideData.image}
              alt={guideData.title}
              fill
              priority // Keep priority for LCP images if this is often above the fold
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: guideData.contentHtml }} />
      </article>
    </div>
  );
}
