# 📁 FICHIERS CLÉS - ACCÈS RAPIDE

## Chemins Absolus Complets

### 🔐 AUTHENTIFICATION

```
/home/user/point-du-futur/middleware.ts
├─ Protège /admin/* routes
├─ Redirige non-authentifiés vers /admin/login
└─ Vérifie session à chaque request

/home/user/point-du-futur/app/admin/login/page.tsx
├─ Formulaire connexion email/password
└─ Bouton OAuth Google

/home/user/point-du-futur/app/admin/logout/route.ts
└─ API endpoint déconnexion
```

---

### 🔌 CLIENTS SUPABASE

```
/home/user/point-du-futur/lib/supabase/client.ts
├─ Client browser (use client)
├─ Types Database complets
└─ Export: supabase instance

/home/user/point-du-futur/lib/supabase/server.ts
├─ Client server (async)
├─ createServerSupabaseClient()
└─ Gestion cookies

/home/user/point-du-futur/lib/supabase/articles.ts
├─ getPublishedArticles()
├─ getArticleBySlug()
├─ getRelatedArticles()
└─ getAllArticleSlugs()
```

---

### 📝 TYPES & CONSTANTES

```
/home/user/point-du-futur/lib/types.ts
├─ ArticleDB (shape DB, snake_case)
├─ Article (shape affichage, camelCase)
├─ ArticleFormData
├─ ArticleStatus, ArticleCategory
├─ ArticleInsert, ArticleUpdate
└─ Autres types...

/home/user/point-du-futur/lib/constants.ts
└─ categories array
```

---

### 🗄️ SCHÉMA BASE DE DONNÉES

```
/home/user/point-du-futur/supabase-schema.sql
├─ 8 tables: articles, evenements, membres, mentors, benevoles, partenaires, candidatures, notifications
├─ 15+ indices de performance
├─ Triggers updated_at automatiques
├─ Row Level Security (RLS) policies
└─ ⚠️ À exécuter dans Supabase SQL Editor
```

---

### 🏗️ LAYOUT ADMIN PRINCIPAL

```
/home/user/point-du-futur/app/admin/(protected)/layout.tsx
├─ Server component
├─ Vérifie session Supabase
├─ Redirige si non-authentifié
└─ Rend AdminSidebar + AdminHeader + children

/home/user/point-du-futur/components/admin/AdminSidebar.tsx
├─ Navigation latérale
├─ Menu items (articles, membres, mentors, etc.)
├─ Notifications badge (8)
└─ Logout button

/home/user/point-du-futur/components/admin/AdminHeader.tsx
├─ Search bar
├─ Notifications bell
├─ User info + avatar
└─ Mobile menu button
```

---

### 📊 DASHBOARD

```
/home/user/point-du-futur/app/admin/(protected)/page.tsx
├─ 6 stat cards (articles, membres, mentors, bénévoles, événements, partenaires)
├─ Articles récents (5 derniers)
├─ Candidatures en attente (5 premières)
└─ Quick actions grid (4 boutons)
```

---

### 📑 ARTICLES

```
/home/user/point-du-futur/app/admin/(protected)/articles/page.tsx
├─ Liste articles avec 4 stats
└─ Composant ArticlesList

/home/user/point-du-futur/app/admin/(protected)/articles/nouveau/page.tsx
├─ Crée formulaire vide
└─ Composant ArticleForm

/home/user/point-du-futur/app/admin/(protected)/articles/[id]/page.tsx
├─ Récupère article
└─ Composant ArticleForm en édition

/home/user/point-du-futur/components/admin/articles/ArticleForm.tsx
├─ React Quill editor (rich text)
├─ Image URL input
├─ Title → Slug auto-generation
├─ Category, tags, status
└─ INSERT ou UPDATE

/home/user/point-du-futur/components/admin/articles/ArticlesList.tsx
├─ Tableau tous articles
├─ Filtres: search, category, status
├─ Badges coleur status/category
├─ Actions: edit, view, delete
└─ Client component avec hooks
```

---

### 🗓️ ÉVÉNEMENTS

