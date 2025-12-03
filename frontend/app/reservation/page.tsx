'use client';

import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

type DurationsPrices = { [key: string]: number };

const services: { title: string; durations_prices: DurationsPrices }[] = [
  { title: 'Massage Tantrique', durations_prices: { "60": 60.00, "90": 80.00 } },
  { title: 'Massage Tonique', durations_prices: { "45": 45.00, "60": 60.00 } },
  { title: 'Massage Relaxant', durations_prices: { "30": 30.00, "45": 45.00 } },
];

export default function Reservation() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAvailabilities();
  }, []);

  const fetchAvailabilities = async () => {
    try {
      const response = await fetch('https://samassbysam.com/availabilities/');
      if (!response.ok) throw new Error('Erreur API');
      const data = await response.json();
      const availabilitiesData = Array.isArray(data) ? data : data.results || [];
      if (availabilitiesData.length === 0) {
        setResponse(
          'Aucune disponibilité n\'a été ajoutée par Sammy. Pour réserver, veuillez le contacter directement via notre <a href="/contact" className="text-emerald-600 underline">page de contact</a>.'
        );
      }
    } catch (error) {
      console.error('Erreur chargement disponibilités:', error);
      setResponse(
        'Une erreur technique est survenue. Pour réserver, veuillez contacter Sammy directement via notre <a href="/contact" className="text-emerald-600 underline">page de contact</a>.'
      );
    }
  };

  const getAvailableTimes = (date: Date) => {
    if (!selectedDuration) return [];
    const dateStr = date.toISOString().split('T')[0];
    return []; 
  };

  const bookAppointment = async () => {
    if (selectedService && selectedDuration && selectedDate && selectedTime && userName && userEmail) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const endTime = new Date(new Date(`${dateStr}T${selectedTime}`).getTime() + parseInt(selectedDuration) * 60000)
        .toISOString()
        .split('T')[1]
        .slice(0, 5);
      const service = services.find((s) => s.title === selectedService);
      const price = selectedDuration ? service?.durations_prices[selectedDuration] || 0.00 : 0.00;

      try {
        const res = await fetch('https://samassbysam.com/google-calendar/book-appointment/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            user_name: userName,
            user_email: userEmail,
            user_phone: userPhone,
            service: selectedService,
            duration: selectedDuration,
            date: dateStr,
            time: selectedTime,
            special_request: specialRequest,
            price: price.toString(),
          }).toString(),
        });
        const data = await res.json();
        if (res.ok) {
          setResponse(data.message);
          setStep(4);
        } else {
          setResponse('Erreur lors de la réservation.');
        }
      } catch (error) {
        console.error('Erreur réservation:', error);
        setResponse('Erreur technique.');
      }

      setUserName('');
      setUserEmail('');
      setUserPhone('');
      setSpecialRequest('');
    } else {
      setResponse('Veuillez remplir tous les champs obligatoires.');
    }
  };

  const handleDateChange = (value: any) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      setStep(2);
    }
  };

  const nextStep = () => {
    if (step === 1 && selectedService && selectedDuration) setStep(2);
    else if (step === 2 && selectedDate && selectedTime) setStep(3);
    else if (step === 3 && userName && userEmail) setStep(4);
  };

  const scrollToCalendar = () => {
    if (calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-emerald-50 text-gray-900 font-poppins">
      <Head><title>SAMASS - Réservation</title></Head>
      <Navbar />
      <main className="flex-grow">
        <motion.section
          className="container mx-auto py-8 px-4 sm:py-12 sm:px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-6 sm:mb-8 text-center">Réservation</h1>

          <div className="max-w-xs sm:max-w-md mx-auto text-center mb-6 sm:mb-8">
            <div className="flex justify-between mb-4 sm:mb-6">
              <div className={`w-1/4 text-center ${step >= 1 ? 'text-emerald-600' : 'text-gray-400'}`}>1. Service</div>
              <div className={`w-1/4 text-center ${step >= 2 ? 'text-emerald-600' : 'text-gray-400'}`}>2. Date/Heure</div>
              <div className={`w-1/4 text-center ${step >= 3 ? 'text-emerald-600' : 'text-gray-400'}`}>3. Coordonnées</div>
              <div className={`w-1/4 text-center ${step >= 4 ? 'text-emerald-600' : 'text-gray-400'}`}>4. Confirmation</div>
            </div>

            {response && (
              <p className="mt-4 text-center text-red-600 text-base sm:text-lg" dangerouslySetInnerHTML={{ __html: response }} />
            )}

            {!response && step === 1 && (
              <>
                <h3 className="text-2xl sm:text-3xl font-semibold text-emerald-800 mb-4 sm:mb-6">Choisissez un massage :</h3>
                <div className="grid grid-cols-1 gap-4 mb-6 sm:mb-8">
                  {services.map((service) => (
                    <motion.div
                      key={service.title}
                      className="bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedService(service.title)}
                    >
                      <h4 className="text-xl sm:text-2xl font-medium text-emerald-800">{service.title}</h4>
                      {selectedService === service.title && (
                        <select
                          className="w-full p-2 mt-2 sm:mt-3 border border-gray-300 rounded-lg text-base sm:text-lg"
                          value={selectedDuration || ''}
                          onChange={(e) => setSelectedDuration(e.target.value)}
                        >
                          <option value="">Sélectionnez une durée</option>
                          {Object.entries(service.durations_prices).map(([dur, price]) => (
                            <option key={dur} value={dur}>
                              {dur} min - {price} €
                            </option>
                          ))}
                        </select>
                      )}
                    </motion.div>
                  ))}
                </div>
                {selectedService && selectedDuration && (
                  <button
                    className="w-full bg-emerald-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-emerald-700 text-base sm:text-lg"
                    onClick={nextStep}
                  >
                    Suivant
                  </button>
                )}
              </>
            )}

            {!response && step === 2 && selectedService && selectedDuration && (
              <div ref={calendarRef}>
                <h3 className="text-2xl sm:text-3xl font-semibold text-emerald-800 mb-4 sm:mb-6">Choisissez une date et une heure :</h3>
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  className="mx-auto border-2 border-emerald-300 rounded-lg p-2 sm:p-4 shadow-md bg-white text-emerald-800 mb-4 sm:mb-6 w-full sm:w-auto"
                />
                {selectedDate && (
                  <select
                    className="w-full p-2 mb-4 sm:mb-6 border border-gray-300 rounded-lg text-base sm:text-lg"
                    value={selectedTime || ''}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    <option value="">Sélectionnez une heure</option>
                    {getAvailableTimes(selectedDate).map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                )}
                {selectedDate && selectedTime && (
                  <button
                    className="w-full bg-emerald-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-emerald-700 text-base sm:text-lg"
                    onClick={nextStep}
                  >
                    Suivant
                  </button>
                )}
              </div>
            )}

            {!response && step === 3 && selectedService && selectedDuration && selectedDate && selectedTime && (
              <div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-emerald-800 mb-4 sm:mb-6">Entrez vos coordonnées :</h3>
                <div className="space-y-4 mb-6 sm:mb-8">
                  <input
                    type="text"
                    placeholder="Nom"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-base sm:text-lg"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-base sm:text-lg"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Téléphone (facultatif)"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-base sm:text-lg"
                  />
                  <textarea
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg h-24 text-base sm:text-lg"
                    placeholder="Demande spéciale (optionnel)"
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                  />
                </div>
                <button
                  className="w-full bg-emerald-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-emerald-700 text-base sm:text-lg"
                  onClick={bookAppointment}
                >
                  Confirmer la réservation
                </button>
              </div>
            )}

            {!response && step === 4 && (
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl font-semibold text-emerald-800 mb-4 sm:mb-6">Réservation Confirmée !</h3>
                <p className="text-gray-700 mb-4 sm:mb-6 text-base sm:text-lg">Un email de confirmation vous a été envoyé. Merci !</p>
                <button
                  className="w-full bg-emerald-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-emerald-700 text-base sm:text-lg"
                  onClick={() => {
                    setStep(1);
                    setSelectedService(null);
                    setSelectedDuration(null);
                    setSelectedDate(null);
                    setSelectedTime(null);
                  }}
                >
                  Nouvelle réservation
                </button>
              </div>
            )}
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}