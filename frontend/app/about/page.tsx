'use client';

import Head from 'next/head';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-emerald-50 text-gray-900 font-poppins">
      <Head>
        <title>SAMASS - À propos</title>
        <meta name="description" content="En savoir plus sur Sammy Ly et SAMASS." />
      </Head>

      <Navbar />
      <main className="flex-grow">
        <motion.section
          className="container mx-auto py-8 px-4 sm:py-12 sm:px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-6 sm:mb-8 text-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            À propos de Sammy🌸
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            ✋ Je suis Sammy, masseur diplômé et passionné. Formé à l’École Française du Massage, j’ai choisi ce métier par vocation : j’aime le toucher juste, l’écoute du corps, et la capacité qu’a un bon massage à transformer un état physique et émotionnel. Je suis jeune, à l’écoute, et j’accorde une grande importance à la qualité de la relation que j’instaure avec chaque personne que je reçois. Mon approche est humaine, bienveillante et professionnelle : chaque séance est adaptée à vos besoins, vos limites, votre état du moment. J’ai à cœur de proposer des massages qui ont du sens : qu’ils soient toniques, relaxants ou sensoriels, ils sont toujours réalisés dans le respect, la présence, et avec une vraie attention à votre ressenti.
          </motion.p>
          <motion.p
            className="text-xl sm:text-2xl font-bold text-emerald-600 mb-3 sm:mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            🌿 Une touche personnelle : mes huiles maison
          </motion.p>
          <motion.p
            className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Je prépare aussi des huiles que j’utilise pour certains de mes massages. Elles ne sont pas disponibles à la vente, car elles sont conçues uniquement pour mes soins, avec des ingrédients choisis pour leur douceur, leur glisse, et leur parfum subtil. Mon but ? Vous offrir un moment vrai, un temps de pause, un espace pour vous reconnecter à votre corps dans un cadre simple, clair et respectueux.
          </motion.p>
          <motion.p
            className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            À très bientôt,
          </motion.p>
          <motion.p
            className="text-base sm:text-lg text-gray-700 font-semibold text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Sammy
          </motion.p>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <motion.img
              src="/images/about1.jpg"
              alt="Sammy Ly en action"
              className="w-full h-32 sm:h-48 object-cover rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />
            <motion.img
              src="/images/about2.jpg"
              alt="Huiles naturelles"
              className="w-full h-32 sm:h-48 object-cover rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            />
            <motion.img
              src="/images/about3.png"
              alt="Ambiance relaxante"
              className="w-full h-32 sm:h-48 object-cover rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            />
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}