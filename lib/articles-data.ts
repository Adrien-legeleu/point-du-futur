// Données temporaires pour les articles
// Seront remplacées par les données de la BDD via l'admin

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: 'evenement' | 'temoignage' | 'actualite' | 'partenariat';
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number;
  tags: string[];
}

export const mockArticles: Article[] = [
  {
    id: '1',
    slug: 'grand-seminaire-entrepreneuriat-2024',
    title: 'Grand Séminaire Entrepreneuriat & Innovation Sociale',
    excerpt:
      "Rejoignez-nous le 15 décembre pour une journée dédiée à l'entrepreneuriat social avec des intervenants inspirants.",
    content: `
      <p>Nous sommes ravis de vous annoncer notre prochain grand séminaire sur l'entrepreneuriat et l'innovation sociale qui se tiendra le 15 décembre 2024 à Paris.</p>
      
      <h2>Programme de la journée</h2>
      <p>Cette journée exceptionnelle réunira plus de 100 participants autour de conférences, ateliers pratiques et sessions de networking.</p>
      
      <h3>Matinée (9h-12h)</h3>
      <ul>
        <li>Accueil et petit-déjeuner networking</li>
        <li>Conférence d'ouverture par Sarah Martin, entrepreneur sociale</li>
        <li>Table ronde : "Entreprendre avec impact"</li>
        <li>Ateliers thématiques en petits groupes</li>
      </ul>
      
      <h3>Après-midi (14h-18h)</h3>
      <ul>
        <li>Pitch session : 5 entrepreneurs présentent leurs projets</li>
        <li>Ateliers pratiques : Business model, financement, marketing</li>
        <li>Speed networking</li>
        <li>Clôture et pot de départ</li>
      </ul>
      
      <h2>Intervenants confirmés</h2>
      <p>Nous accueillerons des intervenants de renom issus du monde de l'entrepreneuriat social, de l'investissement à impact et de l'accompagnement de startups.</p>
      
      <h2>Inscription</h2>
      <p>Places limitées à 100 participants. Inscriptions ouvertes jusqu'au 10 décembre.</p>
    `,
    image: '/images/actualites/seminaire-entrepreneuriat.jpg',
    category: 'evenement',
    author: {
      name: 'Mamadou Niang',
      avatar: '👨🏾‍💼',
    },
    publishedAt: '2024-11-01',
    readTime: 5,
    tags: ['Entrepreneuriat', 'Innovation', 'Séminaire'],
  },
  {
    id: '2',
    slug: 'temoignage-sarah-parcours-inspirant',
    title: 'Sarah : De boursière à ingénieure chez Google',
    excerpt:
      "Découvrez le parcours inspirant de Sarah, ancienne membre de Pont du Futur, aujourd'hui ingénieure logiciel chez Google.",
    content: `
      <p>Sarah Martin, 26 ans, est aujourd'hui ingénieure logiciel chez Google Paris. Mais son parcours n'a pas toujours été facile.</p>
      
      <h2>Les débuts difficiles</h2>
      <p>Issue d'une famille modeste de banlieue parisienne, Sarah a dû surmonter de nombreux obstacles pour accéder aux études supérieures. "Je ne connaissais personne qui avait fait de grandes études. Je ne savais même pas que des écoles d'ingénieurs existaient", confie-t-elle.</p>
      
      <h2>La rencontre avec Pont du Futur</h2>
      <p>C'est en première année de licence informatique que Sarah découvre Pont du Futur. "J'étais perdue, je manquais de confiance en moi et je pensais abandonner mes études", raconte-t-elle.</p>
      
      <p>L'association lui attribue un mentor, Marc, ingénieur senior dans une grande entreprise tech. Pendant 2 ans, ils se rencontrent régulièrement. Marc l'aide à préparer ses candidatures aux écoles d'ingénieurs, la conseille sur son orientation et lui ouvre son réseau professionnel.</p>
      
      <h2>Le déclic</h2>
      <p>"Marc m'a fait comprendre que j'avais ma place dans ce milieu. Il m'a donné confiance en mes capacités", explique Sarah. Grâce à cet accompagnement, elle intègre une école d'ingénieurs prestigieuse.</p>
      
      <h2>Aujourd'hui</h2>
      <p>Diplômée depuis 2 ans, Sarah travaille maintenant sur des projets d'intelligence artificielle chez Google. Mais elle n'oublie pas d'où elle vient : elle est aujourd'hui mentor bénévole pour Pont du Futur.</p>
      
      <p>"Je veux donner aux autres ce qu'on m'a donné : de l'espoir, des conseils, et la preuve qu'on peut y arriver", conclut-elle avec le sourire.</p>
    `,
    image: '/images/actualites/temoignage-sarah.jpg',
    category: 'temoignage',
    author: {
      name: 'Léa Dubois',
      avatar: '👩🏻‍💼',
    },
    publishedAt: '2024-10-28',
    readTime: 8,
    tags: ['Témoignage', 'Réussite', 'Tech'],
  },
  {
    id: '3',
    slug: 'nouveau-partenariat-bnp-paribas',
    title: 'Nouveau partenariat avec BNP Paribas',
    excerpt:
      'BNP Paribas devient partenaire officiel de Pont du Futur et soutiendra nos programmes de mentorat pour les 3 prochaines années.',
    content: `
      <p>Nous sommes fiers d'annoncer un nouveau partenariat stratégique avec BNP Paribas, qui devient partenaire officiel de Pont du Futur.</p>
      
      <h2>Un engagement sur 3 ans</h2>
      <p>Ce partenariat, signé pour une durée de 3 ans, permettra de financer nos programmes de mentorat et d'étendre nos actions à de nouvelles villes en France.</p>
      
      <h2>Des collaborateurs BNP Paribas mentors</h2>
      <p>Dans le cadre de ce partenariat, 30 collaborateurs de BNP Paribas deviendront mentors bénévoles auprès de nos jeunes. Ils partageront leur expertise en finance, management, et entrepreneuriat.</p>
      
      <h2>Des ateliers thématiques</h2>
      <p>BNP Paribas organisera également des ateliers mensuels sur des thématiques clés :</p>
      <ul>
        <li>Education financière</li>
        <li>Gestion de budget personnel</li>
        <li>Entrepreneuriat et création d'entreprise</li>
        <li>Investissement et épargne</li>
      </ul>
      
      <h2>Un impact concret</h2>
      <p>Grâce à ce partenariat, nous pourrons accompagner 50 jeunes supplémentaires chaque année et ouvrir de nouveaux antennes à Lyon et Marseille.</p>
      
      <p>"Ce partenariat avec BNP Paribas marque une étape importante dans le développement de Pont du Futur. Leur soutien nous permettra d'amplifier notre impact et d'aider encore plus de jeunes à réussir", déclare Mamadou Niang, fondateur de l'association.</p>
    `,
    image: '/images/actualites/partenariat-bnp.jpg',
    category: 'partenariat',
    author: {
      name: 'Emma Chen',
      avatar: '👩🏻‍💼',
    },
    publishedAt: '2024-10-20',
    readTime: 4,
    tags: ['Partenariat', 'Finance', 'Mentorat'],
  },
  {
    id: '4',
    slug: 'lancement-programme-orientation-2025',
    title: "Lancement du programme d'orientation 2025",
    excerpt:
      "Inscriptions ouvertes pour notre nouveau programme d'orientation destiné aux lycéens et étudiants en recherche de leur voie.",
    content: `
      <p>Nous sommes heureux d'annoncer le lancement de notre programme d'orientation 2025, spécialement conçu pour les lycéens et étudiants en quête de leur voie professionnelle.</p>
      
      <h2>Un programme complet</h2>
      <p>Ce programme de 6 mois combine ateliers collectifs, rencontres avec des professionnels et accompagnement personnalisé.</p>
      
      <h3>Les ateliers</h3>
      <ul>
        <li>Découverte de soi et de ses talents</li>
        <li>Exploration des métiers et secteurs</li>
        <li>Techniques de recherche d'information</li>
        <li>Préparation aux études supérieures</li>
        <li>Construction de son projet professionnel</li>
      </ul>
      
      <h3>Les rencontres professionnelles</h3>
      <p>Chaque mois, rencontrez des professionnels de différents secteurs qui partagent leur parcours et répondent à vos questions.</p>
      
      <h2>Public cible</h2>
      <p>Ce programme s'adresse aux lycéens (Première et Terminale) et étudiants (Licence) qui :</p>
      <ul>
        <li>Hésitent sur leur orientation</li>
        <li>Veulent découvrir des métiers</li>
        <li>Cherchent à construire leur projet professionnel</li>
        <li>Souhaitent être accompagnés dans leurs choix</li>
      </ul>
      
      <h2>Inscription</h2>
      <p>Les inscriptions sont ouvertes jusqu'au 15 janvier 2025. Places limitées à 30 participants.</p>
      <p>Le programme débutera en février 2025 et se terminera en juillet 2025.</p>
    `,
    image: '/images/actualites/orientation-2025.jpg',
    category: 'actualite',
    author: {
      name: 'Ahmed Kazi',
      avatar: '👨🏽‍💼',
    },
    publishedAt: '2024-10-15',
    readTime: 6,
    tags: ['Orientation', 'Programme', 'Jeunesse'],
  },
  {
    id: '5',
    slug: 'colloque-integration-reussite-mars-2025',
    title: 'Colloque "Intégration et Réussite" - Mars 2025',
    excerpt:
      'Save the date ! Notre grand colloque annuel aura lieu en mars 2025 et réunira experts, chercheurs et acteurs de terrain.',
    content: `
      <p>Marquez vos calendriers ! Le grand colloque annuel de Pont du Futur "Intégration et Réussite : Les défis de demain" se tiendra en mars 2025.</p>
      
      <h2>Un événement d'envergure</h2>
      <p>Cette journée complète réunira plus de 200 participants : chercheurs, acteurs associatifs, responsables politiques, et citoyens engagés.</p>
      
      <h2>Les thématiques</h2>
      <p>Quatre grandes thématiques seront abordées :</p>
      
      <h3>1. Politiques d'intégration en France</h3>
      <p>État des lieux et perspectives d'évolution des politiques publiques d'intégration.</p>
      
      <h3>2. Réussite scolaire et égalité des chances</h3>
      <p>Comment garantir l'égalité des chances dans l'éducation ? Quels leviers d'action ?</p>
      
      <h3>3. Entrepreneuriat et diversité</h3>
      <p>L'entrepreneuriat comme voie d'intégration et de réussite sociale.</p>
      
      <h3>4. Témoignages de parcours inspirants</h3>
      <p>Des jeunes qui ont réussi racontent leur parcours et partagent leurs conseils.</p>
      
      <h2>Les intervenants</h2>
      <p>Nous accueillerons :</p>
      <ul>
        <li>Des sociologues et chercheurs spécialistes des questions d'intégration</li>
        <li>Des responsables de grandes associations</li>
        <li>Des entrepreneurs engagés</li>
        <li>Des élus et responsables politiques</li>
        <li>Des jeunes témoins de parcours inspirants</li>
      </ul>
      
      <h2>Inscriptions</h2>
      <p>Les inscriptions ouvriront en janvier 2025. Restez connectés !</p>
    `,
    image: '/images/actualites/colloque-2025.jpg',
    category: 'evenement',
    author: {
      name: 'Mamadou Niang',
      avatar: '👨🏾‍💼',
    },
    publishedAt: '2024-10-10',
    readTime: 5,
    tags: ['Colloque', 'Intégration', 'Débat'],
  },
  {
    id: '6',
    slug: 'bilan-2024-124-jeunes-accompagnes',
    title: 'Bilan 2024 : 124 jeunes accompagnés vers la réussite',
    excerpt:
      'Découvrez le bilan de notre année 2024 : 124 jeunes accompagnés, 45 mentors engagés, et un taux de réussite de 89%.',
    content: `
      <p>Alors que l'année 2024 touche à sa fin, nous sommes fiers de partager avec vous le bilan de nos actions.</p>
      
      <h2>Les chiffres clés</h2>
      <ul>
        <li><strong>124 jeunes accompagnés</strong> tout au long de l'année</li>
        <li><strong>45 mentors bénévoles</strong> engagés à nos côtés</li>
        <li><strong>89% de taux de réussite</strong> (obtention du diplôme, insertion professionnelle)</li>
        <li><strong>24 événements organisés</strong> (séminaires, ateliers, colloques)</li>
        <li><strong>8 nouveaux partenaires</strong> nous ont rejoint</li>
      </ul>
      
      <h2>Nos réussites</h2>
      
      <h3>Programme de mentorat</h3>
      <p>Notre programme phare a accompagné 50 binômes mentor-mentoré sur 6 mois. 92% des mentorés déclarent avoir gagné en confiance et en clarté sur leur projet professionnel.</p>
      
      <h3>Ateliers d'orientation</h3>
      <p>12 ateliers d'orientation ont été organisés, touchant plus de 200 participants. Ces ateliers ont permis à de nombreux jeunes de découvrir des métiers et de construire leur projet.</p>
      
      <h3>Séminaires thématiques</h3>
      <p>6 grands séminaires ont réuni plus de 600 participants autour de thématiques variées : entrepreneuriat, intelligence artificielle, transition écologique, etc.</p>
      
      <h2>Témoignages</h2>
      <blockquote>
        "Pont du Futur m'a permis de rencontrer des personnes inspirantes et de croire en mes capacités. Aujourd'hui, je suis en école d'ingénieur et je réalise mes rêves !"
        <cite>- Karim, 22 ans</cite>
      </blockquote>
      
      <h2>Perspectives 2025</h2>
      <p>Fort de ces résultats encourageants, nous ambitionnons pour 2025 de :</p>
      <ul>
        <li>Accompagner 150 jeunes (objectif +20%)</li>
        <li>Recruter 60 mentors bénévoles</li>
        <li>Ouvrir 2 nouveaux antennes (Lyon et Marseille)</li>
        <li>Lancer 3 nouveaux programmes thématiques</li>
      </ul>
      
      <p>Un grand merci à tous nos bénévoles, partenaires et soutiens qui rendent tout cela possible !</p>
    `,
    image: '/images/actualites/bilan-2024.jpg',
    category: 'actualite',
    author: {
      name: 'Mamadou Niang',
      avatar: '👨🏾‍💼',
    },
    publishedAt: '2024-10-05',
    readTime: 7,
    tags: ['Bilan', 'Impact', 'Réussite'],
  },
];

export const categories = [
  { value: 'all', label: 'Toutes les catégories', color: 'gray' },
  { value: 'evenement', label: 'Événements', color: 'blue' },
  { value: 'temoignage', label: 'Témoignages', color: 'green' },
  { value: 'actualite', label: 'Actualités', color: 'orange' },
  { value: 'partenariat', label: 'Partenariats', color: 'purple' },
];
