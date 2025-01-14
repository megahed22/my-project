const uploadReceiptForm = document.getElementById('upload-receipt-form');

uploadReceiptForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const receiptInput = document.getElementById('receipt');
  
  if (receiptInput.files.length > 0) {
    const file = receiptInput.files[0];
    const storageRef = firebase.storage().ref('receipts/' + file.name);

    // رفع الإيصال إلى Firebase Storage
    storageRef.put(file)
      .then(() => {
        alert('تم رفع الإيصال بنجاح');
      })
      .catch((error) => {
        alert('حدث خطأ في رفع الإيصال: ' + error.message);
      });
  }
});
