'use client';

import Head from 'next/head';
import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaPhoneAlt, FaWhatsapp, FaFacebookF } from 'react-icons/fa';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponse(null);
    console.log('Formulaire soumis:', { name, email, phone, message }); // Débogage
    try {
      const formData = new URLSearchParams();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('message', message);

      const res = await axios.post('https://samass-massage.onrender.com/api/contact/', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      setResponse(res.data.message || 'Message envoyé avec succès. Une confirmation vous sera envoyée par email.');
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || 'Erreur lors de l\'envoi. Veuillez réessayer ou contacter Sammy directement.';
      setResponse(errorMsg);
      console.error('Erreur:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-emerald-50 text-gray-900 font-poppins">
      <Head>
        <title>SAMASS - Contact</title>
        <meta name="description" content="Contactez SAMASS pour vos questions." />
      </Head>

      <Navbar />
      <main className="flex-grow">
        <section className="container mx-auto py-8 px-4 sm:py-12 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-6 sm:mb-8 text-center">
            Contactez Sammy👇
          </h1>

          {/* Bloc de contact direct */}
          <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 mb-10 max-w-lg mx-auto text-center">
            <h2 className="text-2xl font-semibold text-emerald-900 mb-3">
              📞 Joindre directement le masseur
            </h2>
            <p className="text-gray-700 mb-4 text-base sm:text-lg">
              Pour toute question ou prise de rendez-vous rapide :
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href="tel:+33745558731"
                className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                <FaPhoneAlt /> +33 7 45 55 87 31
              </a>

              <a
                href="https://wa.me/33745558731"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-emerald-600 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-50 transition"
              >
                <FaWhatsapp /> WhatsApp
              </a>

              <a
                href="https://www.facebook.com/share/1GW8VSe5Jt/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-emerald-600 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-50 transition"
              >
                <FaFacebookF /> Facebook
              </a>
            </div>
          </div>

          {/* Formulaire */}
          <div className="max-w-xs sm:max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-base sm:text-lg"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-base sm:text-lg"
                required
              />
              <input
                type="tel"
                placeholder="Téléphone (facultatif)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-base sm:text-lg"
              />
              <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg h-24 text-base sm:text-lg"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed text-base sm:text-lg"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
              </button>
            </form>

            {response && (
              <p className={`mt-4 text-center ${response.includes('succès') || response.includes('envoyé') ? 'text-green-600' : 'text-red-600'} text-base sm:text-lg font-medium`}>
                {response}
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}