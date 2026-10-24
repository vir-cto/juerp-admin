// /**
//  * JUONE / JuERP Firebase Configuration
//  *
//  * Firebase services used by JuERP:
//  * - Firebase Authentication
//  * - Cloud Firestore
//  *
//  * Important:
//  * - Firebase client configuration is not a secret.
//  * - Firebase Admin SDK credentials must NEVER be placed here.
//  * - Cashfree secrets must NEVER be placed here.
//  * - Authorization is enforced by backend/custom claims
//  *   and Firestore security rules.
//  */

// import { getApp, getApps, initializeApp } from "firebase/app";
// import {
//   getAuth,
//   type Auth,
// } from "firebase/auth";
// import {
//   getFirestore,
//   type Firestore,
// } from "firebase/firestore";

// /* -------------------------------------------------------------------------- */
// /* Firebase Configuration                                                     */
// /* -------------------------------------------------------------------------- */

// const firebaseConfig = {
//   apiKey:
//     process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",

//   authDomain:
//     process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",

//   projectId:
//     process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",

//   storageBucket:
//     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",

//   messagingSenderId:
//     process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",

//   appId:
//     process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
// };

// /* -------------------------------------------------------------------------- */
// /* Configuration Validation                                                   */
// /* -------------------------------------------------------------------------- */

// /**
//  * Firebase configuration is allowed to be incomplete in demo mode.
//  *
//  * In production, the required environment variables must be provided.
//  */
// const requiredFirebaseConfigKeys = [
//   "apiKey",
//   "authDomain",
//   "projectId",
//   "appId",
// ] as const;

// const missingFirebaseConfigKeys =
//   requiredFirebaseConfigKeys.filter(
//     (key) => !firebaseConfig[key],
//   );

// const isDemoMode =
//   process.env.NEXT_PUBLIC_DEMO_MODE ===
//   "true";

// /**
//  * Prevent accidental production startup with an incomplete
//  * Firebase configuration.
//  */
// if (
//   typeof window !== "undefined" &&
//   !isDemoMode &&
//   missingFirebaseConfigKeys.length > 0
// ) {
//   console.warn(
//     `[Firebase] Missing configuration: ${missingFirebaseConfigKeys.join(
//       ", ",
//     )}`,
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Firebase App                                                               */
// /* -------------------------------------------------------------------------- */

// /**
//  * Reuse the existing Firebase app when one has already
//  * been initialized.
//  */
// const firebaseApp =
//   getApps().length > 0
//     ? getApp()
//     : initializeApp(firebaseConfig);

// /* -------------------------------------------------------------------------- */
// /* Firebase Authentication                                                    */
// /* -------------------------------------------------------------------------- */

// export const auth: Auth =
//   getAuth(firebaseApp);

// /* -------------------------------------------------------------------------- */
// /* Cloud Firestore                                                            */
// /* -------------------------------------------------------------------------- */

// export const db: Firestore =
//   getFirestore(firebaseApp);

// /* -------------------------------------------------------------------------- */
// /* App Export                                                                 */
// /* -------------------------------------------------------------------------- */

// export { firebaseApp };

// export default firebaseApp;

// import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
// import { getAuth, Auth } from "firebase/auth";
// import { getFirestore, Firestore } from "firebase/firestore";
// import { getStorage, FirebaseStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// function createFirebaseApp(): FirebaseApp {
//   if (getApps().length > 0) {
//     return getApp();
//   }

//   if (
//     !firebaseConfig.apiKey ||
//     !firebaseConfig.authDomain ||
//     !firebaseConfig.projectId ||
//     !firebaseConfig.appId
//   ) {
//     throw new Error(
//       "Missing Firebase configuration. Set NEXT_PUBLIC_FIREBASE_* environment variables."
//     );
//   }

//   return initializeApp(firebaseConfig);
// }

// const app = createFirebaseApp();

// export const auth: Auth = getAuth(app);
// export const db: Firestore = getFirestore(app);
// export const storage: FirebaseStorage = getStorage(app);

// export default app;

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function createFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) {
    return getApp();
  }

  if (
    !firebaseConfig.apiKey ||
    !firebaseConfig.authDomain ||
    !firebaseConfig.projectId ||
    !firebaseConfig.appId
  ) {
    throw new Error(
      "Missing Firebase configuration. Set NEXT_PUBLIC_FIREBASE_* environment variables."
    );
  }

  return initializeApp(firebaseConfig);
}

const app = createFirebaseApp();

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

export default app;