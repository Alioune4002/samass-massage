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
    title: '🌿 Le massage tantrique – une rencontre avec soi',
    description:
      "Je propose un massage tantrique qui va bien au-delà d’un simple moment de détente. C’est une expérience de reconnexion à soi, à son corps, à ses émotions, à son énergie vitale.<br>Chaque séance est une invitation à ralentir, à respirer, à ressentir pleinement ce qui se passe en vous, sans jugement, sans attente.<br>Le massage tantrique s’inspire des traditions orientales où le corps et l’esprit ne sont pas séparés : il s’agit d’un voyage intérieur, d’une exploration de votre énergie et de votre présence. À travers des gestes lents, enveloppants et conscients, j’accompagne chacun(e) à se relâcher profondément, à lâcher le mental, et à renouer avec cette sensation d’unité entre le corps et l’âme.<br><br><strong>🌸 Pour qui ?</strong><br>Ce massage s’adresse aussi bien aux personnes curieuses, qui souhaitent découvrir le tantrisme à travers le toucher, qu’à celles et ceux qui connaissent déjà cette pratique et désirent vivre une expérience différente, plus ancrée, plus personnalisée.<br>Chaque séance est unique, adaptée à votre énergie du moment, à vos besoins et à votre confort.<br><br><strong>✋ Mon approche</strong><br>Dans ma pratique, j’accorde une grande importance à la présence, au respect et à la confiance.<br>Avant la séance, nous définissons vos attentes, vos limites et vos besoins.<br>Le massage se déroule dans un cadre chaleureux, bienveillant et sécurisant. Rien n’est imposé, tout est vécu dans l’écoute et le respect mutuel.<br>Mon intention est simple : vous aider à vous recentrer, à mieux ressentir votre corps, à vous reconnecter à cette énergie douce et puissante qui sommeille en chacun de nous.<br><br><strong>🌞 Les bienfaits du massage tantrique</strong><br>• Libération des tensions physiques et mentales<br>• Reconnexion à son corps et à ses émotions<br>• Détente profonde et sentiment d’unité intérieure<br>• Réveil de l’énergie vitale et de la confiance en soi<br>• Apaisement du stress et amélioration du sommeil",
    prices: '60 minutes minimum ou 90 minutes | 120 min : possible',
    image: '/images/tantric-massage.jpeg',
    details:
      "Chaque séance est un moment pour vous retrouver, vous apaiser, vous redécouvrir.<br>C’est un voyage intérieur que je guide avec douceur, respect et authenticité.<br>Le massage tantrique n’est pas un soin ordinaire : c’est une rencontre, une expérience d’ouverture à soi, dans toute la simplicité du présent.",
    duration: 60,
  },
  {
    title: 'Massage Tonique – Énergie et Vitalité',
    description:
      "Je propose un <strong>massage tonique</strong> pour celles et ceux qui ont besoin de redonner du dynamisme au corps, de stimuler la circulation et de libérer les tensions tout en retrouvant une sensation de légèreté.<br>Ce massage est plus <em>rythmé</em> et <em>profond</em>, toujours dans le respect de votre confort, afin d’agir efficacement sur les muscles et les zones de fatigue.<br><br><strong>🌿 Pour qui ?</strong><br>• Personnes actives, sportives ou souvent en mouvement<br>• Raideurs, blocages, sensation de lourdeur<br>• Envie d’un soin plus stimulant qu’un massage relaxant classique<br>Chaque séance est adaptée à votre ressenti du moment et à la pression que vous aimez.<br><br><strong>✋ Mon approche</strong><br>J’alterne mouvements amples, appuis profonds et gestes dynamiques pour réveiller la vitalité du corps, avec des pressions ciblées sur les zones tendues.<br>Mon intention est de <strong>réveiller votre énergie sans vous épuiser</strong> : vous repartez à la fois détendu(e) et rechargé(e).<br><br><strong>🌞 Les bienfaits</strong><br>• Détente musculaire profonde<br>• Stimulation de la circulation sanguine et lymphatique<br>• Diminution de la fatigue physique et mentale<br>• Sensation de légèreté et d’élan retrouvé",
    prices: '45 minutes | 60 minutes',
    image: '/images/tonic-massage.jpeg',
    details:
      'Idéal pour retrouver du tonus et une meilleure récupération. Possibilité de travail localisé (dos, jambes, épaules) ou global selon vos besoins.',
    duration: 45,
  },
  {
    title: 'Massage Relaxant Simple – Douceur & Lâcher-prise',
    description:
      "Je propose un <strong>massage relaxant simple</strong> pour faire une vraie pause et se reconnecter à un calme profond. À travers des mouvements lents, fluides et enveloppants, le corps relâche ses tensions et l’esprit se pose.<br><br><strong>🌿 Pour qui ?</strong><br>• Stress, fatigue, tensions diffuses<br>• Besoin de douceur et d’apaisement<br>• Parfait pour une première expérience de massage<br>La séance est modulée selon votre besoin : plus léger pour apaiser, plus enveloppant pour relâcher en profondeur.<br><br><strong>✋ Mon approche</strong><br>Rythme lent et régulier, attention portée à la respiration et au relâchement. L’objectif est d’installer une détente progressive et durable, sans forcer le corps.<br><br><strong>🌞 Les bienfaits</strong><br>• Apaisement du stress et de l’anxiété<br>• Détente musculaire et nerveuse<br>• Amélioration du sommeil et de la récupération<br>• Sensation de paix intérieure et d’unité",
    prices: '45 ou 60 minutes',
    image: '/images/relax-massage.jpeg',
    details:
      'Une parenthèse de douceur consciente pour retrouver sérénité et confort corporel. Idéal en entretien régulier du bien-être.',
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
  { text: "Astuce : Planifiez vos séances à l'avance pour éviter le stress. #organisation #sérénité", delay: 7000 },
  { text: "Conseil #4 : Évitez l'alcool avant et après un massage pour préserver ses effets. #santé #bienêtre", delay: 6000 },
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
          className="bg-emerald-50 text-center py-10 sm:py-16 px-4 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-0 right-0 w-1/4 h-full bg-emerald-200 opacity-30 transform -skew-x-12 z-0"></div>
          <motion.h2
            className="text-3xl sm:text-5xl font-semibold text-emerald-900 mb-4 sm:mb-6 relative z-10 text-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Massage & Relaxation
          </motion.h2>
          <motion.p
            className="text-base sm:text-xl text-emerald-700 mb-6 sm:mb-8 relative z-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            ✨Chez Samass, je travaille avec présence, douceur et écoute, en adaptant chaque séance à vos besoins du moment.✨
           
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
          className="container mx-auto py-6 px-4 sm:py-8 sm:px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl sm:text-4xl font-semibold text-center text-emerald-900 mb-4 sm:mb-6">Mes Services</h3>
          <div className="relative flex justify-center items-start h-[420px] sm:h-[540px] w-full overflow-hidden mb-2 sm:mb-3">
            <AnimatePresence>
              {getPrevIndices(selectedServiceIndex).map((index, i) => (
                <motion.div
                  key={services[index].title}
                  className="absolute w-[250px] sm:w-[350px] p-3 sm:p-6 rounded-xl flex-shrink-0 cursor-pointer text-center"
                  initial={{ opacity: 0, scale: 0.7, filter: 'blur(5px)', zIndex: 5 }}
                  animate={{ opacity: 0.5, scale: 0.8, filter: 'blur(3px)' }}
                  exit={{ opacity: 0, scale: 0.7, filter: 'blur(5px)' }}
                  transition={{ duration: 0.5 }}
                  style={{ left: `${i * -20}%`, top: '6%' }}
                  onClick={() => setIsModalOpen(index)}
                >
                  <img src={services[index].image} alt={services[index].title} className="w-full h-32 sm:h-48 object-cover rounded-lg" />
                  <h4 className="text-lg sm:text-xl font-medium text-emerald-800 mt-2 sm:mt-3">{services[index].title}</h4>
                  <p className="text-gray-600 mt-1 sm:mt-2 text-sm mx-auto" style={{ textAlign: 'justify' }}>
                    {services[index].description.replace(/<[^>]+>/g, '').substring(0, 40)}...
                  </p>
                </motion.div>
              ))}
              <motion.div
                key={services[selectedServiceIndex].title}
                className="absolute w-[300px] sm:w-[400px] p-4 sm:p-6 rounded-xl bg-white shadow-2xl flex-shrink-0 cursor-pointer z-10 text-center"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5 }}
                style={{ top: 0 }}
                onClick={() => setIsModalOpen(selectedServiceIndex)}
              >
                <img src={services[selectedServiceIndex].image} alt={services[selectedServiceIndex].title} className="w-full h-40 sm:h-64 object-cover rounded-lg" />
                <h4 className="text-xl sm:text-2xl font-bold text-emerald-900 mt-2 sm:mt-4">{services[selectedServiceIndex].title}</h4>
                <p className="text-gray-700 mt-1 sm:mt-2 text-sm sm:text-base mx-auto" style={{ textAlign: 'justify' }}>
                  {services[selectedServiceIndex].description.replace(/<[^>]+>/g, '').substring(0, 50)}...
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>

        <motion.section
          className="container mx-auto py-6 px-4 sm:py-8 sm:px-6 bg-emerald-100 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl sm:text-3xl font-semibold text-center text-emerald-900 mb-3 sm:mb-4">Conseils & Infos</h3>
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
                className="bg-white rounded-xl p-4 sm:p-8 max-w-md sm:max-w-2xl w-full mx-2 sm:mx-4 text-center max-h-[90vh] flex flex-col"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img src={services[isModalOpen].image} alt={services[isModalOpen].title} className="w-full h-40 sm:h-64 object-cover rounded-lg mb-4" />
                <h4 className="text-2xl sm:text-3xl font-bold text-emerald-800">{services[isModalOpen].title}</h4>
                <div className="mt-2 sm:mt-4 text-left flex-1 overflow-y-auto pr-2">
                  <div
                    className="text-gray-600 text-base sm:text-lg leading-relaxed"
                    style={{ textAlign: 'justify' }}
                    dangerouslySetInnerHTML={{ __html: services[isModalOpen].description }}
                  />
                  <p className="mt-3 sm:mt-4 text-emerald-600 font-semibold text-lg sm:text-xl text-center">{services[isModalOpen].prices}</p>
                  <div
                    className="mt-2 sm:mt-3 text-gray-500 text-sm sm:text-base leading-relaxed"
                    style={{ textAlign: 'justify' }}
                    dangerouslySetInnerHTML={{ __html: services[isModalOpen].details }}
                  />
                </div>
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

