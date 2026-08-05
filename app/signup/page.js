"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!name || !normalizedEmail || !password || !confirmPassword) {
      setStatus("Please complete every field.");
      return;
    }

    if (password !== confirmPassword) {
      setStatus("Passwords do not match.");
      return;
    }

    setLoading(true);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email: normalizedEmail, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setStatus(data.error || "Unable to create account.");
      return;
    }

    router.push("/login?signup=success");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-black py-12 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-3">Get started.</h1>
          <p className="text-gray-400 font-medium">Sign up for CreatorNest to get funded.</p>
        </div>

        <div className="space-y-5">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Full name</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                className="w-full border-b-2 border-zinc-800 bg-transparent px-0 py-3 text-white placeholder-zinc-600 focus:border-white focus:outline-none transition-colors rounded-none"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Email address</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                className="w-full border-b-2 border-zinc-800 bg-transparent px-0 py-3 text-white placeholder-zinc-600 focus:border-white focus:outline-none transition-colors rounded-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Password</label>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                className="w-full border-b-2 border-zinc-800 bg-transparent px-0 py-3 text-white placeholder-zinc-600 focus:border-white focus:outline-none transition-colors rounded-none"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Confirm password</label>
              <input
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                type="password"
                className="w-full border-b-2 border-zinc-800 bg-transparent px-0 py-3 text-white placeholder-zinc-600 focus:border-white focus:outline-none transition-colors rounded-none"
                placeholder="Re-enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-sm bg-white px-4 py-4 mt-4 text-black font-semibold text-sm transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          {status ? <p className="mt-4 text-center text-sm font-medium text-red-500">{status}</p> : null}

          <p className="mt-10 text-center text-sm text-gray-400 font-medium">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-white hover:underline cursor-pointer">
              Log in.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
