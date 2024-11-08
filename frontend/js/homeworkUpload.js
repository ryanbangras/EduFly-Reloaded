import { auth, db, onAuthStateChanged, doc, getDoc } from '../js/database.js';

const vueApp = Vue.createApp({
    data() {
        return {
            loginEmail: "", // Holds StudentID after Firebase fetch
            userClass: "",  // Holds Class after Firebase fetch
            homeworkFile: null, // Stores the uploaded file
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
                    this.loginEmail = docSnap.data().StudentID; // Populates StudentID
                    this.userClass = docSnap.data().Class;       // Populates Class
                    console.log(this.loginEmail, this.userClass);
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
            this.homeworkFile = event.target.files[0]; // Store selected file
        },
        async uploadHomework() {
            if (!this.homeworkFile) {
                this.message = '<div class="alert alert-danger">Please select a file to upload</div>';
                return;
            }

            const formData = new FormData();
            formData.append('studentId', this.loginEmail);
            formData.append('sectionId', this.userClass);
            formData.append('homeworkFile', this.homeworkFile);

            try {
                const response = await fetch('http://localhost:3000/api/upload-homework', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    this.message = '<div class="alert alert-success">Homework uploaded successfully</div>';
                    this.loginEmail = ""; // Clear form data if necessary
                    this.userClass = "";
                    this.certificateFile = null;
                } else {
                    this.message = '<div class="alert alert-danger">Failed to upload homework</div>';
                }
            } catch (error) {
                this.message = '<div class="alert alert-danger">Error uploading homework</div>';
            }
        }
    }
});

vueApp.mount("#app");
