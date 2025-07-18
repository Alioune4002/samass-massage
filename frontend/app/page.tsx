'use client';

import './globals.css';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const services = [
  {
    title: 'Massage Tantrique – Sensorialité & Abandon du Corps',
    description: 'Une expérience corporelle complète et profonde pour se reconnecter à soi avec plaisir et abandon.',
    prices: '60 min: 70€ | 90 min: 110€ | 120 min: Possible',
    image: '/images/tantric-massage.jpeg',
    details: 'Inclut un accueil bienveillant, huile chaude, toucher sensuel, respiration guidée, zone intime (optionnelle avec consentement), et retour au calme.',
    duration: 60,
  },
  {
    title: 'Massage Tonique – Énergie et Vitalité',
    description: 'Un massage dynamique pour revitaliser le corps et réveiller le tonus musculaire.',
    prices: '45 min: 55€ | 60 min: 70€',
    image: '/images/tonic-massage.jpeg',
    details: 'Comprend un échauffement musculaire, pétissage énergique, pressions et percussions ciblées, avec option de travail localisé ou global.',
    duration: 45,
  },
  {
    title: 'Massage Relaxant Simple – Douceur & Lâcher-prise',
    description: 'Un moment de tendresse et de calme pour apaiser l’esprit et le corps sans intensité.',
    prices: '45 min: 55€',
    image: '/images/relax-massage.jpeg',
    details: 'Offre une ambiance apaisante, toucher doux et caressant, rythme régulier avec gestes enveloppants pour une détente profonde.',
    duration: 45,
  },
];

const infoSlides = [
  { text: 'Conseil #1 : Hydratez-vous après un massage pour maximiser les bienfaits. #conseils #bienetre', delay: 5000 },
  { text: 'Utilisez notre site pour réserver facilement vos séances. #utilisationdusite #facile', delay: 5000 },
  { text: 'Astuce : Prenez un moment de relaxation quotidienne. #bienetre #relaxation', delay: 7000 },
  { text: 'Conseil #2 : Évitez les repas lourds avant un massage pour un confort optimal. #santé #préparation', delay: 6000 },
  { text: 'Astuce : Portez des vêtements confortables pour votre séance. #conseil #détente', delay: 6500 },
  { text: 'Conseil #3 : Respirez profondément pendant le massage pour amplifier la relaxation. #respiration #bienêtre', delay: 5500 },
  { text: 'Astuce : Planifiez vos séances à l\'avance pour éviter le stress. #organisation #sérénité', delay: 7000 },
  { text: 'Conseil #4 : Évitez l\'alcool avant et après un massage pour préserver ses effets. #santé #bienêtre', delay: 6000 },
  { text: 'Astuce : Discutez de vos tensions avec le masseur pour un soin personnalisé. #communication #relaxation', delay: 6500 },
  { text: 'Conseil #5 : Hydratez votre peau avec une crème après le massage. #soin #peau', delay: 5500 },
];

