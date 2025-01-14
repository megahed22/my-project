// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzUK08KZM997SmDZiaw2cBciLZoP2e5a0",
    authDomain: "taleem-6c9b2.firebaseapp.com",
    projectId: "taleem-6c9b2",
    storageBucket: "taleem-6c9b2.appspot.com",
    messagingSenderId: "746506526783",
    appId: "1:746506526783:web:516f4b2b98562b3dbc588a",
    measurementId: "G-MEASUREMENT_ID" // إذا كنت تستخدم Google Analytics، أضف ID القياس هنا
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
