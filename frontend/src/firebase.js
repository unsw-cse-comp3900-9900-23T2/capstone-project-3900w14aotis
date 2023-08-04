// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
const WEB_API_KEY = process.env.REACT_APP_WEB_API_KEY;
const AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN;
const STORAGE_BUCKET = process.env.REACT_APP_STORAGE_BUCKET;
const MESSAGE_SENDER_ID = process.env.REACT_APP_MESSAGE_SENDER_ID;
const REACT_APP_ID = process.env.REACT_APP_ID;
const MEASUREMENT_ID = process.env.REACT_APP_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: WEB_API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: REACT_APP_ID,
  measurementId: MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
