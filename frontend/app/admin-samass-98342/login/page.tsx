"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://samass-massage.onrender.com";

export default function AdminLogin() {
  const [username, setUsername] = useState(""); // identifiant Django (pas forcément un email)
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/api-token-auth/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username, // très important : "username" (pas "email")
          password,
        }),
      });

      if (!res.ok) {
        if (res.status === 400) {
          setError("Identifiants incorrects.");
          return;
        }

        const txt = await res.text();
        console.error("Erreur API login:", res.status, txt);
        setError("Erreur interne. Essayez encore.");
        return;
      }

      const data = await res.json();

      if (!data.token) {
        console.error("Réponse sans token:", data);
        setError("Réponse invalide du serveur.");
        return;
      }

      // On enregistre le token pour l'admin
      document.cookie = `admin_token=${data.token}; path=/; secure; SameSite=Strict;`;

      // Redirection vers le dashboard Next.js
      router.push("/admin-samass-98342/dashboard");
    } catch (e) {
      console.error("Erreur réseau login:", e);
      setError("Erreur interne. Essayez encore.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
      <div className="bg-[#1A1A1A] p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Espace Admin
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-gray-300 text-sm">Identifiant</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mt-1 rounded bg-[#0D0D0D] border border-gray-700 text-white focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 rounded bg-[#0D0D0D] border border-gray-700 text-white focus:border-emerald-500 outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition font-semibold"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}
