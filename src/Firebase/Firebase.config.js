// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv53ItUe2WzjH5qX7kYV5brKc5y91T1h4",
  authDomain: "doctors-portal-af360.firebaseapp.com",
  projectId: "doctors-portal-af360",
  storageBucket: "doctors-portal-af360.appspot.com",
  messagingSenderId: "94835871329",
  appId: "1:94835871329:web:5ccde0812b587980a7a420"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;