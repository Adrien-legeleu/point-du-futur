'use client';

import { motion } from 'framer-motion';
import type { Article } from '@/lib/supabase/articles';

interface ArticleContentProps {
  article: Article;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg max-w-none"
        >
          {/* Excerpt */}
          <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium">
            {article.excerpt}
          </p>

          {/* Content */}
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </motion.div>

        {/* Author card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-gray-50 rounded-[2rem] border border-gray-100"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-accent-600/10 flex items-center justify-center text-3xl">
              {article.author.avatar || '👤'}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Article rédigé par</p>
              <p className="text-xl font-bold text-gray-900">
                {article.author.name}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Styles for article content */}
      <style jsx global>{`
        .article-content h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #111827;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .article-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .article-content p {
          color: #4b5563;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }

        .article-content ul,
        .article-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
          color: #4b5563;
        }

        .article-content li {
          margin-bottom: 0.75rem;
          line-height: 1.8;
        }

        .article-content strong {
          color: #111827;
          font-weight: 600;
        }

        .article-content blockquote {
          border-left: 4px solid #2563eb;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #4b5563;
        }

        .article-content blockquote cite {
          display: block;
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: #6b7280;
          font-style: normal;
        }

        .article-content a {
          color: #2563eb;
          text-decoration: underline;
          transition: color 0.2s;
        }

        .article-content a:hover {
          color: #1d4ed8;
        }
      `}</style>
    </section>
  );
}
