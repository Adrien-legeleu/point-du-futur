// @ts-nocheck
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { motion } from 'framer-motion';
import { Save, Loader, Calendar, MapPin, Users } from 'lucide-react';
import ImageUpload from './ImageUpload';
import type {
  EvenementDB,
  EvenementInsert,
  EvenementUpdate,
} from '@/lib/types';

type Props = {
  evenement?: EvenementDB;
};

export default function EvenementForm({ evenement }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState<EvenementInsert>(
    evenement
      ? {
          titre: evenement.titre,
          description: evenement.description,
          date_debut: evenement.date_debut,
          date_fin: evenement.date_fin,
          heure_debut: evenement.heure_debut,
          heure_fin: evenement.heure_fin,
          lieu: evenement.lieu,
          ville: evenement.ville,
          adresse: evenement.adresse,
          type: evenement.type,
          places_max: evenement.places_max,
          places_disponibles: evenement.places_disponibles,
          image_url: evenement.image_url,
          status: evenement.status,
          lien_inscription: evenement.lien_inscription,
        }
      : {
          titre: '',
          description: '',
          date_debut: '',
          date_fin: null,
          heure_debut: null,
          heure_fin: null,
          lieu: '',
          ville: '',
          adresse: null,
          type: 'seminaire',
          places_max: null,
          places_disponibles: null,
          image_url: null,
          status: 'draft',
          lien_inscription: null,
        }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!formData.titre || !formData.description || !formData.date_debut) {
        throw new Error('Veuillez remplir tous les champs obligatoires');
      }

      if (evenement?.id) {
        // ✅ Update - utiliser EvenementUpdate
        const updateData: EvenementUpdate = formData;

        const { error: updateError } = await supabase
          .from('evenements')
          .update(updateData)
          .eq('id', evenement.id);

        if (updateError) throw updateError;
        setSuccess('Événement modifié avec succès !');
      } else {
        const { error: insertError } = await supabase
          .from('evenements')
          .insert(formData);

        if (insertError) throw insertError;
        setSuccess('Événement créé avec succès !');
      }

      setTimeout(() => {
        router.push('/admin/evenements');
        router.refresh();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 rounded-xl"
        >
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 rounded-xl"
        >
          <p className="text-green-600 text-sm font-medium">{success}</p>
        </motion.div>
      )}

      {/* Informations de base */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary-600" />
          Informations de base
        </h3>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Titre de l'événement *
          </label>
          <input
            type="text"
            value={formData.titre}
            onChange={(e) =>
              setFormData({ ...formData, titre: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
            placeholder="Ex: Séminaire d'orientation 2025"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Type d'événement *
          </label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as EvenementDB['type'],
              })
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
          >
            <option value="seminaire">Séminaire</option>
            <option value="colloque">Colloque</option>
            <option value="atelier">Atelier</option>
            <option value="rencontre">Rencontre</option>
            <option value="conference">Conférence</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={6}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
            placeholder="Décrivez l'événement..."
            required
          />
        </div>

        <ImageUpload
          currentImage={formData.image_url}
          onImageChange={(url) => setFormData({ ...formData, image_url: url })}
        />
      </div>

      {/* Date et heure */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Date et heure</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date de début *
            </label>
            <input
              type="date"
              value={formData.date_debut}
              onChange={(e) =>
                setFormData({ ...formData, date_debut: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date de fin
            </label>
            <input
              type="date"
              value={formData.date_fin || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  date_fin: e.target.value || null,
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Heure de début
            </label>
            <input
              type="time"
              value={formData.heure_debut || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  heure_debut: e.target.value || null,
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Heure de fin
            </label>
            <input
              type="time"
              value={formData.heure_fin || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  heure_fin: e.target.value || null,
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Lieu */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary-600" />
          Lieu
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lieu *
            </label>
            <input
              type="text"
              value={formData.lieu}
              onChange={(e) =>
                setFormData({ ...formData, lieu: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              placeholder="Ex: Salle Polyvalente"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ville *
            </label>
            <input
              type="text"
              value={formData.ville}
              onChange={(e) =>
                setFormData({ ...formData, ville: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              placeholder="Ex: Paris"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Adresse complète
          </label>
          <input
            type="text"
            value={formData.adresse || ''}
            onChange={(e) =>
              setFormData({ ...formData, adresse: e.target.value || null })
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
            placeholder="Ex: 12 rue de la Paix, 75002 Paris"
          />
        </div>
      </div>

      {/* Places et inscription */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary-600" />
          Places et inscription
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Places maximum
            </label>
            <input
              type="number"
              value={formData.places_max || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  places_max: e.target.value ? Number(e.target.value) : null,
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Places disponibles
            </label>
            <input
              type="number"
              value={formData.places_disponibles || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  places_disponibles: e.target.value
                    ? Number(e.target.value)
                    : null,
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Lien d'inscription
          </label>
          <input
            type="url"
            value={formData.lien_inscription || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                lien_inscription: e.target.value || null,
              })
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
            placeholder="https://formulaire-inscription.com"
          />
        </div>
      </div>

      {/* Statut */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Statut de publication *
        </label>
        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as EvenementDB['status'],
            })
          }
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
        >
          <option value="draft">Brouillon</option>
          <option value="published">Publié</option>
          <option value="archived">Archivé</option>
        </select>
      </div>

      {/* Boutons */}
      <div className="flex gap-4">
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-blue to-primary-green text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              {evenement ? 'Mettre à jour' : "Créer l'événement"}
            </>
          )}
        </motion.button>

        <button
          type="button"
          onClick={() => router.push('/admin/evenements')}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
