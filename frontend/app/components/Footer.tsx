import Link from 'next/link';
import { FaWhatsapp, FaFacebookF } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-emerald-800 text-white text-center p-2 sm:p-4 w-full mt-auto">
      <p className="text-xs sm:text-sm mb-2 sm:mb-4">© 2025 SAMASS - Sammy Ly. Tous droits réservés.</p>
      <div className="space-x-2 sm:space-x-4 flex justify-center flex-wrap">
        <a href="https://wa.me/33745558731" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-200 text-sm sm:text-base flex items-center">
          <FaWhatsapp className="mr-1" /> WhatsApp
        </a>
        <a href="https://www.facebook.com/share/1GW8VSe5Jt/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-200 text-sm sm:text-base flex items-center">
          <FaFacebookF className="mr-1" /> Facebook
        </a>
        <Link href="/about" className="hover:text-emerald-200 text-sm sm:text-base">À propos</Link>
      </div>
    </footer>
  );
}