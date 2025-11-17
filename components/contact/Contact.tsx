import ContactForm from './ContactForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-zinc-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-600/80 mb-6">
            Contactez-nous
          </h1>
          <p className="text-md text-gray-600 max-w-3xl mx-auto">
            Une question ? Une envie de nous rejoindre ? Écrivez-nous, nous
            serons ravis d'échanger avec vous.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Formulaire */}
          <ContactForm />

          {/* Infos */}
          <div className="space-y-10">
            <div className="">
              <h2 className="text-2xl font-bold text-primary-500 mb-6">
                Nos coordonnées
              </h2>
              <div className="">
                <div className="flex items-center border-b-2 border-primary-100/50  pb-6 pt-4 gap-4">
                  <Mail className="w-6 h-6 text-primary-500/80" />
                  <div>
                    <a
                      href="mailto:contact@pontdufutur.org"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      contact@pontdufutur.org
                    </a>
                  </div>
                </div>
                <div className="flex items-center border-b-2 border-primary-100/50 pb-6 pt-4 gap-4">
                  <Phone className="w-6 h-6 text-primary-500/80" />
                  <div>
                    <a
                      href="mailto:contact@pontdufutur.org"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      contact@pontdufutur.org
                    </a>
                  </div>
                </div>
                <div className="flex items-center border-b-2 border-primary-100/50  pb-6 pt-4  gap-4">
                  <MapPin className="w-6 h-6 text-primary-500/80" />
                  <div>
                    <p className="text-gray-600">
                      123 Rue de l'Avenir
                      <br />
                      75001 Paris, France
                    </p>
                  </div>
                </div>
                <div className="flex items-center border-b-2 border-primary-100/50  pb-6 pt-4  gap-4">
                  <Clock className="w-6 h-6 text-primary-500/80" />
                  <div>
                    <p className="text-gray-600">
                      Lundi - Vendredi
                      <br />
                      9h00 - 18h00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className=" text-black">
              <p className="mb-6 opacity-90">
                Que vous soyez jeune, mentor, bénévole ou partenaire, il y a une
                place pour vous chez Pont du Futur.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-600/80 rounded-full" />
                  Devenez membre
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-600/80 rounded-full" />
                  Devenez mentor bénévole
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-600/80 rounded-full" />
                  Soutenez nos actions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-600/80 rounded-full" />
                  Devenez partenaire
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