export default function Home() {
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const serviceInterval = setInterval(() => {
      setSelectedServiceIndex((prev) => (prev + 1) % services.length);
    }, 5000);
    const infoInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % infoSlides.length);
    }, infoSlides[currentSlide].delay);
    return () => {
      clearInterval(serviceInterval);
      clearInterval(infoInterval);
    };
  }, [currentSlide]);

  const getPrevIndices = (current: number) => {
    const prev1 = (current - 1 + services.length) % services.length;
    const prev2 = (current - 2 + services.length) % services.length;
    return [prev2, prev1];
  };

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50 text-gray-900 font-poppins">
      <Head>
        <title>SAMASS - Massage & Relax</title>
        <meta name="description" content="Massages professionnels et huiles par Sammy Ly (SAMASS)." />
      </Head>

      <Navbar />
      <main className="flex-grow">
        <motion.section
          className="bg-emerald-50 text-center py-12 sm:py-20 px-4 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-0 right-0 w-1/4 h-full bg-emerald-200 opacity-30 transform -skew-x-12 z-0"></div>
          <motion.h2
            className="text-3xl sm:text-5xl font-semibold text-emerald-900 mb-4 sm:mb-6 relative z-10"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Massage & Relaxation
          </motion.h2>
          <motion.p
            className="text-base sm:text-xl text-emerald-700 mb-6 sm:mb-8 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            L’art de la détente par Sammy
          </motion.p>
          <Link href="/shop">
            <motion.button
              className="bg-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-emerald-700 transition-all duration-300 shadow-md relative z-10 text-base sm:text-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Découvrir la boutique
            </motion.button>
          </Link>
        </motion.section>

        <motion.section
          className="container mx-auto py-8 px-4 sm:py-16 sm:px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl sm:text-4xl font-semibold text-center text-emerald-900 mb-6 sm:mb-10">Mes Services</h3>
          <div className="relative flex justify-center items-center h-64 sm:h-96 w-full overflow-hidden">
            <AnimatePresence>
              {getPrevIndices(selectedServiceIndex).map((index, i) => (
                <motion.div
                  key={services[index].title}
                  className="absolute w-[250px] sm:w-[350px] p-3 sm:p-6 rounded-xl flex-shrink-0 cursor-pointer"
                  initial={{ opacity: 0, scale: 0.7, filter: 'blur(5px)', zIndex: 5 }}
                  animate={{ opacity: 0.5, scale: 0.8, filter: 'blur(3px)' }}
                  exit={{ opacity: 0, scale: 0.7, filter: 'blur(5px)' }}
                  transition={{ duration: 0.5 }}
                  style={{ left: `${i * -20}%`, top: '10%' }}
                  onClick={() => setIsModalOpen(index)}
                >
                  <img src={services[index].image} alt={services[index].title} className="w-full h-32 sm:h-48 object-cover rounded-lg" />
                  <h4 className="text-lg sm:text-xl font-medium text-emerald-800 mt-2 sm:mt-3">{services[index].title}</h4>
                  <p className="text-gray-600 mt-1 sm:mt-2 text-sm">{services[index].description.substring(0, 40)}...</p>
                </motion.div>
              ))}
              <motion.div
                key={services[selectedServiceIndex].title}
                className="absolute w-[300px] sm:w-[400px] p-4 sm:p-6 rounded-xl bg-white shadow-2xl flex-shrink-0 cursor-pointer z-10"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }} // Pas de flou pour l'avant-plan
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5 }}
                style={{ top: 0 }}
                onClick={() => setIsModalOpen(selectedServiceIndex)}
              >
                <img src={services[selectedServiceIndex].image} alt={services[selectedServiceIndex].title} className="w-full h-40 sm:h-64 object-cover rounded-lg" />
                <h4 className="text-xl sm:text-2xl font-bold text-emerald-900 mt-2 sm:mt-4">{services[selectedServiceIndex].title}</h4>
                <p className="text-gray-700 mt-1 sm:mt-2 text-sm sm:text-base">{services[selectedServiceIndex].description.substring(0, 50)}...</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>

        <motion.section
          className="container mx-auto py-6 px-4 sm:py-10 sm:px-6 bg-emerald-100 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl sm:text-3xl font-semibold text-center text-emerald-900 mb-4 sm:mb-6">Conseils & Infos</h3>
          <div className="relative overflow-hidden h-16 sm:h-20">
            <motion.div
              className="absolute w-full text-center text-base sm:text-lg text-emerald-800"
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {infoSlides[currentSlide].text}
            </motion.div>
          </div>
        </motion.section>

        <AnimatePresence>
          {isModalOpen !== null && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(null)}
            >
              <motion.div
                className="bg-white rounded-xl p-4 sm:p-8 max-w-md sm:max-w-2xl w-full mx-2 sm:mx-4 text-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img src={services[isModalOpen].image} alt={services[isModalOpen].title} className="w-full h-40 sm:h-64 object-cover rounded-lg mb-4" />
                <h4 className="text-2xl sm:text-3xl font-bold text-emerald-800">{services[isModalOpen].title}</h4>
                <p className="text-gray-600 mt-2 sm:mt-4 text-base sm:text-lg">{services[isModalOpen].description}</p>
                <p className="mt-2 sm:mt-4 text-emerald-600 font-semibold text-lg sm:text-xl">{services[isModalOpen].prices}</p>
                <p className="mt-1 sm:mt-2 text-gray-500 text-sm sm:text-base">{services[isModalOpen].details}</p>
                <Link href="/reservation">
                  <button
                    className="mt-4 sm:mt-6 bg-emerald-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-emerald-700 transition-all duration-300 text-base sm:text-lg"
                    onClick={() => setIsModalOpen(null)}
                  >
                    Réserver une séance pour ce massage
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}