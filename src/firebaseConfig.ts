// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence,  browserLocalPersistence  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSUVBkJ0Vsu4-8YrEAwVxXyss-uQ3poQQ",
  authDomain: "task-tracker-app-8d88b.firebaseapp.com",
  projectId: "task-tracker-app-8d88b",
  storageBucket: "task-tracker-app-8d88b.firebasestorage.app",
  messagingSenderId: "307420230035",
  appId: "1:307420230035:web:fbdd9316ba22ac033e3866",
  measurementId: "G-WDVYXTQQFJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);

export default app;