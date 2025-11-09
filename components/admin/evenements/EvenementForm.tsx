'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Users, Save, Loader } from 'lucide-react';

interface EvenementFormProps {
  evenement?: any;
}

export default function EvenementForm({ evenement }: EvenementFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titre: evenement?.titre || '',
    description: evenement?.description || '',
    date_debut: evenement?.date_debut || '',
    date_fin: evenement?.date_fin || '',
    heure_debut: evenement?.heure_debut || '',
    heure_fin: evenement?.heure_fin || '',
    lieu: evenement?.lieu || '',
    ville: evenement?.ville || '',
    type: evenement?.type || 'seminaire',
    status: evenement?.status || 'draft',
    places_max: evenement?.places_max || '',
    places_disponibles: evenement?.places_disponibles || '',
    image_url: evenement?.image_url || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = evenement
        ? `/api/admin/evenements/${evenement.id}`
        : '/api/admin/evenements';

      const method = evenement ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          places_max: formData.places_max ? parseInt(formData.places_max) : null,
          places_disponibles: formData.places_disponibles
            ? parseInt(formData.places_disponibles)
            : null,
        }),
      });

      if (response.ok) {
        router.push('/admin/evenements');
        router.refresh();
      } else {
        alert('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Informations principales */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-trust-600" />
          Informations principales
        </h2>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Titre de l'événement *
          </label>
          <input
            type="text"
            required
            value={formData.titre}
            onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-trust-400 focus:ring-2 focus:ring-trust-100 outline-none transition-all"
            placeholder="Ex: Séminaire Entrepreneuriat Social"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            required
            rows={5}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-trust-400 focus:ring-2 focus:ring-trust-100 outline-none transition-all resize-none"
            placeholder="Description détaillée de l'événement..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Type *
            </label>
            <select
              required
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-trust-400 focus:ring-2 focus:ring-trust-100 outline-none transition-all"
            >
              <option value="seminaire">Séminaire</option>
              <option value="colloque">Colloque</option>
              <option value="atelier">Atelier</option>
              <option value="rencontre">Rencontre</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Statut *
            </label>
            <select
              required
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-trust-400 focus:ring-2 focus:ring-trust-100 outline-none transition-all"
            >
              <option value="draft">Brouillon</option>
              <option value="published">Publié</option>
              <option value="archived">Archivé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dates et horaires */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-future-600" />
          Dates et horaires
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date de début *
            </label>
            <input
              type="date"
              required
              value={formData.date_debut}
              onChange={(e) =>
                setFormData({ ...formData, date_debut: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-trust-400 focus:ring-2 focus:ring-trust-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date de fin
            </label>
            <input
              type="date"
              value={formData.date_fin}
              onChange={(e) =>
                setFormData({ ...formData, date_fin: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-trust-400 focus:ring-2 focus:ring-trust-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Heure de début
            </label>
            <input
              type="time"
              value={formData.heure_debut}
              onChange={(e) =>
                setFormData({ ...formData, heure_debut: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-trust-400 focus:ring-2 focus:ring-trust-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Heure de fin
            </label>
            <input
              type="time"
              value={formData.heure_fin}
              onChange={(e) =>
                setFormData({ ...formData, heure_fin: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-trust-400 focus:ring-2 focus:ring-trust-100 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Lieu */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-energy-600" />
          Lieu
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lieu *
            </label>
            <input
              type="text"
              required
              value={formData.lieu}
              onChange={(e) => setFormData({ ...formData, lieu: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-trust-400 focus:ring-2 focus:ring-trust-100 outline-none transition-all"
              placeholder="Ex: Salle Polyvalente"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ville *
            </label>
            <input
              type="text"
              required
              value={formData.ville}
              onChange={(e) =>
                setFormData({ ...formData, ville: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-trust-400 focus:ring-2 focus:ring-trust-100 outline-none transition-all"
              placeholder="Ex: Paris"
            />
          </div>
        </div>
      </div>

      {/* Places */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-trust-600" />
          Capacité
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Places maximum
            </label>
            <input
              type="number"
              value={formData.places_max}
              onChange={(e) =>
                setFormData({ ...formData, places_max: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-trust-400 focus:ring-2 focus:ring-trust-100 outline-none transition-all"
              placeholder="Ex: 100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Places disponibles
            </label>
            <input
              type="number"
              value={formData.places_disponibles}
              onChange={(e) =>
                setFormData({ ...formData, places_disponibles: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-trust-400 focus:ring-2 focus:ring-trust-100 outline-none transition-all"
              placeholder="Ex: 50"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-trust-500 to-trust-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Sauvegarde...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              {evenement ? 'Mettre à jour' : 'Créer l\'événement'}
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
