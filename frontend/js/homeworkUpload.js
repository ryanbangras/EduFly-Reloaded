document.getElementById('homeworkForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentId = document.getElementById('studentId').value;
    const homeworkFile = document.getElementById('homeworkFile').files[0];
    const formData = new FormData();
    formData.append('studentId', studentId);
    formData.append('homeworkFile', homeworkFile);

    const messageDiv = document.getElementById('message');
    try {
        const response = await fetch('http://localhost:5000/api/upload-homework', {
            method: 'POST',
            body: formData
        });
        
        messageDiv.innerHTML = response.ok
            ? '<div class="alert alert-success">Homework uploaded successfully</div>'
            : '<div class="alert alert-danger">Failed to upload homework</div>';
    } catch (error) {
        messageDiv.innerHTML = '<div class="alert alert-danger">Error uploading homework</div>';
    }
});
