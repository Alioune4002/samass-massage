"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin-samass-98342/dashboard", label: "Dashboard" },
  { href: "/admin-samass-98342/bookings", label: "Réservations" },
  { href: "/admin-samass-98342/availability", label: "Disponibilités" },
  { href: "/admin-samass-98342/services", label: "Services" },
  { href: "/admin-samass-98342/messages", label: "Messages" },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="w-64 bg-[#111111] border-r border-gray-800 p-6 flex flex-col">
      
      <h2 className="text-2xl font-bold text-emerald-400 mb-10 uppercase tracking-wider">
        SAMASS Admin
      </h2>

      
      <nav className="space-y-2">
        {links.map((link) => {
          const active = path?.startsWith(link.href) ?? false;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2 rounded-lg transition font-medium ${
                active
                  ? "bg-emerald-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
