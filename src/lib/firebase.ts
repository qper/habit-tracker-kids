import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  initializeFirestore,
  getFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  CACHE_SIZE_UNLIMITED,
} from 'firebase/firestore';

// ─── Firebase Config ───────────────────────────────────────────────
// Values come from VITE_FIREBASE_* environment variables.
// In development: create a .env.local file.
// In production: set GitHub Actions secrets.
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY || 'demo-key',
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId:             import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:abc123',
};

// Prevent double initialisation in dev with HMR
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

export { app };

// ─── Auth ─────────────────────────────────────────────────────────
export const auth = getAuth(app);

// ─── Firestore with Offline Persistence ──────────────────────────
// Initialize only once, use getFirestore for subsequent calls (HMR safe)
let db: ReturnType<typeof getFirestore>;

try {
  if (getApps().length === 1) {
    // First initialization
    db = initializeFirestore(app, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
        cacheSizeBytes: CACHE_SIZE_UNLIMITED,
      }),
    });
  } else {
    // Already initialized
    db = getFirestore(app);
  }
} catch (e) {
  // If already initialized, just get the instance
  db = getFirestore(app);
}

export { db };
