function onScanSuccess(qrCodeMessage) {
    const studentId = qrCodeMessage;
    const timestamp = new Date().toISOString();
  
    fetch('/record-attendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ studentId, timestamp })
    })
    .then(res => res.json())
    .then(data => {
      const resultDiv = document.getElementById('result');
      if (data.success) {
        resultDiv.innerHTML = `
          ✅ Attendance recorded for ID: ${studentId} <br>
          🕒 Time: ${new Date(timestamp).toLocaleString()}
        `;
      } else {
        resultDiv.innerHTML = `❌ ${data.message}`;
      }
    });
  }
  
  // Initialize QR Scanner
  const html5QrCode = new Html5Qrcode("qr-reader");
  
  Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
      const cameraId = devices[0].id;
      html5QrCode.start(
        cameraId,
        {
          fps: 10,
          qrbox: 250
        },
        onScanSuccess
      );
    } else {
      alert("No camera found.");
    }
  }).catch(err => {
    alert("Camera error: " + err);
  });
  