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
            const errorMessage = error.message;
            alert("خطأ: " + errorMessage);
        });
});
