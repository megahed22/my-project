document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // إضافة المستخدم إلى قاعدة البيانات Firestore
            firebase.firestore().collection("users").doc(user.uid).set({
                email: email,
                role: "student", // أو "teacher" حسب الحاجة
            }).then(() => {
                alert("تم التسجيل بنجاح!");
                window.location.href = "login.html"; // التوجيه إلى صفحة تسجيل الدخول
            });
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert("خطأ: " + errorMessage);
        });
});
