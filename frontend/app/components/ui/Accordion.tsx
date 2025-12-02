"use client";

import { useState } from "react";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

export default function Accordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="font-semibold text-forest">{title}</span>
        <span className="text-forest text-xl">{open ? "▴" : "▾"}</span>
      </button>

      {open && (
        <div className="mt-4 space-y-2 text-softgray text-sm">
          {children}
        </div>
      )}
    </div>
  );
}
