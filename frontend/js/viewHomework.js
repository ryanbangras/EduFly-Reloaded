import { auth, db, onAuthStateChanged, getFirestore, doc, getDoc, collection, getDocs, setDoc, addDoc, deleteDoc } from '../js/database.js';

// Create Vue application
const vueApp = Vue.createApp({
    data() {
        return {
            classes: [],
            selectedClass: "",
            homeworkList: [],
        };
    },
    async created() {
        const urlParams = new URLSearchParams(window.location.search);
        this.selectedClass = urlParams.get('class'); 
        // Check for user authentication and fetch classes
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userEmail = user.email;
                const docRef = doc(db, 'Teachers', userEmail);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    this.classes = docSnap.data().Classes; // Fetch classes
                } else {
                    console.error("No such document!");
                }
            } else {
                console.error("User not logged in.");
            }
        });
    },
    methods: {
        logSelectedClass() {
            console.log(this.classes);
            console.log(this.selectedClass); // Log the selected class to the console
        },
        async loadHomework() {
            try {
                const response = await fetch('http://localhost:3000/api/homeworks');
                const homeworks = await response.json();

                // Filter homework based on the selected class
                this.homeworkList = homeworks.filter(hw => hw.sectionId === this.selectedClass);
                
            } catch (error) {
                console.error('Error loading homework:', error);
            }
        },
    },
    watch: {
        selectedClass(newClass) {
            this.logSelectedClass(); // Log the selected class whenever it changes
            this.loadHomework(); // Call loadHomework when selectedClass changes
        }
    }
});

// Mount the Vue app
vueApp.mount('#app');
