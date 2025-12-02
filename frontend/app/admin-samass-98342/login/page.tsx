"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api-token-auth/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: email, password }),
        }
      );

      const data = await res.json();

      if (!data.token) {
        setError("Identifiants incorrects.");
        return;
      }

      // stocker le token admin dans le cookie
      document.cookie = `admin_token=${data.token}; path=/; secure; SameSite=Strict;`;

      // redirection vers dashboard
      router.push("/admin-samass-98342/dashboard");
    } catch (err) {
      console.error(err);
      setError("Erreur interne. Essayez encore.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
      <div className="bg-[#1A1A1A] p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-800">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Espace Admin
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

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
