'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Search,
  Filter,
} from 'lucide-react';
import Link from 'next/link';

interface Evenement {
  id: string;
  titre: string;
  description: string;
  date_debut: string;
  date_fin?: string;
  heure_debut?: string;
  heure_fin?: string;
  lieu: string;
  ville: string;
  type: 'seminaire' | 'colloque' | 'atelier' | 'rencontre';
  places_max?: number;
  places_disponibles?: number;
  image_url?: string;
}

interface EvenementsListProps {
  evenements: Evenement[];
}

const eventTypes = [
  { value: 'all', label: 'Tous' },
  { value: 'seminaire', label: 'Séminaires' },
  { value: 'colloque', label: 'Colloques' },
  { value: 'atelier', label: 'Ateliers' },
  { value: 'rencontre', label: 'Rencontres' },
];

export default function EvenementsList({ evenements }: EvenementsListProps) {
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter evenements
  const filteredEvenements = useMemo(() => {
    let filtered = evenements;

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter((event) => event.type === selectedType);
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.ville.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [evenements, selectedType, searchQuery]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'seminaire':
        return 'bg-primary-100 text-primary-700 border-primary-200';
      case 'colloque':
        return 'bg-accent-100 text-accent-700 border-accent-200';
      case 'atelier':
        return 'bg-energy-100 text-energy-700 border-energy-200';
      case 'rencontre':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeLabel = (type: string) => {
    const typeObj = eventTypes.find((t) => t.value === type);
    return typeObj?.label || type;
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un événement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all bg-white shadow-sm"
              />
            </div>

            {/* Type filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-gray-500 hidden md:block" />
              {eventTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                    selectedType === type.value
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-gray-600 text-sm">
            {filteredEvenements.length} événement
            {filteredEvenements.length > 1 ? 's' : ''}
            {searchQuery && ` pour "${searchQuery}"`}
          </p>
        </div>

        {/* Evenements Grid */}
        {filteredEvenements.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">
              Aucun événement trouvé
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('all');
              }}
              className="px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvenements.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover-lift"
              >
                {/* Image placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-primary-100 to-accent-100">
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(
                        event.type
                      )}`}
                    >
                      {getTypeLabel(event.type)}
                    </span>
                  </div>
                  {event.places_disponibles !== undefined &&
                    event.places_disponibles < 10 && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-energy-500 text-white">
                          {event.places_disponibles} places restantes
                        </span>
                      </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Date & Location */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary-500" />
                      {new Date(event.date_debut).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </div>
                    {event.heure_debut && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-accent-500" />
                        {event.heure_debut}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {event.titre}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <MapPin className="w-4 h-4" />
                    {event.ville}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    {event.places_max && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        {event.places_max} places
                      </div>
                    )}
                    <button className="flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all">
                      Détails
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
