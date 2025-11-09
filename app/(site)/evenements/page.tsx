import { createServerSupabaseClient } from '@/lib/supabase/server';
import EvenementsHero from '@/components/evenements/EvenementsHero';
import EvenementsList from '@/components/evenements/EvenementsList';

export const metadata = {
  title: 'Événements | Pont du Futur',
  description:
    'Découvrez nos événements : séminaires, colloques, ateliers et rencontres pour construire ensemble un avenir meilleur.',
};

export const revalidate = 60; // Revalidate toutes les 60 secondes

export default async function EvenementsPage() {
  const supabase = await createServerSupabaseClient();

  // Récupérer tous les événements à venir et en cours
  const { data: evenements } = await supabase
    .from('evenements')
    .select('*')
    .in('status', ['upcoming', 'ongoing'])
    .order('date_debut', { ascending: true });

  return (
    <>
      <EvenementsHero />
      <EvenementsList evenements={evenements || []} />
    </>
  );
}
