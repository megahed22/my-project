// جلب بيانات المعلم من Firebase بعد التحقق من تسجيل الدخول
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const userId = user.uid;

        // جلب البيانات من Firestore
        firebase.firestore().collection("teachers").doc(userId).get().then(doc => {
            if (doc.exists) {
                // تحميل الحصص التي قام المعلم بتدريسها
                const taughtClasses = doc.data().taughtClasses; // تأكد من حفظ الحصص في Firestore
                const classesList = document.getElementById('taughtClasses');
                taughtClasses.forEach(classItem => {
                    const li = document.createElement('li');
                    li.textContent = `حصة: ${classItem.name} في ${classItem.date}`;
                    classesList.appendChild(li);
                });

                // حالة الدفع
                const paymentStatus = doc.data().paymentStatus;
                if (paymentStatus === "paid") {
                    document.getElementById('paymentStatus').innerText = "تم دفع الرسوم بنجاح.";
                } else {
                    document.getElementById('paymentStatus').innerText = "لم يتم دفع الرسوم بعد.";
                }
            } else {
                alert("لا توجد بيانات للمعلم.");
            }
        }).catch(error => {
            console.error("حدث خطأ: ", error);
        });
    } else {
        window.location.href = "login.html"; // إذا لم يكن المستخدم مسجلاً الدخول، يتم توجيهه إلى صفحة تسجيل الدخول
    }
});

// إضافة حصة جديدة
document.getElementById('addClassForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const className = document.getElementById('className').value;
    const classDate = document.getElementById('classDate').value;
    
    // تحديث Firestore مع الحصة الجديدة
    const userId = firebase.auth().currentUser.uid;
    firebase.firestore().collection("teachers").doc(userId).update({
        taughtClasses: firebase.firestore.FieldValue.arrayUnion({ name: className, date: classDate })
    }).then(() => {
        alert("تم إضافة الحصة بنجاح.");
    }).catch(error => {
        alert("حدث خطأ في إضافة الحصة.");
    });
});
