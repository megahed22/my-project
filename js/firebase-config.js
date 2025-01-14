// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
            // التحقق من الدور بعد تسجيل الدخول
            firebase.firestore().collection("users").doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        const role = doc.data().role; // الحصول على الدور
                        if (role === "student") {
                            window.location.href = "student-dashboard.html";  // توجيه الطالب إلى صفحته
                        } else if (role === "teacher") {
                            window.location.href = "teacher-dashboard.html";  // توجيه المعلم إلى صفحته
                        }
                    } else {
                        alert("لم يتم العثور على بيانات المستخدم.");
                    }
                })
                .catch((error) => {
                    console.error("خطأ في الحصول على الدور:", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("خطأ: " + errorMessage);
        });
});
