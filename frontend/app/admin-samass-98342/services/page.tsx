"use client";

import { useEffect, useState } from "react";
import {
  adminGetServices,
  adminCreateService,
  adminDeleteService,
} from "@/lib/adminApi";

type Service = {
  id: number;
  name: string;
  description: string;
  duration_minutes: number;
  price_cents: number;
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration_minutes: "",
    price_cents: "",
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await adminGetServices();
      setServices(data);
    } catch (err) {
      console.error("Erreur adminGetServices :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitService = async () => {
    if (
      !formData.name ||
      !formData.duration_minutes ||
      !formData.price_cents
    ) {
      alert("Veuillez remplir les champs obligatoires.");
      return;
    }

    try {
      await adminCreateService({
        name: formData.name,
        description: formData.description,
        duration_minutes: Number(formData.duration_minutes),
        price_cents: Number(formData.price_cents),
      });

      setFormData({
        name: "",
        description: "",
        duration_minutes: "",
        price_cents: "",
      });

      await fetchServices();
    } catch (err) {
      console.error("Erreur adminCreateService :", err);
      alert("Erreur lors de l'ajout du service.");
    }
  };

  const removeService = async (id: number) => {
    if (!confirm("Supprimer ce service ?")) return;

    try {
      await adminDeleteService(id);
      await fetchServices();
    } catch (err) {
      console.error("Erreur adminDeleteService :", err);
      alert("Impossible de supprimer le service.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Gestion des Services</h1>

      {/* AJOUT DE SERVICE */}
      <div className="border border-gray-700 p-4 rounded mb-8 bg-[#1A1A1A] shadow">
        <h2 className="text-xl font-semibold mb-4">Ajouter un service</h2>

        <input
          type="text"
          name="name"
          placeholder="Nom du service"
          className="border bg-[#0D0D0D] text-white p-2 w-full mb-2 rounded"
          value={formData.name}
          onChange={handleInputChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border bg-[#0D0D0D] text-white p-2 w-full mb-2 rounded"
          value={formData.description}
          onChange={handleInputChange}
        />

        <input
          type="number"
          name="duration_minutes"
          placeholder="Durée (minutes)"
          className="border bg-[#0D0D0D] text-white p-2 w-full mb-2 rounded"
          value={formData.duration_minutes}
          onChange={handleInputChange}
        />

        <input
          type="number"
          name="price_cents"
          placeholder="Prix (en centimes)"
          className="border bg-[#0D0D0D] text-white p-2 w-full mb-2 rounded"
          value={formData.price_cents}
          onChange={handleInputChange}
        />

        <button
          onClick={submitService}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
        >
          Ajouter
        </button>
      </div>

      {/* LISTE DES SERVICES */}
      <h2 className="text-xl font-semibold mb-4">Services existants</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : services.length === 0 ? (
        <p>Aucun service disponible.</p>
      ) : (
        <ul className="space-y-4">
          {services.map((service) => (
            <li
              key={service.id}
              className="border border-gray-700 p-4 rounded bg-[#1A1A1A] shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-emerald-400">{service.name}</h3>
                <p className="text-gray-300">{service.description}</p>
                <p className="text-sm text-gray-400">
                  {service.duration_minutes} min — {(service.price_cents / 100).toFixed(2)} €
                </p>
              </div>

              <button
                onClick={() => removeService(service.id)}
                className="text-red-500 hover:text-red-700"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
