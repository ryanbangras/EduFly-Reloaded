
    // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkep4kR1KlxAHUQM8-dJo-b0cOjUA1tCc",
    authDomain: "edufly-61bfe.firebaseapp.com",
    projectId: "edufly-61bfe",
    storageBucket: "edufly-61bfe.firebasestorage.app",
    messagingSenderId: "467191151194",
    appId: "1:467191151194:web:cac30fd47ebff5a7233663",
    measurementId: "G-NQN411353D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
auth.languageCode = "en";
const provider = new GoogleAuthProvider();

function updateUserProfile(user) {
    const userName = user.displayName || "Anonymous"; // Fallback name

    const profileLinkElement = document.getElementById('profileLink');
    if (profileLinkElement) {
        profileLinkElement.textContent = `${userName}'s profile`;
        profileLinkElement.href = "#"; // Set the profile link href if needed
    } else {
        console.error("Profile link element not found in the DOM.");
    }
}

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        updateUserProfile(user);
        console.log("User ID:", user.uid);
    } else {
        alert("Please create an account and log in.");
    }
});

