import { createServerSupabaseClient } from '@/lib/supabase/server';
import MembresHero from '@/components/membres/MembresHero';
import MembresList from '@/components/membres/MembresList';
import JoinCTA from '@/components/membres/JoinCTA';

export const metadata = {
  title: 'Nos Membres | Pont du Futur',
  description:
    'Découvrez notre communauté de membres engagés pour construire un avenir meilleur ensemble.',
};

export const revalidate = 60; // Revalidate toutes les 60 secondes

export default async function MembresPage() {
  const supabase = await createServerSupabaseClient();

  // Récupérer tous les membres acceptés
  const { data: membres } = await supabase
    .from('membres')
    .select('*')
    .eq('status', 'accepted')
    .order('created_at', { ascending: false });

  return (
    <>
      <MembresHero />
      <MembresList membres={membres || []} />
      <JoinCTA />
    </>
  );
}
