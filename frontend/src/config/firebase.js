// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHgbZxXXXXXXXXXXXXXXXXXXXXXXXXXXX", // Substitua pela sua API Key
  authDomain: "okr-dashboard-dio.firebaseapp.com",
  projectId: "okr-dashboard-dio",
  storageBucket: "okr-dashboard-dio.appspot.com",
  messagingSenderId: "XXXXXXXXXXXX", // Substitua pelo seu Sender ID
  appId: "1:XXXXXXXXXXXX:web:XXXXXXXXXXXX", // Substitua pelo seu App ID
  measurementId: "G-XXXXXXXXXX" // Substitua pelo seu Measurement ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics }; 