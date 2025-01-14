// الحصول على المستخدم من Firebase
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // استرجاع الدروس الخاصة بالمعلم من Firestore
        firebase.firestore().collection("courses").where("teacherId", "==", user.uid).get()
            .then((querySnapshot) => {
                const coursesContainer = document.getElementById('teacher-courses');
                querySnapshot.forEach((doc) => {
                    const course = doc.data();
                    const courseElement = document.createElement('div');
                    courseElement.className = 'course';
                    courseElement.innerHTML = `
                        <h3>${course.name}</h3>
                        <p>عدد الطلاب: ${course.students.length}</p>
                        <p>موعد الدورة: ${course.schedule}</p>
                    `;
                    coursesContainer.appendChild(courseElement);
                });
            }).catch((error) => {
                console.error("خطأ في جلب الدروس:", error);
            });
    } else {
        window.location.href = "login.html"; // إذا لم يكن المستخدم مسجلاً الدخول
    }
});
