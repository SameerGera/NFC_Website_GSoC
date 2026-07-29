import "server-only";

import admin from "firebase-admin";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

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
  return { adminDb: getFirestore(), adminAuth: getAuth() };
}

let _adminDb: Firestore | null = null;
let _adminAuth: Auth | null = null;

function getAdminDb() {
  if (!_adminDb) {
    const { adminDb, adminAuth } = initAdmin();
    _adminDb = adminDb;
    _adminAuth = adminAuth;
  }
  return _adminDb;
}

function getAdminAuth() {
  if (!_adminAuth) {
    const { adminDb, adminAuth } = initAdmin();
    _adminDb = adminDb;
    _adminAuth = adminAuth;
  }
  return _adminAuth;
}

export { getAdminDb, getAdminAuth };
