document.getEl// الحصول على مرجع Firebase Auth
const auth = firebase.auth();

// التحقق من صحة النموذج
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();  // منع إرسال النموذج

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // محاولة تسجيل الدخول
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // تسجيل الدخول ناجح
            window.location.href = 'index.html'; // توجيه المستخدم إلى الصفحة الرئيسية
        })
        .catch((error) => {
            // في حالة حدوث خطأ
            console.error("خطأ في تسجيل الدخول: ", error);
            alert("فشل في تسجيل الدخول. تأكد من البريد الإلكتروني وكلمة المرور.");
        });
});
