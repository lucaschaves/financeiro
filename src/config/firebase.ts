import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDJfZTj8-uA7H4Dm4q0kZydGWBzqj4dT_8",
  authDomain: "financeiro-70156.firebaseapp.com",
  databaseURL: "https://financeiro-70156-default-rtdb.firebaseio.com",
  projectId: "financeiro-70156",
  storageBucket: "financeiro-70156.firebasestorage.app",
  messagingSenderId: "321726727096",
  appId: "1:321726727096:web:2b2eb102343bb432ef854d",
  measurementId: "G-QX034J8K3S"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);