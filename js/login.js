// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzUK08KZM997SmDZiaw2cBciLZoP2e5a0",
    authDomain: "taleem-6c9b2.firebaseapp.com",
    projectId: "taleem-6c9b2",
    storageBucket: "taleem-6c9b2.appspot.com",
    messagingSenderId: "746506526783",
    appId: "1:746506526783:web:516f4b2b98562b3dbc588a",
    measurementId: "G-MEASUREMENT_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// تسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            // التحقق من الدور في قاعدة البيانات Firestore
            firebase.firestore().collection("users").doc(user.uid).get().then((doc) => {
                if (doc.exists) {
                    const role = doc.data().role;

                    // التوجيه بناءً على الدور
                    if (role === 'teacher') {
                        window.location.href = "teacher-dashboard.html"; // توجيه المعلم
                    } else if (role === 'student') {
                        window.location.href = "student-dashboard.html"; // توجيه الطالب
                    }
                } else {
                    alert("مشكلة في البيانات!");
                }
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("خطأ: " + errorMessage);
        });
});
