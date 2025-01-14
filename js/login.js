const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const residence = document.getElementById('residence').value;
  const userType = document.getElementById('user-type').value;

  // تسجيل الدخول باستخدام Firebase
  auth.signInAnonymously()
    .then(() => {
      // حفظ نوع المستخدم ومحل الإقامة في قاعدة البيانات
      db.collection('users').add({
        residence: residence,
        userType: userType
      })
      .then(() => {
        // التوجيه إلى الصفحة المناسبة بناءً على نوع المستخدم
        if (userType === 'teacher') {
          window.location.href = 'teacher.html';
        } else {
          window.location.href = 'student.html';
        }
      })
      .catch((error) => {
        alert('حدث خطأ في التسجيل: ' + error.message);
      });
    })
    .catch((error) => {
      alert('فشل في تسجيل الدخول: ' + error.message);
    });
});
