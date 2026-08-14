// Initialize Firebase using the Compat SDK
const firebaseConfig = {
  apiKey: "AIzaSyAANxGXxzZIz5ih0Yk_EPviJzi5DWZycfw",
  authDomain: "globallogicmedia-38e92.firebaseapp.com",
  projectId: "globallogicmedia-38e92",
  storageBucket: "globallogicmedia-38e92.firebasestorage.app",
  messagingSenderId: "1034066910642",
  appId: "1:1034066910642:web:bca304e8e5a73e4f61d8ab",
  measurementId: "G-N46KRX9W7H"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
// Use Realtime Database instead of Firestore to completely avoid billing setup
const db = firebase.database();
window.firebaseDB = db;
window.firebaseReady = true;
window.dispatchEvent(new Event('firebaseLoaded'));
