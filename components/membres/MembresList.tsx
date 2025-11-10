'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Mail, Linkedin, Search, MapPin, Briefcase } from 'lucide-react';

interface Membre {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  ville?: string;
  profession?: string;
  linkedin?: string;
  bio?: string;
  avatar_url?: string;
}

interface MembresListProps {
  membres: Membre[];
}

export default function MembresList({ membres }: MembresListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter membres
  const filteredMembres = useMemo(() => {
    if (!searchQuery) return membres;

    return membres.filter(
      (membre) =>
        membre.prenom?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        membre.nom?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        membre.ville?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        membre.profession?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [membres, searchQuery]);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header avec search */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Découvrez nos membres
              </h2>
              <p className="text-gray-600">
                {filteredMembres.length} membre
                {filteredMembres.length > 1 ? 's' : ''} dans notre communauté
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un membre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all bg-white shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Membres Grid */}
        {filteredMembres.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              Aucun membre trouvé pour cette recherche
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembres.map((membre, index) => (
              <motion.div
                key={membre.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-gradient-to-br from-white to-primary-50/20 rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover-lift"
              >
                {/* Avatar */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    {membre.prenom?.[0]}
                    {membre.nom?.[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {membre.prenom} {membre.nom}
                    </h3>
                    {membre.profession && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Briefcase className="w-4 h-4" />
                        <span className="truncate">{membre.profession}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bio */}
                {membre.bio && (
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {membre.bio}
                  </p>
                )}

                {/* Location */}
                {membre.ville && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <MapPin className="w-4 h-4" />
                    {membre.ville}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
                  {membre.email && (
                    <a
                      href={`mailto:${membre.email}`}
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors"
                      title="Envoyer un email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                  {membre.linkedin && (
                    <a
                      href={membre.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors"
                      title="Voir le profil LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
