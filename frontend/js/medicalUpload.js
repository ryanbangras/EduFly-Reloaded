import { auth, db, onAuthStateChanged, doc, getDoc } from '../js/database.js';

const vueApp = Vue.createApp({
    data() {
        return {
            studentName: "",
            userId: "", // Holds StudentID after Firebase fetch
            userClass: "",  // Holds Class after Firebase fetch
            certificateFile: null, // Stores the uploaded file
            message: "" // Stores the response message
        };
    },
    async created() {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userEmail = user.email;
                const docRef = doc(db, 'Students', userEmail);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("vue data types will be populated");
                    this.studentName = docSnap.data().FName + " " + docSnap.data().LName; // Populates Student Full Name
                    this.userId = docSnap.data().StudentID; // Populates StudentID
                    this.userClass = docSnap.data().Class; // Populates Class
                    console.log(this.studentName, this.userId, this.userClass);
                } else {
                    console.error("No such document!");
                }
            } else {
                console.error("User not logged in.");
            }
        });
    },
    methods: {
        handleFileUpload(event) {
            this.certificateFile = event.target.files[0]; // Store selected file
        },
        async uploadMedicalCertificate() {
            if (!this.certificateFile) {
                this.message = '<div class="alert alert-danger">Please select a file to upload</div>';
                return;
            }

            const formData = new FormData();
            formData.append('studentId', this.userId);
            formData.append('sectionId', this.userClass);
            formData.append('certificateFile', this.certificateFile);

            try {
                const response = await fetch('http://localhost:3000/api/upload-medical', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    this.message = '<div class="alert alert-success">Medical certificate uploaded successfully</div>';
                    this.certificateFile = null; // Clear file data
                    document.getElementById('certificateFileInput').value = ""; // Clear file input in UI
                } else {
                    this.message = '<div class="alert alert-danger">Failed to upload medical certificate</div>';
                }
            } catch (error) {
                this.message = '<div class="alert alert-danger">Error uploading medical certificate</div>';
            }
        }
    }
});

vueApp.mount("#app");
