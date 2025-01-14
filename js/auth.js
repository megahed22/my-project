document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('location').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('user-type').value;
    
    // تسجيل الدخول باستخدام Firebase Authentication
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // إذا كانت عملية تسجيل الدخول ناجحة
            const user = userCredential.user;
            
            // التحقق من نوع المستخدم، وإعادة التوجيه إلى الصفحة المناسبة
            if (userType === 'teacher') {
                window.location.href = 'teacher.html';
            } else {
                window.location.href = 'student.html';
            }
        })
        .catch((error) => {
            const errorMessage = error.message;
            document.getElementById('error-message').innerText = errorMessage;
        });
});
