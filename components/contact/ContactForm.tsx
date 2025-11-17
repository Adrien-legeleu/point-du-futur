// components/contact/ContactForm.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    type_demande: 'information',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { type_demande, message, telephone, ...baseData } = formData;

      let result;

      switch (type_demande) {
        case 'membre':
          result = await supabase.from('membres').insert([
            {
              prenom: baseData.prenom,
              nom: baseData.nom,
              email: baseData.email,
              telephone: telephone || null,
              status: 'pending',
            },
          ] as any);
          break;

        case 'mentor':
          result = await supabase.from('mentors').insert([
            {
              prenom: baseData.prenom,
              nom: baseData.nom,
              email: baseData.email,
              telephone: telephone || null,
              status: 'pending',
            },
          ] as any);
          break;

        case 'benevole':
          result = await supabase.from('benevoles').insert([
            {
              prenom: baseData.prenom,
              nom: baseData.nom,
              email: baseData.email,
              telephone: telephone || null,
              status: 'pending',
            },
          ] as any);
          break;

        case 'partenaire':
          result = await supabase.from('partenaires').insert([
            {
              prenom_contact: baseData.prenom,
              nom_contact: baseData.nom,
              email_contact: baseData.email,
              telephone_contact: telephone || null,
              nom_organisation: 'À compléter',
              status: 'pending',
            },
          ] as any);
          break;

        case 'information':
        default:
          result = await supabase.from('demandes_infos').insert([
            {
              prenom: baseData.prenom,
              nom: baseData.nom,
              email: baseData.email,
              telephone: telephone || null,
              type_demande: 'information',
              message: message,
              status: 'new',
            },
          ] as any);
          break;
      }

      if (result?.error) {
        throw result.error;
      }

      setSuccess(true);
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        type_demande: 'information',
        message: '',
      });
    } catch (err: any) {
      console.error('Erreur:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };
  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-12 text-center"
      >
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-primary-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Message envoyé !
        </h3>
        <p className="text-gray-600 mb-6">
          Merci pour votre message. Nous vous répondrons dans les plus brefs
          délais.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="px-6 py-3 bg-primary-600/80 text-white rounded-3xl font-semibold"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {error && (
        <div className="p-4 bg-red-50 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Prénom *
          </label>
          <input
            type="text"
            required
            value={formData.prenom}
            onChange={(e) =>
              setFormData({ ...formData, prenom: e.target.value })
            }
            className="w-full px-4 py-3 border-b-2 border-neutral-200/50 focus:border-primary-300 outline-none transition-all"
            placeholder="Votre prénom"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nom *
          </label>
          <input
            type="text"
            required
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            className="w-full px-4 py-3 border-b-2 border-neutral-200/50 focus:border-primary-300 outline-none transition-all"
            placeholder="Votre nom"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 border-b-2 border-neutral-200/50 focus:border-primary-300 outline-none transition-all"
            placeholder="votre@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Téléphone
          </label>
          <input
            type="tel"
            value={formData.telephone}
            onChange={(e) =>
              setFormData({ ...formData, telephone: e.target.value })
            }
            className="w-full px-4 py-3 border-b-2 border-neutral-200/50 focus:border-primary-300 outline-none transition-all"
            placeholder="06 12 34 56 78"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Type de demande *
        </label>
        <select
          required
          value={formData.type_demande}
          onChange={(e) =>
            setFormData({ ...formData, type_demande: e.target.value })
          }
          className="w-full px-4 py-3 border-b-2 border-neutral-200/50 focus:border-primary-300 outline-none transition-all"
        >
          <option value="information">Demande d'information</option>
          <option value="membre">Devenir membre</option>
          <option value="mentor">Devenir mentor</option>
          <option value="benevole">Devenir bénévole</option>
          <option value="partenaire">Devenir partenaire</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Message *
        </label>
        <textarea
          required
          rows={6}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full px-4 py-3 border-b-2 border-neutral-200/50 focus:border-primary-300 outline-none transition-all"
          placeholder="Décrivez votre demande..."
        />
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="w-full flex items-center justify-center gap-2 py-4 bg-primary-600/80 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Envoyer le message
          </>
        )}
      </motion.button>
    </motion.form>
  );
}
