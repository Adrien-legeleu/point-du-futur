import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getRelatedArticles, getAllArticleSlugs } from '@/lib/supabase/articles';
import ArticleContent from '@/components/actualites/ArticleContent';
import ArticleShare from '@/components/actualites/ArticleShare';
import RelatedArticles from '@/components/actualites/RelatedArticles';
import ArticleHero from '@/components/actualites/ArticlesHero';

// Revalidate every 60 seconds
export const revalidate = 60;

type Props = {
  params: { slug: string };
};

// Generate static params for all articles
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

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

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // Get related articles (same category, exclude current)
  const relatedArticles = await getRelatedArticles(article.category, article.slug);

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
