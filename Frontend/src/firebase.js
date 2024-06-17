// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY,
  authDomain: "blogging-website-05.firebaseapp.com",
  projectId: "blogging-website-05",
  storageBucket: "blogging-website-05.appspot.com",
  messagingSenderId: "669962888345",
  appId: "1:669962888345:web:b0dee13d7a8e03a50bc408"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);