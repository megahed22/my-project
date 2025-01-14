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

firebase.initializeApp(firebaseConfig);

// تسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("تم تسجيل الدخول بنجاح!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("خطأ: " + errorMessage);
        });
});

// التسجيل
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const location = document.getElementById('location').value;
    const role = document.getElementById('role').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            firebase.firestore().collection("users").doc(user.uid).set({
                username: username,
                location: location,
                role: role
            });
            alert("تم التسجيل بنجاح!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("خطأ: " + errorMessage);
        });
});
