// التحقق من حالة تسجيل الدخول
firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        // إذا لم يكن المستخدم مسجل دخوله، قم بإعادة التوجيه إلى صفحة تسجيل الدخول
        window.location.href = 'index.html';
    }
});

// تسجيل الخروج
document.getElementById('logout-button').addEventListener('click', () => {
    firebase.auth().signOut()
        .then(() => {
            window.location.href = 'index.html'; // إعادة التوجيه إلى صفحة تسجيل الدخول بعد تسجيل الخروج
        })
        .catch(error => {
            console.error('Error during sign out:', error);
        });
});
