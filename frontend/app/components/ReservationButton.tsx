"use client";

import { useState } from "react";
import ReservationModal from "./ReservationModal";

type Props = {
  serviceId?: number; 
};

export default function ReservationButton({ serviceId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-emerald-600 text-white px-5 py-2.5 text-sm font-medium hover:bg-emerald-700 transition shadow-sm"
      >
        Réserver ce massage
      </button>

      <ReservationModal
        isOpen={open}
        onClose={() => setOpen(false)}
        initialServiceId={serviceId ?? null}
      />
    </>
  );
}
