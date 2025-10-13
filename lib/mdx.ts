import path from 'path';
import { promises as fs } from 'fs';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { ReactElement } from 'react';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

type Reference = {
  label: string;
  url: string;
};

export type MdxMeta = {
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  author?: string;
  readingTime: string;
  wordCount: number;
  toc?: { id: string; title: string }[];
  references?: Reference[];
};

export type MdxDocument = {
  slug: string;
  meta: MdxMeta;
  content: ReactElement;
};

type Frontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  tags?: string[];
  author?: string;
  toc?: { id: string; title: string }[];
  references?: Reference[];
};

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-16 scroll-mt-24 font-display text-3xl leading-tight"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-10 scroll-mt-24 font-display text-2xl" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-base leading-relaxed text-[var(--ink-dim)]" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 text-[var(--ink-dim)]" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 text-[var(--ink-dim)]" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-[var(--nar)]/40 pl-4 italic text-[var(--ink)]"
      {...props}
    />
  ),
};

function mdxDir(type: 'science' | 'blog') {
  return path.join(process.cwd(), 'content', type);
}

async function readMdxFile(type: 'science' | 'blog', slug: string) {
  const filePath = path.join(mdxDir(type), `${slug}.mdx`);
  const source = await fs.readFile(filePath, 'utf-8');
  return source;
}

function calculateReadingTime(source: string): { readingTime: string; wordCount: number } {
  const words = source.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 190));
  return {
    readingTime: `${minutes} min read`,
    wordCount: words,
  };
}

async function compileMdx(type: 'science' | 'blog', slug: string): Promise<MdxDocument> {
  const source = await readMdxFile(type, slug);
  const { data } = matter(source);
  const { readingTime, wordCount } = calculateReadingTime(source);

  const compiled = await compileMDX<Frontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: ['heading-anchor'],
              },
            },
          ],
        ],
      },
    },
    components: mdxComponents,
  });

  const frontmatter = compiled.frontmatter as Frontmatter;

  return {
    slug,
    meta: {
      title: frontmatter.title,
      description: frontmatter.description,
      publishedAt: frontmatter.publishedAt,
      tags: frontmatter.tags ?? [],
      author: frontmatter.author,
      readingTime,
      wordCount,
      toc: frontmatter.toc,
      references: frontmatter.references,
    },
    content: compiled.content,
  };
}

async function listMdx(type: 'science' | 'blog') {
  const directory = mdxDir(type);
  const entries = await fs.readdir(directory);
  const slugged = entries
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace('.mdx', ''));

  const documents = await Promise.all(slugged.map((slug) => compileMdx(type, slug)));
  return documents.sort(
    (a, b) => new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime()
  );
}

export async function getScienceArticles() {
  return listMdx('science');
}

export async function getScienceArticle(slug: string) {
  return compileMdx('science', slug);
}

export async function getBlogPosts() {
  return listMdx('blog');
}

export async function getBlogArticle(slug: string) {
  return compileMdx('blog', slug);
}
