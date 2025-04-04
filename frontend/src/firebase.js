import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyC14TIaTpgNFqSKS74lk-pA5JkDigPGQ54",
  authDomain: "okr-dashboard-dio.firebaseapp.com",
  projectId: "okr-dashboard-dio",
  storageBucket: "okr-dashboard-dio.firebasestorage.app",
  messagingSenderId: "890858402465",
  appId: "1:890858402465:web:d582d6a70191fe305676e0",
  measurementId: "G-RLDEZ7G8TQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics }; 