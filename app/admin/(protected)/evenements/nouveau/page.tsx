import EvenementForm from '@/components/admin/evenements/EvenementForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NouvelEvenementPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/admin/evenements"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-trust-600 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux événements
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Nouvel événement</h1>
        <p className="text-gray-600 mt-2">
          Créez un nouvel événement pour votre plateforme
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <EvenementForm />
      </div>
    </div>
  );
}
