"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getApps, initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

// -----------------------------------------------------
// Firebase Configuration
// -----------------------------------------------------

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only once
const app =
  getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

const auth = getAuth(app);

// -----------------------------------------------------
// Forgot Password Page
// -----------------------------------------------------

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ---------------------------------------------------
  // Send Password Reset Email
  // ---------------------------------------------------

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const cleanEmail = email.trim();

    // Basic validation
    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!cleanEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      await sendPasswordResetEmail(auth, cleanEmail);

      setSuccess(
        "Password reset instructions have been sent to your email address."
      );

      setEmail("");
    } catch (err: unknown) {
      console.error("JUERP password reset error:", err);

      let message = "Unable to send password reset email.";

      if (err instanceof Error) {
        if (err.message.includes("auth/invalid-email")) {
          message = "Please enter a valid email address.";
        } else if (err.message.includes("auth/user-not-found")) {
          message = "No account was found with this email address.";
        } else if (err.message.includes("auth/too-many-requests")) {
          message =
            "Too many requests. Please wait for some time and try again.";
        } else if (err.message.includes("auth/network-request-failed")) {
          message =
            "Network error. Please check your internet connection.";
        }
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------
  // UI
  // ---------------------------------------------------

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 shadow-lg">
            <span className="text-2xl font-bold text-white">J</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            JUERP
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            JUONE Enterprise Resource Planning
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Forgot Password?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Enter your registered email address and we will send you
              instructions to reset your password.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-700">
                {error}
              </p>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
              <p className="text-sm text-green-700">
                {success}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@juone.com"
                autoComplete="email"
                disabled={loading}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:bg-slate-100"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Sending...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-sm font-medium text-orange-600 hover:text-orange-700"
            >
              ← Back to Login
            </button>
          </div>

          {/* Security Information */}
          <div className="mt-6 border-t border-slate-100 pt-5">
            <p className="text-center text-xs leading-5 text-slate-400">
              Password reset is handled securely through Firebase
              Authentication.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-400">
          JUONE • JUERP
        </p>
      </div>
    </main>
  );
}