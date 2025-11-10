import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();

    // Vérifier l'authentification
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const body = await request.json();

    // Nettoyer les données : convertir les chaînes vides en null
    const cleanedData = {
      ...body,
      date_fin: body.date_fin || null,
      heure_debut: body.heure_debut || null,
      heure_fin: body.heure_fin || null,
      places_max: body.places_max || null,
      places_disponibles: body.places_disponibles || null,
      image_url: body.image_url || null,
    };

    const { data, error } = await supabase.from('evenements').insert([cleanedData]).select().single();

    if (error) {
      console.error('Error creating evenement:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in POST /api/admin/evenements:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création' },
      { status: 500 }
    );
  }
}
