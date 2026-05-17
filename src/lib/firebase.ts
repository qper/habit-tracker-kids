import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  CACHE_SIZE_UNLIMITED,
} from 'firebase/firestore';

// ─── Firebase Config ───────────────────────────────────────────────
// Values come from VITE_FIREBASE_* environment variables.
// In development: create a .env.local file.
// In production: set GitHub Actions secrets.
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// Prevent double initialisation in dev with HMR
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

export { app };

// ─── Auth ─────────────────────────────────────────────────────────
export const auth = getAuth(app);

// ─── Firestore with Offline Persistence ──────────────────────────
// `persistentLocalCache` enables IndexedDB storage so the app works
// fully offline. Firestore will sync automatically when connectivity
// is restored.
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  }),
});
