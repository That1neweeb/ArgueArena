

import { initializeApp, credential as _credential } from "firebase-admin";
import { execPath } from "node:process";

import serviceAccount from "path/to/serviceAccountKey.json";

initializeApp({
  credential: _credential.cert(serviceAccount),
  databaseURL: "https://arguearena-9fdee-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.fireStore();

export default db;