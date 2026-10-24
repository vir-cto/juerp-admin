// "use client";

// import { FormEvent, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   getAuth,
//   getIdTokenResult,
//   signInWithEmailAndPassword,
// } from "firebase/auth";
// import { getApps, initializeApp } from "firebase/app";

// // -----------------------------------------------------
// // Firebase Configuration
// // -----------------------------------------------------

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// // Initialize Firebase only once
// const app =
//   getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

// const auth = getAuth(app);

// // -----------------------------------------------------
// // JUERP Allowed Roles
// // -----------------------------------------------------

// const ALLOWED_ROLES = [
//   "SUPER_ADMIN",
//   "STATE_ADMIN",
//   "DISTRICT_ADMIN",
//   "TECHNICAL_ADMIN",
// ];

// // -----------------------------------------------------
// // Login Page
// // -----------------------------------------------------

// export default function LoginPage() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [showPassword, setShowPassword] = useState(false);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ---------------------------------------------------
//   // Login
//   // ---------------------------------------------------

//   const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     setError("");

//     // Basic validation
//     if (!email.trim()) {
//       setError("Please enter your email address.");
//       return;
//     }

//     if (!password) {
//       setError("Please enter your password.");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Firebase Authentication
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email.trim(),
//         password
//       );

//       const user = userCredential.user;

//       // ------------------------------------------------
//       // Get Firebase Custom Claims
//       // ------------------------------------------------

//       const tokenResult = await getIdTokenResult(user, true);

//       const role = tokenResult.claims.role as string | undefined;

//       // ------------------------------------------------
//       // JUERP Role Validation
//       // ------------------------------------------------

//       if (!role || !ALLOWED_ROLES.includes(role)) {
//         await auth.signOut();

//         setError(
//           "Access denied. This account does not have a valid JUERP administrator role."
//         );

//         return;
//       }

//       // ------------------------------------------------
//       // Store only non-sensitive session information
//       // ------------------------------------------------

//       sessionStorage.setItem(
//         "juerp_session",
//         JSON.stringify({
//           uid: user.uid,
//           email: user.email,
//           role: role,
//         })
//       );

//       // ------------------------------------------------
//       // Redirect
//       // ------------------------------------------------

//       router.push("/dashboard");
//       router.refresh();
//     } catch (err: unknown) {
//       console.error("JUERP login error:", err);

//       let message = "Unable to sign in. Please try again.";

//       if (err instanceof Error) {
//         switch (err.message) {
//           case "Firebase: Error (auth/invalid-credential).":
//             message = "Invalid email or password.";
//             break;

//           case "Firebase: Error (auth/user-not-found).":
//             message = "No account found with this email address.";
//             break;

//           case "Firebase: Error (auth/wrong-password).":
//             message = "Incorrect password.";
//             break;

//           case "Firebase: Error (auth/invalid-email).":
//             message = "Please enter a valid email address.";
//             break;

//           case "Firebase: Error (auth/too-many-requests).":
//             message =
//               "Too many login attempts. Please wait and try again later.";
//             break;

//           case "Firebase: Error (auth/network-request-failed).":
//             message =
//               "Network error. Please check your internet connection.";
//             break;

//           default:
//             if (err.message.includes("auth/invalid-credential")) {
//               message = "Invalid email or password.";
//             } else if (err.message.includes("auth/invalid-email")) {
//               message = "Please enter a valid email address.";
//             }
//         }
//       }

//       setError(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------------------------------------------
//   // UI
//   // ---------------------------------------------------

//   return (
//     <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
//       <div className="w-full max-w-md">
//         {/* Logo / Brand */}
//         <div className="text-center mb-8">
//           <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 shadow-lg">
//             <span className="text-2xl font-bold text-white">J</span>
//           </div>

//           <h1 className="text-3xl font-bold text-slate-900">
//             JUERP
//           </h1>

//           <p className="mt-2 text-sm text-slate-500">
//             JUONE Enterprise Resource Planning
//           </p>
//         </div>

