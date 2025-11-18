import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales | Pont du Futur',
  description: "Mentions légales de l'association Pont du Futur",
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-zinc-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mentions Légales
          </h1>
          <p className="text-gray-600">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm space-y-8">
          {/* Éditeur du site */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Éditeur du site
            </h2>
            <div className="text-gray-700 space-y-2">
              <p>
                <strong>Raison sociale :</strong> Association Pont du Futur
              </p>
              <p>
                <strong>Forme juridique :</strong> Association loi 1901
              </p>
              <p>
                <strong>Siège social :</strong> [Adresse complète]
              </p>
              <p>
                <strong>Email :</strong>{' '}
                <a
                  href="mailto:contact@pontdufutur.org"
                  className="text-primary-600 hover:underline"
                >
                  contact@pontdufutur.org
                </a>
              </p>
              <p>
                <strong>Téléphone :</strong> [Numéro de téléphone]
              </p>
              <p>
                <strong>Numéro RNA :</strong> [Numéro RNA]
              </p>
              <p>
                <strong>Directeur de la publication :</strong> [Nom du
                Président]
              </p>
            </div>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Hébergement du site
            </h2>
            <div className="text-gray-700 space-y-2">
              <p>
                <strong>Hébergeur :</strong> Vercel Inc.
              </p>
              <p>
                <strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA
                91723, États-Unis
              </p>
              <p>
                <strong>Site web :</strong>{' '}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  vercel.com
                </a>
              </p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Propriété intellectuelle
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                L'ensemble du contenu de ce site (textes, images, vidéos, logos,
                éléments graphiques) est la propriété exclusive de l'association
                Pont du Futur ou de ses partenaires.
              </p>
              <p>
                Toute reproduction, distribution, modification, adaptation,
                retransmission ou publication de ces différents éléments est
                strictement interdite sans l'accord écrit de Pont du Futur.
              </p>
            </div>
          </section>

          {/* Protection des données */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Protection des données personnelles
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                Conformément au Règlement Général sur la Protection des Données
                (RGPD) et à la loi Informatique et Libertés, vous disposez d'un
                droit d'accès, de rectification, de suppression et d'opposition
                aux données personnelles vous concernant.
              </p>
              <p>
                Les informations collectées via les formulaires du site sont
                destinées à l'usage exclusif de Pont du Futur et ne seront en
                aucun cas cédées à des tiers.
              </p>
              <p>
                Pour exercer vos droits, vous pouvez nous contacter à l'adresse
                suivante :{' '}
                <a
                  href="mailto:contact@pontdufutur.org"
                  className="text-primary-600 hover:underline"
                >
                  contact@pontdufutur.org
                </a>
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Cookies
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                Ce site utilise des cookies techniques nécessaires à son bon
                fonctionnement. Ces cookies ne collectent aucune donnée
                personnelle et ne nécessitent pas votre consentement.
              </p>
              <p>
                Vous pouvez à tout moment désactiver les cookies dans les
                paramètres de votre navigateur.
              </p>
            </div>
          </section>

          {/* Responsabilité */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Limitation de responsabilité
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                L'association Pont du Futur s'efforce d'assurer l'exactitude et
                la mise à jour des informations diffusées sur ce site.
                Toutefois, elle ne peut garantir l'exactitude, la précision ou
                l'exhaustivité des informations mises à disposition.
              </p>
              <p>
                En conséquence, Pont du Futur décline toute responsabilité pour
                toute imprécision, inexactitude ou omission portant sur des
                informations disponibles sur le site.
              </p>
            </div>
          </section>

          {/* Liens externes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Liens hypertextes
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                Le site peut contenir des liens hypertextes vers d'autres sites.
                Pont du Futur n'exerce aucun contrôle sur ces sites et décline
                toute responsabilité quant à leur contenu.
              </p>
            </div>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Droit applicable
            </h2>
            <div className="text-gray-700 space-y-3">
              <p>
                Les présentes mentions légales sont régies par le droit
                français. En cas de litige, les tribunaux français seront seuls
                compétents.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Contact
            </h2>
            <div className="text-gray-700 space-y-2">
              <p>
                Pour toute question concernant les mentions légales, vous pouvez
                nous contacter :
              </p>
              <p>
                <strong>Email :</strong>{' '}
                <a
                  href="mailto:contact@pontdufutur.org"
                  className="text-primary-600 hover:underline"
                >
                  contact@pontdufutur.org
                </a>
              </p>
              <p>
                <strong>Adresse :</strong> [Adresse postale complète]
              </p>
            </div>
          </section>
        </div>

        {/* Retour */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors font-medium"
          >
            ← Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}
