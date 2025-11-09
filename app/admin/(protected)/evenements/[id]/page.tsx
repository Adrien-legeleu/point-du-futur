import { createServerSupabaseClient } from '@/lib/supabase/server';
import EvenementForm from '@/components/admin/evenements/EvenementForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ModifierEvenementPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createServerSupabaseClient();

  const { data: evenement, error } = await supabase
    .from('evenements')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !evenement) {
    notFound();
  }

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
        <h1 className="text-3xl font-bold text-gray-900">
          Modifier l'événement
        </h1>
        <p className="text-gray-600 mt-2">{evenement.titre}</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <EvenementForm evenement={evenement} />
      </div>
    </div>
  );
}
