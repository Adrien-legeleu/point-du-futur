// Ajoute cette interface dans lib/types.ts après BenevoleDB

// ================================================
// DEMANDES D'INFOS
// ================================================
export interface DemandInfosDB {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string | null;
  type_demande: 'membre' | 'mentor' | 'benevole' | 'partenaire' | 'information';
  message: string;
  status: 'new' | 'read' | 'processed' | 'archived';
  created_at: string;
  updated_at: string;
}

export type DemandInfosStatus = DemandInfosDB['status'];
export type DemandInfosType = DemandInfosDB['type_demande'];

export type DemandInfosInsert = Omit<
  DemandInfosDB,
  'id' | 'created_at' | 'updated_at'
>;
export type DemandInfosUpdate = Partial<DemandInfosInsert>;
export interface ArticleDB {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  category: 'actualite' | 'evenement' | 'temoignage' | 'partenariat';
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  read_time: number;
  author_name: string;
  author_avatar: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  views: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: 'actualite' | 'evenement' | 'temoignage' | 'partenariat';
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number;
  tags: string[];
  views: number;
  status?: 'draft' | 'published' | 'archived';
}

export type ArticleStatus = ArticleDB['status'];
export type ArticleCategory = ArticleDB['category'];

export interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  tags: string;
  status: string;
  read_time: number;
  author_name: string;
  author_avatar: string;
}

export type ArticleInsert = Omit<
  ArticleDB,
  'id' | 'created_at' | 'updated_at' | 'views'
>;
export type ArticleUpdate = Partial<ArticleInsert>;

// ================================================
// 2. ÉVÉNEMENTS (selon schéma exact)
// ================================================
export interface EvenementDB {
  id: string;
  titre: string;
  description: string;
  date_debut: string; // DATE
  date_fin: string | null; // DATE
  heure_debut: string | null; // TIME
  heure_fin: string | null; // TIME
  lieu: string;
  ville: string;
  adresse: string | null;
  type: 'seminaire' | 'colloque' | 'atelier' | 'rencontre' | 'conference';
  places_max: number | null;
  places_disponibles: number | null;
  image_url: string | null;
  status: 'draft' | 'published' | 'archived';
  lien_inscription: string | null;
  created_at: string; // TIMESTAMP
  updated_at: string; // TIMESTAMP
}

export type EvenementStatus = EvenementDB['status'];
export type EvenementType = EvenementDB['type'];

export type EvenementInsert = Omit
  EvenementDB,
  'id' | 'created_at' | 'updated_at'
>;
export type EvenementUpdate = Partial<EvenementInsert>;
// ================================================
// 3. MEMBRES
// ================================================
export interface MembreDB {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string | null;
  ville: string | null;
  profession: string | null;
  linkedin: string | null;
  bio: string | null;
  avatar_url: string | null;
  status: 'pending' | 'approved' | 'rejected';
  raison_rejet: string | null;
  created_at: string;
  updated_at: string;
}

export type MembreStatus = MembreDB['status'];

export interface MembreFormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  ville: string;
  profession: string;
  linkedin: string;
  bio: string;
  avatar_url: string;
  status: string;
  raison_rejet: string;
}

export type MembreInsert = Omit<MembreDB, 'id' | 'created_at' | 'updated_at'>;
export type MembreUpdate = Partial<MembreInsert>;

// ================================================
// 4. MENTORS
// ================================================
export interface MentorDB {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string | null;
  ville: string | null;
  profession: string | null;
  linkedin: string | null;
  bio: string | null;
  domaine_expertise: string | null;
  disponibilite: string | null;
  avatar_url: string | null;
  status: 'pending' | 'approved' | 'rejected';
  raison_rejet: string | null;
  created_at: string;
  updated_at: string;
}

export type MentorStatus = MentorDB['status'];

export interface MentorFormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  ville: string;
  profession: string;
  linkedin: string;
  bio: string;
  domaine_expertise: string;
  disponibilite: string;
  avatar_url: string;
  status: string;
  raison_rejet: string;
}

