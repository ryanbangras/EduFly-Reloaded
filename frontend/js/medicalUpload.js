document.getElementById('medicalForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentId = document.getElementById('studentId').value;
    const certificateFile = document.getElementById('certificateFile').files[0];
    const formData = new FormData();
    formData.append('studentId', studentId);
    formData.append('certificateFile', certificateFile);

    const messageDiv = document.getElementById('message');
    try {
        const response = await fetch('http://localhost:5000/api/upload-medical', {
            method: 'POST',
            body: formData
        });
        
        messageDiv.innerHTML = response.ok
            ? '<div class="alert alert-success">Medical certificate uploaded successfully</div>'
            : '<div class="alert alert-danger">Failed to upload medical certificate</div>';
    } catch (error) {
        messageDiv.innerHTML = '<div class="alert alert-danger">Error uploading medical certificate</div>';
    }
});
