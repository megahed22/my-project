// جلب بيانات الطالب من Firebase بعد التحقق من تسجيل الدخول
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const userId = user.uid;

        // جلب البيانات من Firestore
        firebase.firestore().collection("students").doc(userId).get().then(doc => {
            if (doc.exists) {
                // تحميل الحصص المتبقية
                const remainingClasses = doc.data().remainingClasses; // تأكد من حفظ الحصص في Firestore
                const classesList = document.getElementById('remainingClasses');
                remainingClasses.forEach(classItem => {
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
                alert("لا توجد بيانات للطالب.");
            }
        }).catch(error => {
            console.error("حدث خطأ: ", error);
        });
    } else {
        window.location.href = "login.html"; // إذا لم يكن المستخدم مسجلاً الدخول، يتم توجيهه إلى صفحة تسجيل الدخول
    }
});

// رفع إيصال الدفع
document.getElementById('uploadReceiptForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const receiptImage = document.getElementById('receiptImage').files[0];
    
    if (receiptImage) {
        const storageRef = firebase.storage().ref();
        const receiptRef = storageRef.child(`receipts/${firebase.auth().currentUser.uid}/${receiptImage.name}`);

        receiptRef.put(receiptImage).then(() => {
            alert("تم رفع الإيصال بنجاح.");
            
            // تحديث حالة الدفع في Firestore
            const userId = firebase.auth().currentUser.uid;
            firebase.firestore().collection("students").doc(userId).update({
                paymentStatus: "pending" // يتم تعيين حالة الدفع إلى "معلق" حتى يتم التحقق من الإيصال
            }).then(() => {
                console.log("تم تحديث حالة الدفع.");
            }).catch(error => {
                alert("حدث خطأ في تحديث حالة الدفع.");
            });
        }).catch(error => {
            alert("حدث خطأ في رفع الإيصال.");
        });
    } else {
        alert("من فضلك اختر صورة إيصال الدفع.");
    }
});
