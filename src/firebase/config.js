
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA-QPwQk9r4N_nd_Xhyd5wDhJLLqOYprcI",
  authDomain: "miniblog-f0628.firebaseapp.com",
  projectId: "miniblog-f0628",
  storageBucket: "miniblog-f0628.appspot.com",
  messagingSenderId: "321483680119",
  appId: "1:321483680119:web:4cd1c8943b2549a44ed972",
  measurementId: "G-6M0F39HLB1"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };