
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-40 transition-all
        ${scrolled ? "bg-white shadow-sm" : "bg-transparent"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-forest flex items-center gap-1">
          SAMASS <span className="text-gold">🌿</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-ink">
          <Link href="/" className="hover:text-forest">Accueil</Link>
          <Link href="/services" className="hover:text-forest">Services</Link>
          <Link href="/booking" className="hover:text-forest">Réserver</Link>
          <Link href="/contact" className="hover:text-forest">Contact</Link>
        </nav>

        
      </div>
    </header>
  );
}