//         {/* Login Card */}
//         <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
//           <div className="mb-6">
//             <h2 className="text-2xl font-semibold text-slate-900">
//               Admin Login
//             </h2>

//             <p className="mt-1 text-sm text-slate-500">
//               Sign in to manage the JUONE platform.
//             </p>
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
//               <p className="text-sm text-red-700">{error}</p>
//             </div>
//           )}

//           {/* Form */}
//           <form onSubmit={handleLogin} className="space-y-5">
//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Email Address
//               </label>

//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(event) => setEmail(event.target.value)}
//                 placeholder="admin@juone.com"
//                 autoComplete="email"
//                 disabled={loading}
//                 className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:bg-slate-100"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Password
//               </label>

//               <div className="relative">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(event) => setPassword(event.target.value)}
//                   placeholder="Enter your password"
//                   autoComplete="current-password"
//                   disabled={loading}
//                   className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pr-20 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:bg-slate-100"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((previous) => !previous)}
//                   disabled={loading}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-orange-600 hover:text-orange-700 disabled:text-slate-400"
//                 >
//                   {showPassword ? "Hide" : "Show"}
//                 </button>
//               </div>
//             </div>

//             {/* Remember / Info */}
//             <div className="flex items-center justify-between">
//               <p className="text-xs text-slate-500">
//                 Authorized administrators only
//               </p>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setError(
//                     "Please contact the JUERP administrator to reset your password."
//                   )
//                 }
//                 className="text-xs font-medium text-orange-600 hover:text-orange-700"
//               >
//                 Forgot password?
//               </button>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                   Signing in...
//                 </span>
//               ) : (
//                 "Sign In"
//               )}
//             </button>
//           </form>

//           {/* Security Information */}
//           <div className="mt-6 border-t border-slate-100 pt-5">
//             <p className="text-center text-xs leading-5 text-slate-400">
//               JUERP access is controlled through Firebase Authentication
//               and authorized administrator roles.
//             </p>
//           </div>
//         </div>

//         {/* Footer */}
//         <p className="mt-6 text-center text-xs text-slate-400">
//           JUONE • JUERP
//         </p>
//       </div>
//     </main>
//   );
// }

"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signInAdmin } from "@/lib/firebase/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const { user, role } = await signInAdmin(email, password);

      sessionStorage.setItem(
        "juerp_session",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          role,
        })
      );

      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      console.error("JUERP login error:", err);

      let message = "Unable to sign in. Please try again.";

      if (err instanceof Error) {
        const msg = err.message;

        if (
          msg.includes("auth/invalid-credential") ||
          msg.includes("auth/wrong-password") ||
          msg.includes("auth/user-not-found")
        ) {
          message = "Invalid email or password.";
        } else if (msg.includes("auth/invalid-email")) {
          message = "Please enter a valid email address.";
        } else if (msg.includes("auth/too-many-requests")) {
          message =
            "Too many login attempts. Please wait and try again later.";
        } else if (msg.includes("auth/network-request-failed")) {
          message =
            "Network error. Please check your internet connection.";
        } else if (msg.includes("Access denied")) {
          message = msg;
        } else if (msg.includes("Missing Firebase configuration")) {
          message =
            "Firebase is not configured. Check environment variables.";
        }
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 shadow-lg">
            <span className="text-2xl font-bold text-white">J</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900">JUERP</h1>

          <p className="mt-2 text-sm text-slate-500">
            JUONE Enterprise Resource Planning
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Admin Login
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Sign in to manage the JUONE platform.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
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

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pr-20 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:bg-slate-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-orange-600 hover:text-orange-700 disabled:text-slate-400"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Info / Forgot */}
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500">
                Authorized administrators only
              </p>

              <button
                type="button"
                onClick={() => router.push("/forgot-password")}
                className="text-xs font-medium text-orange-600 hover:text-orange-700"
              >
                Forgot password?
              </button>
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
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Security note */}
          <div className="mt-6 border-t border-slate-100 pt-5">
            <p className="text-center text-xs leading-5 text-slate-400">
              JUERP access is controlled through Firebase Authentication
              and authorized administrator roles.
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