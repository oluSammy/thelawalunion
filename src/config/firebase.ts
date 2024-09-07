// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvPZZBo-ITTyw9YUYYGfYvtnithHzTzsw",
    authDomain: "thelawalunion-5683a.firebaseapp.com",
    projectId: "thelawalunion-5683a",
    storageBucket: "thelawalunion-5683a.appspot.com",
    messagingSenderId: "33864437856",
    appId: "1:33864437856:web:6ae72636fb947ca5787305",
    measurementId: "G-13TJ2LQ35X"
};

/**
 const firebaseConfig = {
  apiKey: "AIzaSyCABT_M4N1nKem747Nr5123JmSiSzEsGeo",
  authDomain: "thelawalunion-e079f.firebaseapp.com",
  projectId: "thelawalunion-e079f",
  storageBucket: "thelawalunion-e079f.appspot.com",
  messagingSenderId: "811432008736",
  appId: "1:811432008736:web:75ad12de8036250be27045",
  measurementId: "G-3X9R8DPDM8"
};
 */

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const STORAGE_FOLDER_PATH = "gs://thelawalunion-5683a.appspot.com";
export const storage = getStorage(app, STORAGE_FOLDER_PATH);

export default app;