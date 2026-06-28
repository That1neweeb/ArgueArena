import admin from 'firebase-admin';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let serviceAccount;
try {
  // Adjust the relative path below to where you store your serviceAccountKey.json
  const serviceAccountUrl = pathToFileURL(path.join(__dirname, '../serviceAccountKey.json'));
  serviceAccount = (await import(serviceAccountUrl.href, { with: { type: 'json' } })).default;
} catch (err) {
  console.error('Could not load serviceAccountKey.json. Place your file at Daily_Mode/server/serviceAccountKey.json or update the import path.');
  throw err;
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export default db;