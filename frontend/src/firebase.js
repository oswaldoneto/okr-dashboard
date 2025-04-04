import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  // Substitua com suas configurações do Firebase
  apiKey: "YOUR_API_KEY",
  authDomain: "okr-dashboard-dio.firebaseapp.com",
  projectId: "okr-dashboard-dio",
  storageBucket: "okr-dashboard-dio.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics }; 