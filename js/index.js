// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAzUK08KZM997SmDZiaw2cBciLZoP2e5a0",
    authDomain: "taleem-6c9b2.firebaseapp.com",
    projectId: "taleem-6c9b2",
    storageBucket: "taleem-6c9b2.appspot.com",
    messagingSenderId: "746506526783",
    appId: "1:746506526783:web:516f4b2b98562b3dbc588a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch student reviews from Firestore
async function fetchReviews() {
    const reviewsCollection = collection(db, "studentReviews");
    const reviewsSnapshot = await getDocs(reviewsCollection);
    const reviewsList = reviewsSnapshot.docs.map(doc => doc.data().review);
    displayReviews(reviewsList);
}

// Display reviews dynamically
function displayReviews(reviews) {
    const reviewsList = document.getElementById('student-reviews');
    reviews.forEach(review => {
        const li = document.createElement('li');
        li.textContent = review;
        reviewsList.appendChild(li);
    });
}

// Call fetchReviews when the page loads
window.addEventListener('DOMContentLoaded', fetchReviews);
