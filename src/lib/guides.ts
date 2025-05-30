import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const guidesDirectory = path.join(process.cwd(), 'src/guides');

export interface GuideData {
  slug: string; // This will be the frontmatter slug (e.g., "bali-bliss")
  id: string; // Filename stem, e.g., "bali"
  title: string;
  description: string;
  image: string;
  icon: string;
  contentHtml: string;
  [key: string]: any; 
}

export async function getAllGuidesData(): Promise<GuideData[]> {
  const fileNames = fs.readdirSync(guidesDirectory);
  const allGuidesData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(guidesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        const processedContent = await remark()
          .use(html)
          .process(matterResult.content || ''); // Handle potentially undefined content
        const contentHtml = processedContent.toString();

        const guideEntry: GuideData = {
          id: id,
          slug: matterResult.data.slug || id, // Fallback to id if frontmatter slug is missing
          title: matterResult.data.title || 'Untitled Guide',
          description: matterResult.data.description || 'No description available.',
          image: matterResult.data.image || '/placeholder-image.jpg', // Default placeholder
          icon: matterResult.data.icon || 'MapPin', // Default icon
          contentHtml,
          ...matterResult.data, // Spread other frontmatter data (ensures original slug is preserved if different)
        };
        // Ensure the slug used for routing is the one from frontmatter if it exists
        guideEntry.slug = matterResult.data.slug || id; 
        return guideEntry;
      })
  );

  return allGuidesData.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    } else {
      return 1;
    }
  });
}

export async function getGuideData(slug: string): Promise<GuideData | null> {
  // slug here is the frontmatter slug, e.g., "bali-bliss"
  const fileNames = fs.readdirSync(guidesDirectory);
  let foundFileName: string | undefined;

  for (const fileName of fileNames) {
    if (!fileName.endsWith('.md')) continue;

    const fullPath = path.join(guidesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // Match against the frontmatter slug, or filename stem if frontmatter slug is missing
    const fileSlug = matterResult.data.slug || fileName.replace(/\.md$/, '');
    if (fileSlug === slug) {
      foundFileName = fileName;
      break;
    }
  }

  if (!foundFileName) {
    // If no file matches the slug (either frontmatter or filename stem), return null
    // This will be handled by notFound() in the page component
    console.warn(`Guide with slug "${slug}" not found.`);
    return null; 
  }

  const fullPath = path.join(guidesDirectory, foundFileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content || ''); // Handle potentially undefined content
  const contentHtml = processedContent.toString();

  const id = foundFileName.replace(/\.md$/, '');

  const guideEntry: GuideData = {
    slug: matterResult.data.slug || id, // Use frontmatter slug, fallback to id
    id: id, // Filename stem
    contentHtml,
    title: matterResult.data.title || 'Untitled Guide',
    description: matterResult.data.description || 'No description available.',
    image: matterResult.data.image || '/placeholder-image.jpg',
    icon: matterResult.data.icon || 'MapPin',
    ...matterResult.data,
  };
  return guideEntry;
}
