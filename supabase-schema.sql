-- ================================================
-- SCHÉMA COMPLET SUPABASE - PONT DU FUTUR
-- ================================================
-- À exécuter dans le SQL Editor de Supabase
-- ================================================

-- ================================================
-- 1. TABLE ARTICLES (déjà existante normalement)
-- ================================================
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('actualite', 'evenement', 'temoignage', 'partenariat')),
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  read_time INTEGER DEFAULT 5,
  author_name TEXT DEFAULT 'Admin',
  author_avatar TEXT DEFAULT '👨‍💼',
  published_at TIMESTAMPTZ,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON public.articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);

-- ================================================
-- 2. TABLE ÉVÉNEMENTS
-- ================================================
CREATE TABLE IF NOT EXISTS public.evenements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titre TEXT NOT NULL,
  description TEXT NOT NULL,
  date_debut DATE NOT NULL,
  date_fin DATE,
  heure_debut TIME,
  heure_fin TIME,
  lieu TEXT NOT NULL,
  ville TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('seminaire', 'colloque', 'atelier', 'rencontre')),
  places_max INTEGER,
  places_disponibles INTEGER,
  image_url TEXT,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_evenements_date_debut ON public.evenements(date_debut DESC);
CREATE INDEX IF NOT EXISTS idx_evenements_type ON public.evenements(type);
CREATE INDEX IF NOT EXISTS idx_evenements_status ON public.evenements(status);

-- ================================================
-- 3. TABLE MEMBRES
-- ================================================
CREATE TABLE IF NOT EXISTS public.membres (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prenom TEXT NOT NULL,
  nom TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telephone TEXT,
  ville TEXT,
  profession TEXT,
  linkedin TEXT,
  bio TEXT,
  avatar_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  raison_rejet TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_membres_status ON public.membres(status);
CREATE INDEX IF NOT EXISTS idx_membres_email ON public.membres(email);

-- ================================================
-- 4. TABLE MENTORS
-- ================================================
CREATE TABLE IF NOT EXISTS public.mentors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prenom TEXT NOT NULL,
  nom TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telephone TEXT,
  ville TEXT,
  profession TEXT,
  linkedin TEXT,
  bio TEXT,
  domaine_expertise TEXT,
  disponibilite TEXT,
  avatar_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  raison_rejet TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mentors_status ON public.mentors(status);
CREATE INDEX IF NOT EXISTS idx_mentors_email ON public.mentors(email);

-- ================================================
-- 5. TABLE BÉNÉVOLES
-- ================================================
CREATE TABLE IF NOT EXISTS public.benevoles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prenom TEXT NOT NULL,
  nom TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telephone TEXT,
  ville TEXT,
  profession TEXT,
  motivations TEXT,
  disponibilite TEXT,
  competences TEXT[],
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  raison_rejet TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_benevoles_status ON public.benevoles(status);

-- ================================================
-- 6. TABLE PARTENAIRES
-- ================================================
CREATE TABLE IF NOT EXISTS public.partenaires (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  site_web TEXT,
  type TEXT CHECK (type IN ('entreprise', 'association', 'institution', 'sponsor')),
  actif BOOLEAN DEFAULT true,
  ordre INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partenaires_actif ON public.partenaires(actif);

-- ================================================
-- 7. TABLE CANDIDATURES (formulaires de contact)
-- ================================================
CREATE TABLE IF NOT EXISTS public.candidatures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT,
  type_demande TEXT NOT NULL CHECK (type_demande IN ('membre', 'mentor', 'benevole', 'partenaire', 'autre')),
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'processed', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_candidatures_status ON public.candidatures(status);
CREATE INDEX IF NOT EXISTS idx_candidatures_created_at ON public.candidatures(created_at DESC);

-- ================================================
-- 8. TABLE NOTIFICATIONS (pour l'admin)
-- ================================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titre TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('info', 'success', 'warning', 'error')),
  lien TEXT,
  lu BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_lu ON public.notifications(lu);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);

-- ================================================
-- 9. FONCTIONS TRIGGER pour updated_at
-- ================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Appliquer le trigger à toutes les tables
DROP TRIGGER IF EXISTS update_articles_updated_at ON public.articles;
CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON public.articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF NOT EXISTS update_evenements_updated_at ON public.evenements;
CREATE TRIGGER update_evenements_updated_at
    BEFORE UPDATE ON public.evenements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_membres_updated_at ON public.membres;
CREATE TRIGGER update_membres_updated_at
    BEFORE UPDATE ON public.membres
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_mentors_updated_at ON public.mentors;
CREATE TRIGGER update_mentors_updated_at
    BEFORE UPDATE ON public.mentors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_benevoles_updated_at ON public.benevoles;
CREATE TRIGGER update_benevoles_updated_at
    BEFORE UPDATE ON public.benevoles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_partenaires_updated_at ON public.partenaires;
CREATE TRIGGER update_partenaires_updated_at
    BEFORE UPDATE ON public.partenaires
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_candidatures_updated_at ON public.candidatures;
CREATE TRIGGER update_candidatures_updated_at
    BEFORE UPDATE ON public.candidatures
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- 10. ROW LEVEL SECURITY (RLS)
-- ================================================
-- Activer RLS sur toutes les tables
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evenements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.benevoles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partenaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture publique
CREATE POLICY "Articles publiés lisibles par tous"
  ON public.articles FOR SELECT
  USING (status = 'published');

CREATE POLICY "Événements lisibles par tous"
  ON public.evenements FOR SELECT
  USING (true);

CREATE POLICY "Membres approuvés lisibles par tous"
  ON public.membres FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Mentors approuvés lisibles par tous"
  ON public.mentors FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Partenaires actifs lisibles par tous"
  ON public.partenaires FOR SELECT
  USING (actif = true);

-- Politiques d'écriture publique (pour les formulaires)
CREATE POLICY "Tout le monde peut soumettre une candidature"
  ON public.candidatures FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Tout le monde peut s'inscrire comme membre"
  ON public.membres FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Tout le monde peut s'inscrire comme mentor"
  ON public.mentors FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Tout le monde peut s'inscrire comme bénévole"
  ON public.benevoles FOR INSERT
  WITH CHECK (true);

-- Politiques admin (pour les utilisateurs authentifiés)
-- Note: À adapter selon votre système d'authentification
CREATE POLICY "Les authentifiés peuvent tout faire sur articles"
  ON public.articles
  USING (auth.role() = 'authenticated');

CREATE POLICY "Les authentifiés peuvent tout faire sur evenements"
  ON public.evenements
  USING (auth.role() = 'authenticated');

CREATE POLICY "Les authentifiés peuvent gérer les candidatures"
  ON public.candidatures
  USING (auth.role() = 'authenticated');

CREATE POLICY "Les authentifiés peuvent gérer les notifications"
  ON public.notifications
  USING (auth.role() = 'authenticated');

-- ================================================
-- 11. DONNÉES D'EXEMPLE (optionnel)
-- ================================================
-- Vous pouvez décommenter pour insérer des données de test

-- INSERT INTO public.articles (title, slug, excerpt, content, category, status, published_at)
-- VALUES
--   ('Premier article', 'premier-article', 'Ceci est un extrait', '<p>Contenu de l''article</p>', 'actualite', 'published', NOW());

-- INSERT INTO public.evenements (titre, description, date_debut, lieu, ville, type)
-- VALUES
--   ('Séminaire Test', 'Un séminaire de test', '2025-12-01', 'Centre Culturel', 'Paris', 'seminaire');

-- ================================================
-- FIN DU SCHÉMA
-- ================================================
