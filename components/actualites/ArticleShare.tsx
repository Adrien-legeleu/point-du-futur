'use client';

import { motion } from 'framer-motion';
import {
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Check,
} from 'lucide-react';
import { useState } from 'react';
import type { Article } from '@/lib/types';

interface ArticleShareProps {
  article: Article;
}

export default function ArticleShare({ article }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://pontdufutur.org/actualites/${article.slug}`;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(article.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const socialButtons = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: shareLinks.facebook,
      color: 'hover:bg-blue-600',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: shareLinks.twitter,
      color: 'hover:bg-sky-500',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: shareLinks.linkedin,
      color: 'hover:bg-blue-700',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2rem] p-8 shadow-lg border border-gray-100"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Partager cet article
            </h3>
            <p className="text-gray-600">
              Aide-nous à diffuser nos actualités !
            </p>
          </div>

          {/* Social buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {socialButtons.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-3 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold transition-all ${social.color} hover:text-white`}
                >
                  <Icon className="w-5 h-5" />
                  {social.name}
                </motion.a>
              );
            })}

            {/* Copy link button */}
            <motion.button
              onClick={copyToClipboard}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all ${
                copied
                  ? 'bg-future text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copié !
                </>
              ) : (
                <>
                  <LinkIcon className="w-5 h-5" />
                  Copier le lien
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