```
/home/user/point-du-futur/app/admin/(protected)/evenements/page.tsx
├─ Liste événements avec 4 stats
└─ Composant EvenementsTable

/home/user/point-du-futur/app/admin/(protected)/evenements/nouveau/page.tsx
└─ Formulaire vide

/home/user/point-du-futur/app/admin/(protected)/evenements/[id]/page.tsx
└─ Édition événement

/home/user/point-du-futur/components/admin/evenements/EvenementForm.tsx
├─ Titre, description
├─ Dates (début/fin)
├─ Horaires (début/fin)
├─ Lieu, ville
├─ Type (seminaire, colloque, atelier, rencontre, networking)
├─ Places (max & disponibles)
├─ Image URL
└─ Status (upcoming, ongoing, completed, cancelled)

/home/user/point-du-futur/components/admin/evenements/EvenementsTable.tsx
├─ Tableau événements
├─ Actions edit/delete
└─ Status badges
```

---

### 👥 MEMBRES

```
/home/user/point-du-futur/app/admin/(protected)/membres/page.tsx
├─ 4 stats: total, actifs, en attente, inactifs
└─ Composant MembresTable

/home/user/point-du-futur/components/membres/MembresTable.tsx
├─ Tableau membres admin
├─ Statut: active, pending, inactive
├─ Buttons: Approuver, Rejeter, Détails
└─ À enrichir avec actions
```

---

### 🧑‍🎓 MENTORS

```
/home/user/point-du-futur/app/admin/(protected)/mentors/page.tsx
├─ 4 stats: total, actifs, en attente, mentorés
└─ Composant MentorsTable

/home/user/point-du-futur/components/mentors/MentorsTable.tsx
├─ Tableau mentors
├─ Affiche mentees_count
├─ Actions approval
└─ À enrichir
```

---

### 🤝 BÉNÉVOLES

```
/home/user/point-du-futur/app/admin/(protected)/benevoles/page.tsx
├─ 4 stats: total, actifs, en attente, inactifs
└─ Composant BenevolesTable

/home/user/point-du-futur/components/admin/benevoles/BenevolesTable.tsx
├─ Tableau bénévoles
├─ Affiche compétences (array)
└─ Actions approval

/home/user/point-du-futur/components/admin/benevoles/BenevoleModal.tsx
└─ Modal détails bénévole
```

---

### 🤖 PARTENAIRES

```
/home/user/point-du-futur/app/admin/(protected)/partenaires/page.tsx
├─ 4 stats
└─ Composant PartenairesTable

/home/user/point-du-futur/components/admin/partenaires/PartenairesTable.tsx
├─ Tableau partenaires
├─ Affiche: nom, logo, site web, type
└─ Actions

/home/user/point-du-futur/components/admin/partenaires/PartenaireModal.tsx
└─ Modal détails partenaire
```

---

### 📮 CANDIDATURES

```
/home/user/point-du-futur/app/admin/(protected)/candidatures/page.tsx
├─ 4 stats cartes: Membres, Mentors, Bénévoles, Partenaires
├─ Affiche "X en attente" sur chaque
└─ Composant CandidaturesOverview

/home/user/point-du-futur/components/admin/candidatures/CanditaturesOverview.tsx
├─ Affiche candidatures par type
├─ Tabs ou sections
└─ Status display
```

---

### 🔌 API ROUTES

```
/home/user/point-du-futur/app/api/admin/evenements/route.ts
├─ POST: créer événement
│  ├─ Vérifie auth
│  ├─ Nettoie données (null les vides)
│  └─ INSERT dans Supabase
└─ GET: lister événements

/home/user/point-du-futur/app/api/admin/evenements/[id]/route.ts
├─ PUT: éditer événement
├─ DELETE: supprimer événement
└─ À compléter
```

---

## 📊 STRUCTURE PAR TYPE DE FICHIER

