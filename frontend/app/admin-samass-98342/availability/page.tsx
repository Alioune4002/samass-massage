"use client";

import { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import {
  adminGetAvailabilities,
  adminCreateAvailability,
  adminDeleteAvailability,
  adminGetServices,
} from "@/lib/adminApi";

type Availability = {
  id: number;
  service: number;
  start_datetime: string;
  end_datetime: string;
};

type Service = {
  id: number;
  name: string;
};

export default function AdminAvailabilityPage() {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  /* --------------------------------------------------------
     LOAD DATA
  ---------------------------------------------------------*/
  const loadData = async () => {
    try {
      const svs = await adminGetServices();
      setServices(svs);

      if (selectedService) {
        const avs = await adminGetAvailabilities(selectedService);
        setAvailabilities(avs);
      } else {
        setAvailabilities([]);
      }
    } catch (err) {
      console.error("Erreur chargement disponibilités/admin :", err);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedService]);

  /* --------------------------------------------------------
     ADD AVAILABILITY
  ---------------------------------------------------------*/
  const handleDateSelect = async (select: any) => {
    if (!selectedService) {
      alert("Veuillez choisir un service.");
      return;
    }

    const start = select.startStr;
    const end = select.endStr;

    try {
      await adminCreateAvailability({
        service: selectedService,
        start_datetime: start,
        end_datetime: end,
      });

      await loadData();
    } catch (err) {
      console.error("Erreur création disponibilité :", err);
      alert("Impossible d'ajouter la disponibilité");
    }
  };

  /* --------------------------------------------------------
     DELETE AVAILABILITY
  ---------------------------------------------------------*/
  const handleEventClick = async (clickInfo: any) => {
    const id = Number(clickInfo.event.id);

    if (!confirm("Supprimer ce créneau ?")) return;

    try {
      await adminDeleteAvailability(id);
      await loadData();
    } catch (err) {
      console.error("Erreur suppression disponibilité :", err);
      alert("Impossible de supprimer le créneau.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 text-white">
      <h1 className="text-3xl font-bold mb-6">Gestion des Disponibilités</h1>

      {/* --- CHOIX SERVICE --- */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Choisir un service :</label>

        <select
          className="border bg-[#0D0D0D] text-white p-2 rounded w-full"
          value={selectedService ?? ""}
          onChange={(e) =>
            setSelectedService(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">— Choisir un service —</option>

          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* --- CALENDRIER --- */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={false}
        height="auto"
        select={handleDateSelect}
        eventClick={handleEventClick}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={availabilities.map((a) => ({
          id: String(a.id),
          title: services.find((s) => s.id === a.service)?.name || "Service",
          start: a.start_datetime,
          end: a.end_datetime,
        }))}
      />
    </div>
  );
}
