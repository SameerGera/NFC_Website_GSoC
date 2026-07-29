import admin from "firebase-admin";
import { getFirestore, Firestore } from "firebase-admin/firestore";

function initAdmin() {
  if (admin.getApps().length === 0) {
    admin.initializeApp({
      credential: admin.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }
  return getFirestore();
}

let _adminDb: Firestore | null = null;

function getAdminDb() {
  if (!_adminDb) {
    _adminDb = initAdmin();
  }
  return _adminDb;
}

export { getAdminDb };
