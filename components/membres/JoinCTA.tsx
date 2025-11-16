import Link from 'next/link';

export default function JoinCTA() {
  return (
    <div className="bg-gradient-to-r from-primary-500 to-accent-500 py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Rejoignez notre communauté
        </h2>
        <p className="text-xl text-white/90 mb-8">
          Vous êtes jeune issu des classes populaires ou étudiant étranger ?
          Rejoignez Pont du Futur !
        </p>
        <Link href="/contact">
          <button className="px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
            Devenir membre
          </button>
        </Link>
      </div>
    </div>
  );
}
