import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { mockArticles } from '@/lib/articles-data';
import ArticleContent from '@/components/actualites/ArticleContent';
import ArticleShare from '@/components/actualites/ArticleShare';
import RelatedArticles from '@/components/actualites/RelatedArticles';
import ArticleHero from '@/components/actualites/ArticlesHero';

type Props = {
  params: { slug: string };
};

// Generate static params for all articles
export async function generateStaticParams() {
  return mockArticles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = mockArticles.find((a) => a.slug === params.slug);

  if (!article) {
    return {
      title: 'Article non trouvé',
    };
  }

  return {
    title: `${article.title} | Pont du Futur`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://pontdufutur.org/actualites/${article.slug}`,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
    alternates: {
      canonical: `https://pontdufutur.org/actualites/${article.slug}`,
    },
  };
}

export default function ArticlePage({ params }: Props) {
  const article = mockArticles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  // Find related articles (same category, exclude current)
  const relatedArticles = mockArticles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <>
      <ArticleHero article={article} />
      <ArticleContent article={article} />
      <ArticleShare article={article} />
      {relatedArticles.length > 0 && (
        <RelatedArticles articles={relatedArticles} />
      )}
    </>
  );
}
