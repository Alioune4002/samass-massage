'use client';

import Head from 'next/head';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Types
type Value = Date | [Date, Date] | null;

interface Availability {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

export default function Admin() {
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('60');

  // Token d'authentification (à récupérer après login ou stocker dans localStorage)
  const [authToken, setAuthToken] = useState<string | null>("b15b4087afe47e52c60ab9d2110473b09b78e5af");

  useEffect(() => {
    // Simuler un login initial (à remplacer par une vraie logique d'auth)
    const token = localStorage.getItem('authToken'); // Exemple : récupère le token stocké
    if (token) setAuthToken(token);
    if (isAdminMode && token) fetchAvailabilities();
  }, [isAdminMode]);

  const handleAdminLogin = (password: string) => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'admin123') {
      setIsAdminMode(true);
      // Simule l'obtention d'un token (remplace par une vraie requête API)
      const dummyToken = 'abc123...'; // Remplace par le vrai token obtenu
      setAuthToken(dummyToken);
      localStorage.setItem('authToken', dummyToken); // Stocke le token
      fetchAvailabilities();
    } else {
      alert('Mot de passe incorrect.');
    }
  };

  const fetchAvailabilities = async () => {
    if (!authToken) {
      console.error('Aucun token d\'authentification trouvé.');
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/api/availabilities/', {
        headers: {
          'Authorization': `Token ${authToken}`, // Utilise le token
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const availabilitiesData = Array.isArray(data) ? data : data.results || [];
      setAvailabilities(availabilitiesData);
    } catch (error) {
      console.error('Erreur chargement disponibilités:', error);
      setAvailabilities([]);
    }
  };

  const handleAvailabilityAction = async () => {
    if (!authToken || !selectedDate || !selectedTime || !selectedDuration) {
      alert('Authentification ou données manquantes.');
      return;
    }
    const dateStr = selectedDate.toISOString().split('T')[0];
    const endTime = new Date(new Date(`${dateStr}T${selectedTime}`).getTime() + parseInt(selectedDuration) * 60000)
      .toISOString()
      .split('T')[1]
      .slice(0, 5);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/google-calendar/add-availability/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${authToken}`, // Ajoute le token
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          date: dateStr,
          start_time: selectedTime,
          duration: selectedDuration,
        }).toString(),
      });
      if (response.ok) {
        fetchAvailabilities();
        alert('Disponibilité ajoutée avec succès.');
      } else {
        const errorData = await response.json();
        alert(`Erreur: ${errorData.detail || 'Unauthorized'}`);
      }
    } catch (error) {
      console.error('Erreur ajout disponibilité:', error);
      alert('Erreur lors de l\'ajout.');
    }
  };

  const handleDateSelect = (value: Value) => {
    const date = Array.isArray(value) ? value[0] : value;
    if (date instanceof Date) setSelectedDate(date);
  };

  const handleTimeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
  };

  if (!isAdminMode) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-emerald-50 text-gray-900 font-poppins">
        <Head><title>SAMASS - Admin</title></Head>
        <Navbar />
        <main className="flex-grow">
          <section className="container mx-auto py-16 px-4">
            <div className="max-w-md mx-auto text-center">
              <h1 className="text-4xl font-bold text-emerald-900 mb-6">Page Admin</h1>
              <input
                type="password"
                placeholder="Mot de passe admin"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="mb-4 p-2 rounded-lg border border-gray-300 w-full"
              />
              <button
                className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
                onClick={() => handleAdminLogin(adminPassword)}
              >
                Se connecter
              </button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-emerald-50 text-gray-900 font-poppins">
      <Head><title>SAMASS - Admin</title></Head>
      <Navbar />
      <main className="flex-grow">
        <section className="container mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold text-emerald-900 mb-6 text-center">Gestion des Disponibilités</h1>
          <Calendar
            onChange={handleDateSelect as any}
            value={selectedDate}
            className="mb-4 mx-auto"
            tileClassName={({ date }) => {
              const dateStr = date.toISOString().split('T')[0];
              const hasAvailability = Array.isArray(availabilities) && availabilities.some((a) => a.date === dateStr);
              const hasBooked = Array.isArray(availabilities) && availabilities.some((a) => a.date === dateStr && a.is_booked);
              return hasAvailability ? (hasBooked ? 'bg-red-200' : 'bg-green-200') : '';
            }}
          />
          {selectedDate && (
            <div className="max-w-md mx-auto space-y-4">
              <input
                type="time"
                value={selectedTime}
                onChange={handleTimeSelect}
                className="w-full p-2 border rounded"
              />
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="30">30 min</option>
                <option value="60">60 min</option>
                <option value="90">90 min</option>
              </select>
              <button
                className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
                onClick={handleAvailabilityAction}
                disabled={!selectedTime || !selectedDuration}
              >
                Ajouter Disponibilité
              </button>
              {Array.isArray(availabilities) && availabilities.map((a) => (
                <div key={a.id} className="bg-white p-4 rounded-lg shadow-md">
                  <p><strong>Date :</strong> {new Date(a.date).toLocaleDateString()}</p>
                  <p><strong>Heure :</strong> {a.start_time} - {a.end_time}</p>
                  <p><strong>Réservé :</strong> {a.is_booked ? 'Oui' : 'Non'}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}