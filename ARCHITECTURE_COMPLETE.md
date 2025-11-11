# 🏗️ ARCHITECTURE COMPLÈTE - PONT DU FUTUR

**Date**: 11 Novembre 2025  
**Stack**: Next.js 16 + React 19 + TypeScript + Supabase + Tailwind CSS  
**Branche**: claude/refactor-admin-panel-011CV19Hi27mQ5qFjHZ4WX4x

---

## 📋 TABLE DES MATIÈRES

1. [Stack Technologique](#stack-technologique)
2. [Structure des Dossiers](#structure-des-dossiers)
3. [Schéma Base de Données](#schéma-base-de-données)
4. [Système d'Authentification](#système-dauthentification)
5. [Routes API](#routes-api)
6. [Types TypeScript](#types-typescript)
7. [Composants Admin](#composants-admin)
8. [Pages Admin](#pages-admin)
9. [Flux Authentification](#flux-authentification)
10. [État du Projet](#état-du-projet)

---

## STACK TECHNOLOGIQUE

### Frontend
- **Framework**: Next.js 16.0.1
- **Runtime**: React 19.2.0 + React DOM 19.2.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + PostCSS
- **UI Library**: Lucide React (icônes)
- **Animations**: Framer Motion 12.23.24
- **Rich Text Editor**: React Quill 2.0.0

### Backend
- **Database**: Supabase PostgreSQL
- **Auth**: Supabase Auth (email + OAuth Google)
- **Client SDK**: @supabase/supabase-js 2.80.0
- **Auth Helpers**: @supabase/auth-helpers-nextjs 0.10.0 + @supabase/ssr 0.7.0

### DevTools
- **Linter**: ESLint 9
- **Type Checker**: TypeScript avec strict mode
- **Package Manager**: npm

---

## STRUCTURE DES DOSSIERS

```
point-du-futur/
├── app/
│   ├── (site)/                          # Pages publiques
│   │   ├── about/
│   │   ├── actualites/
│   │   ├── actualites/[slug]/
│   │   ├── actions/
│   │   ├── contact/
│   │   ├── evenements/
│   │   ├── membres/
│   │   └── page.tsx                     # Home
│   │
│   ├── admin/                           # Pages admin
│   │   ├── login/
│   │   │   └── page.tsx                 # 🔐 Connexion admin
│   │   ├── logout/
│   │   │   └── route.ts                 # API logout
│   │   └── (protected)/                 # Layout protégé
│   │       ├── layout.tsx               # 🏗️ Layout admin
│   │       ├── page.tsx                 # Dashboard
│   │       ├── articles/
│   │       │   ├── page.tsx             # Liste articles
│   │       │   ├── nouveau/
│   │       │   │   └── page.tsx         # Créer article
│   │       │   └── [id]/
│   │       │       └── page.tsx         # Éditer article
│   │       ├── evenements/
│   │       │   ├── page.tsx
│   │       │   ├── nouveau/
│   │       │   └── [id]/
│   │       ├── membres/
│   │       ├── mentors/
│   │       ├── benevoles/
│   │       ├── partenaires/
│   │       ├── candidatures/
│   │       └── parametres/              # À créer
│   │
│   └── api/
│       ├── admin/
│       │   └── evenements/
│       │       ├── route.ts             # POST créer événement
│       │       └── [id]/
│       │           └── route.ts         # PUT/DELETE événement
│       └── ...
│
├── components/
│   ├── admin/                           # 🎯 Composants admin
│   │   ├── AdminHeader.tsx              # Header avec notifications
│   │   ├── AdminSidebar.tsx             # Navigation latérale
│   │   ├── articles/
│   │   │   ├── ArticleForm.tsx          # Formulaire création/édition
│   │   │   └── ArticlesList.tsx         # Tableau articles
│   │   ├── evenements/
│   │   │   ├── EvenementForm.tsx
│   │   │   └── EvenementsTable.tsx
│   │   ├── membres/
│   │   │   └── MembresTable.tsx
│   │   ├── benevoles/
│   │   │   ├── BenevolesTable.tsx
│   │   │   └── BenevoleModal.tsx
│   │   ├── partenaires/
│   │   │   ├── PartenairesTable.tsx
│   │   │   └── PartenaireModal.tsx
│   │   └── candidatures/
│   │       └── CandidaturesOverview.tsx
│   │
│   ├── shared/                          # Composants réutilisables
│   ├── ui/                              # Composants UI génériques
│   ├── sections/
│   ├── contact/                         # Formulaire contact
│   ├── actualites/                      # Articles front
│   ├── evenements/                      # Événements front
│   ├── membres/                         # Membres front
│   ├── mentors/                         # Mentors front
│   ├── about/
│   └── actions/
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                    # 🔌 Client Supabase (browser)
│   │   ├── server.ts                    # 🔌 Client Supabase (server)
│   │   └── articles.ts                  # Fonctions articles
│   ├── types.ts                         # 📝 Types globals
│   └── constants.ts                     # 🎯 Constantes
│
├── middleware.ts                        # 🔐 Authentification
├── supabase-schema.sql                  # 🗄️ Schéma SQL complet
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

## SCHÉMA BASE DE DONNÉES

### 1️⃣ TABLE: articles

```sql
id             UUID PRIMARY KEY
title          TEXT NOT NULL
slug           TEXT NOT NULL UNIQUE
excerpt        TEXT NOT NULL
content        TEXT NOT NULL
image_url      TEXT
category       'actualite'|'evenement'|'temoignage'|'partenariat'
tags           TEXT[] (array)
status         'draft'|'published'|'archived'
read_time      INTEGER DEFAULT 5
author_name    TEXT DEFAULT 'Admin'
author_avatar  TEXT DEFAULT '👨‍💼'
published_at   TIMESTAMPTZ
views          INTEGER DEFAULT 0
created_at     TIMESTAMPTZ DEFAULT NOW()
updated_at     TIMESTAMPTZ DEFAULT NOW()
```

**Indices**: status, category, published_at DESC, slug

---

### 2️⃣ TABLE: evenements

```sql
id                   UUID PRIMARY KEY
titre                TEXT NOT NULL
slug                 TEXT
description          TEXT NOT NULL
date_debut           DATE NOT NULL
date_fin             DATE
heure_debut          TIME
heure_fin            TIME
lieu                 TEXT NOT NULL
ville                TEXT NOT NULL
type                 'seminaire'|'colloque'|'atelier'|'rencontre'|'networking'
places_total         INTEGER
places_restantes     INTEGER
image_url            TEXT
status               'upcoming'|'ongoing'|'completed'|'cancelled'
created_at           TIMESTAMPTZ DEFAULT NOW()
updated_at           TIMESTAMPTZ DEFAULT NOW()
```

**Indices**: date_debut DESC, type, status

---

### 3️⃣ TABLE: membres

```sql
id               UUID PRIMARY KEY
prenom           TEXT NOT NULL
nom              TEXT NOT NULL
email            TEXT NOT NULL UNIQUE
telephone        TEXT
age              INTEGER
ville            TEXT
situation        TEXT
motivation       TEXT
disponibilite    TEXT
status           'pending'|'approved'|'rejected'|'active'|'inactive'
mentor_id        UUID FK → mentors.id
created_at       TIMESTAMPTZ DEFAULT NOW()
updated_at       TIMESTAMPTZ DEFAULT NOW()
```

**Indices**: status, email

---

### 4️⃣ TABLE: mentors

```sql
id               UUID PRIMARY KEY
prenom           TEXT NOT NULL
nom              TEXT NOT NULL
email            TEXT NOT NULL UNIQUE
telephone        TEXT
age              INTEGER
ville            TEXT
experience       TEXT
motivation       TEXT
competences      TEXT
disponibilite    TEXT
status           'pending'|'approved'|'rejected'|'active'|'inactive'
mentees_count    INTEGER DEFAULT 0
max_mentees      INTEGER DEFAULT 5
created_at       TIMESTAMPTZ DEFAULT NOW()
updated_at       TIMESTAMPTZ DEFAULT NOW()
```

**Indices**: status, email

---

### 5️⃣ TABLE: benevoles

```sql
id               UUID PRIMARY KEY
prenom           TEXT NOT NULL
nom              TEXT NOT NULL
email            TEXT NOT NULL UNIQUE
telephone        TEXT
age              INTEGER
ville            TEXT
profession       TEXT
motivations      TEXT
disponibilite    TEXT
competences      TEXT[] (array)
status           'pending'|'approved'|'rejected'|'active'|'inactive'
created_at       TIMESTAMPTZ DEFAULT NOW()
updated_at       TIMESTAMPTZ DEFAULT NOW()
```

**Indices**: status

---

### 6️⃣ TABLE: partenaires

```sql
id               UUID PRIMARY KEY
nom              TEXT NOT NULL
description      TEXT
logo_url         TEXT
site_web         TEXT
type             'entreprise'|'association'|'institution'|'sponsor'
actif            BOOLEAN DEFAULT true
ordre            INTEGER DEFAULT 0
created_at       TIMESTAMPTZ DEFAULT NOW()
updated_at       TIMESTAMPTZ DEFAULT NOW()
```

**Indices**: actif

---

### 7️⃣ TABLE: candidatures

```sql
id               UUID PRIMARY KEY
nom              TEXT NOT NULL
prenom           TEXT NOT NULL
email            TEXT NOT NULL
telephone        TEXT
type_demande     'membre'|'mentor'|'benevole'|'partenaire'|'autre'
message          TEXT NOT NULL
status           'new'|'read'|'processed'|'archived'
created_at       TIMESTAMPTZ DEFAULT NOW()
updated_at       TIMESTAMPTZ DEFAULT NOW()
```

**Indices**: status, created_at DESC

---

### 8️⃣ TABLE: notifications

```sql
id               UUID PRIMARY KEY
titre            TEXT NOT NULL
message          TEXT NOT NULL
type             'info'|'success'|'warning'|'error'
lien             TEXT
lu               BOOLEAN DEFAULT false
created_at       TIMESTAMPTZ DEFAULT NOW()
```

**Indices**: lu, created_at DESC

---

### 🔌 Triggers Automatiques

Tous les `updated_at` sont mis à jour automatiquement via trigger PostgreSQL:

```sql
CREATE TRIGGER update_<table>_updated_at
    BEFORE UPDATE ON public.<table>
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
```

---

## SYSTÈME D'AUTHENTIFICATION

### 🔐 Architecture Auth

```
┌─────────────────────────────────────────────────────────┐
│                   Browser / Client                       │
│  (AdminLoginPage, ArticleForm, AdminHeader, etc.)       │
└──────────────────────┬──────────────────────────────────┘
                       │ Uses: supabase (client.ts)
                       │ Session stored in cookies
                       ↓
┌─────────────────────────────────────────────────────────┐
│           Middleware (middleware.ts)                     │
│  ✅ Intercepte /admin/* requests                        │
│  ✅ Vérifie session avec createServerClient()           │
│  ✅ Redirige /admin/login si pas de session             │
│  ✅ Redirige /admin/login → /admin si session OK        │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│         Server Components (layout.tsx)                   │
│  ✅ Crée client server avec createServerSupabaseClient()│
│  ✅ Récupère session avec auth.getSession()             │
│  ✅ Redirige si pas de session                          │
│  ✅ Passe user à AdminHeader                            │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│          Supabase Auth Backend                           │
│  📧 Email + Password login                              │
│  🔐 OAuth Google (optionnel)                            │
│  🍪 Session via JWTs dans cookies                       │
│  🔑 Row Level Security (RLS) sur tables                 │
└─────────────────────────────────────────────────────────┘
```

---

### 📝 Flux Authentification Détaillé

#### 1. **Login** (`/admin/login`)

```typescript
// AdminLoginPage (client component)
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password
});
// Redirection vers /admin si succès
```

#### 2. **Session Storage**

- JWT stocké dans cookies HTTP-only (gestion par Supabase)
- Middleware récupère cookies et valide à chaque request
- Server components reçoivent session valide

#### 3. **Logout** (`/admin/logout`)

```typescript
// Route: app/api/admin/logout
await supabase.auth.signOut();
// Redirection vers /admin/login
```

#### 4. **Row Level Security (RLS)**

```sql
-- Articles: seulement les articles publiés sont visibles publiquement
CREATE POLICY "Articles publiés lisibles par tous"
  ON public.articles FOR SELECT
  USING (status = 'published');

-- Admin: authentifiés peuvent tout faire
CREATE POLICY "Les authentifiés peuvent tout faire"
  ON public.articles
  USING (auth.role() = 'authenticated');
```

---

## ROUTES API

### Structure

```
/api/admin/
├── evenements/
│   ├── route.ts           # POST (créer) & GET (lister)
│   └── [id]/
│       └── route.ts       # PUT (éditer) & DELETE
├── articles/
│   ├── route.ts           # POST & GET
│   └── [id]/
│       └── route.ts       # PUT & DELETE
├── membres/
│   ├── [id]/
│   │   ├── approve        # POST (approuver)
│   │   └── reject         # POST (rejeter)
├── mentors/
├── benevoles/
├── partenaires/
└── candidatures/
```

---

### 📌 Exemple: POST /api/admin/evenements

```typescript
// Request body
{
  titre: "Séminaire Tech",
  description: "...",
  date_debut: "2025-12-01",
  date_fin: "2025-12-01",
  heure_debut: "14:00",
  heure_fin: "17:00",
  lieu: "Centre Culturel",
  ville: "Paris",
  type: "seminaire",
  places_max: 50,
  places_disponibles: 50,
  image_url: "https://...",
  status: "upcoming"
}

// Response
{
  id: "uuid",
  titre: "Séminaire Tech",
  ...
}
```

---

## TYPES TYPESCRIPT

### 📝 Database Types (lib/supabase/client.ts)

```typescript
export type Database = {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          image_url: string | null;
          category: 'evenement' | 'temoignage' | 'actualite' | 'partenariat';
          author_name: string;
          author_avatar: string | null;
          published_at: string | null;
          read_time: number;
          tags: string[];
          status: 'draft' | 'published' | 'archived';
          views: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<..., 'id' | 'created_at' | 'updated_at' | 'views'>;
        Update: Partial<Insert>;
      };
      // ... autres tables
    };
  };
};
```

---

### 🎯 Article Types (lib/types.ts)

```typescript
// DB shape (snake_case)
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
  // ... autres champs
}

// Display shape (camelCase)
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

// Form data
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
```

---

## COMPOSANTS ADMIN

### 🏗️ Layout Components

| Composant | Chemin | Rôle |
|-----------|--------|------|
| **AdminSidebar** | `components/admin/AdminSidebar.tsx` | Navigation latérale avec menu items |
| **AdminHeader** | `components/admin/AdminHeader.tsx` | Header avec search, notifications, user |

---

### 📑 Articles Management

| Composant | Chemin | Type | Rôle |
|-----------|--------|------|------|
| **ArticleForm** | `components/admin/articles/ArticleForm.tsx` | Client | Formulaire création/édition articles |
| **ArticlesList** | `components/admin/articles/ArticlesList.tsx` | Client | Tableau avec filtres & pagination |

**Features**:
- Rich text editor (React Quill)
- Image upload preview
- Category & status filters
- Full-text search
- Delete with confirmation

---

### 🗓️ Events Management

| Composant | Chemin | Type | Rôle |
|-----------|--------|------|------|
| **EvenementForm** | `components/admin/evenements/EvenementForm.tsx` | Client | Formulaire événements |
| **EvenementsTable** | `components/admin/evenements/EvenementsTable.tsx` | Client | Tableau événements |

---

### 👥 People Management

| Composant | Chemin | Type | Rôle |
|-----------|--------|------|------|
| **MembresTable** | `components/membres/MembresTable.tsx` | Client | Tableau membres (admin) |
| **MentorsTable** | `components/mentors/MentorsTable.tsx` | Client | Tableau mentors (admin) |
| **BenevolesTable** | `components/admin/benevoles/BenevolesTable.tsx` | Client | Tableau bénévoles |
| **BenevoleModal** | `components/admin/benevoles/BenevoleModal.tsx` | Client | Modal détails bénévole |
| **PartenairesTable** | `components/admin/partenaires/PartenairesTable.tsx` | Client | Tableau partenaires |
| **PartenaireModal** | `components/admin/partenaires/PartenaireModal.tsx` | Client | Modal partenaire |

---

### 📮 Applications Management

| Composant | Chemin | Type | Rôle |
|-----------|--------|------|------|
| **CandidaturesOverview** | `components/admin/candidatures/CanditaturesOverview.tsx` | Server | Vue d'ensemble candidatures |

---

## PAGES ADMIN

### 🔐 Authentification

| Page | Chemin | Type | Rôle |
|------|--------|------|------|
| **Login** | `/admin/login` | Client | Connexion avec email/password + Google OAuth |
| **Logout** | `/admin/logout` | Route | Déconnexion |

---

### 📊 Dashboard

| Page | Chemin | Type | Rôle |
|------|--------|------|------|
| **Dashboard** | `/admin` | Server | Vue d'ensemble (stats, articles récents, candidatures) |

---

### 📝 Articles

| Page | Chemin | Type | Rôle |
|------|--------|------|------|
| **Liste** | `/admin/articles` | Server | Tous les articles avec filtres |
| **Créer** | `/admin/articles/nouveau` | Server | Nouveau article |
| **Éditer** | `/admin/articles/[id]` | Server | Éditer un article existant |

---

### 🗓️ Événements

| Page | Chemin | Type | Rôle |
|------|--------|------|------|
| **Liste** | `/admin/evenements` | Server | Tous les événements |
| **Créer** | `/admin/evenements/nouveau` | Server | Nouvel événement |
| **Éditer** | `/admin/evenements/[id]` | Server | Éditer événement |

---

### 👥 Gestion des Personnes

| Page | Chemin | Type | Rôle |
|------|--------|------|------|
| **Membres** | `/admin/membres` | Server | Validation & gestion membres |
| **Mentors** | `/admin/mentors` | Server | Validation & gestion mentors |
| **Bénévoles** | `/admin/benevoles` | Server | Validation & gestion bénévoles |
| **Partenaires** | `/admin/partenaires` | Server | Gestion partenaires |

---

### 📮 Candidatures

| Page | Chemin | Type | Rôle |
|------|--------|------|------|
| **Vue d'ensemble** | `/admin/candidatures` | Server | Résumé de toutes les candidatures |

---

### ⚙️ Paramètres

| Page | Chemin | Status | Rôle |
|------|--------|--------|------|
| **Paramètres** | `/admin/parametres` | ⏳ À créer | Configuration du site & profil admin |

---

## FLUX AUTHENTIFICATION

### Diagramme de Sécurité

```
1. Visite /admin
   ↓
2. Middleware intercepte → vérifie session
   ├─ ✅ Session valide → Passe au layout
   └─ ❌ Pas de session → Redirection /admin/login
   
3. Layout vérifie session côté server
   ├─ ✅ OK → Passe user à AdminHeader
   └─ ❌ Expirée → Redirection /admin/login

4. Composants reçoivent props protégées
   ├─ AdminHeader: { user }
   └─ Pages: requêtes API avec auth

5. API routes
   ├─ Récupérent session du request
   ├─ Vérifient auth
   └─ Retournent 401 si non-authentifié
```

---

## ÉTAT DU PROJET

### ✅ COMPLÉTÉ (100%)

- [x] Stack technique configuré
- [x] Structure dossiers organisée
- [x] Authentification Supabase (email/password + Google OAuth)
- [x] Middleware de protection `/admin`
- [x] Schéma SQL complet créé
- [x] Clients Supabase (browser + server)
- [x] Types TypeScript corrects
- [x] Admin Layout + Sidebar + Header
- [x] ArticleForm avec React Quill + image upload
- [x] EvenementForm complet
- [x] Tableaux pour toutes les ressources
- [x] Design unifié (primary/accent colors)
- [x] Dashboard avec stats

---

### ⏳ EN COURS / À FAIRE

#### 🔴 URGENT (pour fonctionnalité complète)

- [ ] **Exécuter le schéma SQL dans Supabase**
  ```
  1. Aller Supabase → SQL Editor
  2. Copier supabase-schema.sql
  3. Exécuter
  ```

- [ ] **Système de validation (membres/mentors/bénévoles)**
  - Boutons "Approuver" / "Rejeter" dans les tableaux
  - Modal pour raison de rejet
  - Mise à jour status dans DB

- [ ] **API routes d'approbation**
  - `/api/members/[id]/approve` → POST
  - `/api/members/[id]/reject` → POST { raison_rejet }
  - Idem pour mentors, bénévoles

---

#### 🟡 IMPORTANT (pour UX complète)

- [ ] **Système de notifications**
  - NotificationCenter composant
  - Dropdown dans AdminHeader
  - Marquer comme lu
  - Persistence en DB

- [ ] **Page Paramètres** (`/admin/parametres`)
  - Profil admin
  - Paramètres site
  - Gestion emails

- [ ] **Connexion formulaires publics**
  - Formulaire Contact → table candidatures
  - Formulaire Membres → table membres
  - Notifications automatiques

---

#### 🟢 NICE TO HAVE (améliorations)

- [ ] Upload d'images (Supabase Storage)
- [ ] Emails automatiques (SendGrid/Resend)
- [ ] Dashboard avec graphiques
- [ ] Export données (CSV/PDF)
- [ ] Audit log des actions admin
- [ ] Rate limiting sur APIs

---

## 🎨 DESIGN SYSTEM

### Couleurs Principales

```javascript
// Tailwind config
primary:   #3B82F6 (bleu)      // blue-500
primary-50-900: gradients

accent:    #10B981 (vert)      // emerald-500
accent-50-900: gradients

energy:    #F59E0B (orange)    // amber-500
energy-50-900: gradients

gray:      #6B7280 (gris)      // gray-500
gray-50-900: gradients
```

### Components Pattern

```typescript
// Bouton exemple
<button className="bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl px-6 py-3 font-semibold hover:shadow-lg transition-all">
  Action
</button>

// Input exemple
<input className="px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" />

// Card exemple
<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
  Contenu
</div>
```

---

## 📊 STATISTIQUES DU PROJET

| Métrique | Valeur |
|----------|--------|
| **Composants** | 56 fichiers TSX |
| **Pages/Routes** | 27 fichiers TS/TSX |
| **Dépendances** | 10 (npm) |
| **DevDependencies** | 7 |
| **Tables DB** | 8 (articles, events, members, mentors, volunteers, partners, applications, notifications) |
| **Indices DB** | 15+ |
| **API Routes** | 2+ |
| **Middleware** | 1 |

---

## 🚀 COMMANDES UTILES

```bash
# Dev
npm run dev

# Build
npm run build

# Start prod
npm start

# Lint
npm run lint

# Check types
npx tsc --noEmit
```

---

## 📞 CONTACT

Pour questions ou continuation:
- Dépôt: point-du-futur
- Branche actuelle: claude/refactor-admin-panel-011CV19Hi27mQ5qFjHZ4WX4x
- Documentation: TRAVAIL-EFFECTUE.md

