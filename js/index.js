// تهيئة مرجع Firestore
const db = firebase.firestore();

// الحصول على الآراء من Firestore
db.collection("student_reviews").orderBy("timestamp", "desc").get()
    .then((querySnapshot) => {
        const reviewsList = document.getElementById("student-reviews");
        querySnapshot.forEach((doc) => {
            // الحصول على البيانات من المستند
            const reviewData = doc.data();
            const listItem = document.createElement("li");
            listItem.textContent = `${reviewData.name}: ${reviewData.review}`;
            reviewsList.appendChild(listItem);
        });
    })
    .catch((error) => {
        console.error("خطأ في جلب المراجعات: ", error);
    });
