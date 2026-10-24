// // scripts/set-super-admin.mjs
// import { readFileSync } from "fs";
// import { cert, initializeApp } from "firebase-admin/app";
// import { getAuth } from "firebase-admin/auth";

// const sa = JSON.parse(readFileSync("./service-account.json", "utf8"));
// initializeApp({ credential: cert(sa) });

// const email = "admin@juone.test"; // the account you created
// const user = await getAuth().getUserByEmail(email);

// await getAuth().setCustomUserClaims(user.uid, {
//   role: "SUPER_ADMIN",
// });

// console.log("OK:", user.uid, "→ SUPER_ADMIN");
// console.log("Sign out and sign in again so the token refreshes.");



// // scripts/set-admin-claim.js
// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// async function main() {
//   const email = "admin@juone.test"; // change this
//   const role = "SUPER_ADMIN"; // SUPER_ADMIN | STATE_ADMIN | DISTRICT_ADMIN | TECHNICAL_ADMIN

//   const user = await admin.auth().getUserByEmail(email);
//   await admin.auth().setCustomUserClaims(user.uid, { role });

//   console.log(`Set role=${role} for ${email} (${user.uid})`);
//   console.log("User must sign out and sign in again (or force token refresh).");
// }

// main().catch(console.error);

// import { createRequire } from "module";
// import { readFileSync } from "fs";
// import { fileURLToPath } from "url";
// import { dirname, join } from "path";

// const require = createRequire(import.meta.url);
// const admin = require("firebase-admin");

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Path to your service account JSON (same folder as this script, or adjust)
// const serviceAccountPath = join(__dirname, "serviceAccountKey.json");
// const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const email = "admin@juone.test"; // <-- change this
// const role = "SUPER_ADMIN";

// async function main() {
//   const user = await admin.auth().getUserByEmail(email);

//   await admin.auth().setCustomUserClaims(user.uid, { role });

//   console.log(`✅ Set role=${role} for ${email}`);
//   console.log(`   UID: ${user.uid}`);
//   console.log("Sign out and sign in again so the new token is issued.");
// }

// main().catch((err) => {
//   console.error("❌ Failed:", err.message || err);
//   process.exit(1);
// });


import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccountPath = join(__dirname, "serviceAccountKey.json");
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

initializeApp({
  credential: cert(serviceAccount),
});

const email = "admin@juone.test"; // must exist in Firebase Authentication
const role = "SUPER_ADMIN";

async function main() {
  const auth = getAuth();
  const user = await auth.getUserByEmail(email);

  await auth.setCustomUserClaims(user.uid, { role });

  console.log(`✅ Set role=${role} for ${email}`);
  console.log(`   UID: ${user.uid}`);
  console.log("Sign out and sign in again so the new token is issued.");
}

main().catch((err) => {
  console.error("❌ Failed:", err.message || err);
  process.exit(1);
});