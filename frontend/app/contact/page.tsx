'use client';

import Head from 'next/head';
import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('message', message);

      const res = await axios.post('http://127.0.0.1:8000/api/contact/', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      setResponse(res.data.message);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error: any) {
      setResponse(`Erreur lors de l'envoi: ${error.response?.data?.error || 'Vérifiez la console'}`);
      console.error('Erreur:', error);
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
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-6 sm:mb-8 text-center">Contactez Sammy👇</h1>
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
                className="w-full bg-emerald-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-emerald-700 text-base sm:text-lg"
              >
                Envoyer
              </button>
            </form>
            {response && <p className="mt-4 text-center text-gray-700 text-base sm:text-lg">{response}</p>}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}