### 🎯 Server Pages (dans app/)
- `/admin/(protected)/page.tsx` - Dashboard
- `/admin/(protected)/articles/page.tsx` - Articles list
- `/admin/(protected)/articles/nouveau/page.tsx` - New article
- `/admin/(protected)/articles/[id]/page.tsx` - Edit article
- `/admin/(protected)/evenements/page.tsx` - Events list
- `/admin/(protected)/membres/page.tsx` - Members
- `/admin/(protected)/mentors/page.tsx` - Mentors
- `/admin/(protected)/benevoles/page.tsx` - Volunteers
- `/admin/(protected)/partenaires/page.tsx` - Partners
- `/admin/(protected)/candidatures/page.tsx` - Applications

### 🖥️ Client Components (dans components/admin/)
- `AdminSidebar.tsx` - Navigation
- `AdminHeader.tsx` - Header
- `articles/ArticleForm.tsx` - Form
- `articles/ArticlesList.tsx` - List
- `evenements/EvenementForm.tsx` - Form
- `evenements/EvenementsTable.tsx` - Table
- `benevoles/BenevolesTable.tsx` - Table
- `benevoles/BenevoleModal.tsx` - Modal
- `partenaires/PartenairesTable.tsx` - Table
- `partenaires/PartenaireModal.tsx` - Modal
- `candidatures/CandidaturesOverview.tsx` - Overview

### 📝 Library Files
- `lib/types.ts` - Type definitions
- `lib/constants.ts` - Constants
- `lib/supabase/client.ts` - Browser client
- `lib/supabase/server.ts` - Server client
- `lib/supabase/articles.ts` - Article helpers

### 🔌 API Routes
- `app/api/admin/evenements/route.ts` - Events API
- `app/api/admin/evenements/[id]/route.ts` - Event detail API

### 🔒 Middleware & Config
- `middleware.ts` - Authentication middleware
- `tsconfig.json` - TypeScript config
- `package.json` - Dependencies
- `tailwind.config.ts` - Tailwind config

### 🗄️ Database
- `supabase-schema.sql` - Full schema with 8 tables

---

## 🎯 QUICK NAVIGATION

### Je veux éditer...

**Login/Auth**
→ `/home/user/point-du-futur/app/admin/login/page.tsx`

**Sidebar**
→ `/home/user/point-du-futur/components/admin/AdminSidebar.tsx`

**Articles Form**
→ `/home/user/point-du-futur/components/admin/articles/ArticleForm.tsx`

**Articles List**
→ `/home/user/point-du-futur/components/admin/articles/ArticlesList.tsx`

**Dashboard**
→ `/home/user/point-du-futur/app/admin/(protected)/page.tsx`

**Types**
→ `/home/user/point-du-futur/lib/types.ts`

**Database Schema**
→ `/home/user/point-du-futur/supabase-schema.sql`

**Supabase Client**
→ `/home/user/point-du-futur/lib/supabase/client.ts`

**API Routes**
→ `/home/user/point-du-futur/app/api/admin/`

---

## 🔗 DÉPENDANCES FICHIERS

```
AdminLoginPage
├─ utilise: lib/supabase/client.ts
└─ state: email, password, loading

ArticleForm
├─ utilise: lib/supabase/client.ts, lib/types.ts
├─ dépend de: react-quill
└─ props: article (optionnel)

AdminLayout
├─ utilise: lib/supabase/server.ts
├─ rend: AdminSidebar, AdminHeader
└─ children: page content

AdminSidebar
├─ utilise: next/navigation (usePathname)
├─ liste: 9 menu items
└─ rend: menu items dynamiques

Dashboard
├─ utilise: lib/supabase/server.ts
├─ requêtes: count() sur 6 tables
├─ affiche: 6 stat cards
└─ rend: articles récents + applications
```

---

## ⚠️ FICHIERS IMPORTANTS À CONNAÎTRE

1. **middleware.ts** - Toute la sécurité `/admin` dépend de ce fichier
2. **lib/supabase/client.ts** - Types Database + instance client
3. **lib/types.ts** - Tous les types Article (DB, Display, Form)
4. **supabase-schema.sql** - À exécuter dans Supabase
5. **components/admin/AdminSidebar.tsx** - Navigation principale
6. **components/admin/articles/ArticleForm.tsx** - Formulaire clé