export type MentorInsert = Omit<MentorDB, 'id' | 'created_at' | 'updated_at'>;
export type MentorUpdate = Partial<MentorInsert>;

// ================================================
// 5. BÉNÉVOLES
// ================================================
export interface BenevoleDB {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string | null;
  ville: string | null;
  profession: string | null;
  motivations: string | null;
  disponibilite: string | null;
  competences: string[] | null;
  status: 'pending' | 'approved' | 'rejected';
  raison_rejet: string | null;
  created_at: string;
  updated_at: string;
}

export type BenevoleStatus = BenevoleDB['status'];

export interface BenevoleFormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  ville: string;
  profession: string;
  motivations: string;
  disponibilite: string;
  competences: string;
  status: string;
  raison_rejet: string;
}

export type BenevoleInsert = Omit<
  BenevoleDB,
  'id' | 'created_at' | 'updated_at'
>;
export type BenevoleUpdate = Partial<BenevoleInsert>;

// ================================================
// 6. PARTENAIRES
// ================================================
export interface PartenaireDB {
  id: string;
  nom: string;
  description: string | null;
  logo_url: string | null;
  site_web: string | null;
  type: 'entreprise' | 'association' | 'institution' | 'sponsor' | null;
  actif: boolean;
  ordre: number;
  created_at: string;
  updated_at: string;
}

export type PartenaireType = NonNullable<PartenaireDB['type']>;

export interface PartenaireFormData {
  nom: string;
  description: string;
  logo_url: string;
  site_web: string;
  type: string;
  actif: boolean;
  ordre: number;
}

export type PartenaireInsert = Omit<
  PartenaireDB,
  'id' | 'created_at' | 'updated_at'
>;
export type PartenaireUpdate = Partial<PartenaireInsert>;

// ================================================
// 7. CANDIDATURES (Messages de contact)
// ================================================
export interface CandidatureDB {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string | null;
  type_demande: 'membre' | 'mentor' | 'benevole' | 'partenaire' | 'autre';
  message: string;
  status: 'new' | 'read' | 'processed' | 'archived';
  created_at: string;
  updated_at: string;
}

export type CandidatureStatus = CandidatureDB['status'];
export type CandidatureType = CandidatureDB['type_demande'];

export interface CandidatureFormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  type_demande: string;
  message: string;
}

export type CandidatureInsert = Omit<
  CandidatureDB,
  'id' | 'created_at' | 'updated_at'
>;
export type CandidatureUpdate = Partial<CandidatureInsert>;

// ================================================
// 8. NOTIFICATIONS
// ================================================
export interface NotificationDB {
  id: string;
  titre: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  lien: string | null;
  lu: boolean;
  created_at: string;
}

export type NotificationType = NotificationDB['type'];

export interface NotificationFormData {
  titre: string;
  message: string;
  type: string;
  lien: string;
}

export type NotificationInsert = Omit<NotificationDB, 'id' | 'created_at'>;
export type NotificationUpdate = Partial<NotificationInsert>;

// ================================================
// 9. TYPES UTILITAIRES
// ================================================
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FilterParams {
  status?: string;
  category?: string;
  type?: string;
  search?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ================================================
// 10. TYPES POUR LE DASHBOARD
// ================================================
export interface DashboardStats {
  articles: {
    total: number;
    published: number;
    draft: number;
  };
  evenements: {
    total: number;
    upcoming: number;
    ongoing: number;
    completed: number;
  };
  membres: {
    total: number;
    pending: number;
    approved: number;
  };
  mentors: {
    total: number;
    pending: number;
    approved: number;
  };
  benevoles: {
    total: number;
    pending: number;
    approved: number;
  };
  partenaires: {
    total: number;
    actifs: number;
  };
  candidatures: {
    total: number;
    new: number;
    read: number;
    processed: number;
  };
  notifications: {
    total: number;
    nonLues: number;
  };
}

// ================================================
// 11. TYPES D'AUTHENTIFICATION
// ================================================
export interface User {
  id: string;
  email: string;
  role?: 'admin' | 'user';
  created_at?: string;
}

export interface Session {
  user: User;
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
}
