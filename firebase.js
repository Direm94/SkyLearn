// Configuración de Firebase (obtenida desde la consola)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT.appspot.com",
  messagingSenderId: "ID_DEL_MENSAJERO",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Base de datos Firestore
const db = firebase.firestore();

console.log("Firebase conectado");
