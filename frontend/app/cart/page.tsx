'use client';

import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  is_active: boolean;
  image: string;
}

export default function Cart() {
  const [cart, setCart] = useState<Product[]>([]);
  const stripePromise = loadStripe('pk_test_your_publishable_key'); // Remplace par ta clé publique Stripe

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart.map(item => ({ id: item.id, name: item.name, price: item.price * 100, quantity: 1 })) }),
    });
    const { url } = await response.json();
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-emerald-50 text-gray-900 font-poppins">
      <Head>
        <title>SAMASS - Panier</title>
        <meta name="description" content="Votre panier de produits SAMASS." />
      </Head>

      <nav className="bg-emerald-800 text-white p-2 sm:p-4 shadow-md">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">SAMASS</h1>
          <div className="space-x-2 sm:space-x-6">
            <Link href="/" className="hover:text-emerald-200 text-sm sm:text-base">Accueil</Link>
            <Link href="/shop" className="hover:text-emerald-200 text-sm sm:text-base">Boutique</Link>
            <Link href="/contact" className="hover:text-emerald-200 text-sm sm:text-base">Contact</Link>
            <Link href="/cart" className="hover:text-emerald-200 text-sm sm:text-base">Panier ({cart.length})</Link>
          </div>
        </div>
      </nav>

      <section className="container mx-auto py-8 px-4 sm:py-12 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold text-emerald-900 mb-6 sm:mb-10 text-center">Votre Panier</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600 text-base sm:text-lg text-center">Votre panier est vide.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-2 sm:p-4 mb-4 flex flex-col sm:flex-row justify-between items-center">
                <div className="mb-2 sm:mb-0">
                  <h3 className="text-lg sm:text-xl font-medium text-emerald-800">{item.name}</h3>
                  <p className="text-gray-600 text-base sm:text-lg">{item.price} €</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-md hover:bg-red-700 text-sm sm:text-base"
                >
                  Supprimer
                </button>
              </div>
            ))}
            <button
              onClick={handleCheckout}
              className="mt-6 w-full sm:w-auto bg-emerald-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-emerald-700 transition-colors text-base sm:text-lg"
            >
              Payer avec Stripe
            </button>
          </>
        )}
      </section>

      <footer className="bg-emerald-800 text-white text-center p-2 sm:p-4 mt-12">
        <p className="text-xs sm:text-sm">© 2025 SAMASS - Sammy Ly. Tous droits réservés.</p>
      </footer>
    </div>
  );
}