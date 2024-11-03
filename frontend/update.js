// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {

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
        profileLinkElement.href = "#";
    } else {
        console.error("Profile link element not found in the DOM.");
    }
}

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, update profile information
        updateUserProfile(user);
        console.log("User ID:", user.uid);
    } else {
        // Redirect to login page if user is not signed in
        // alert("Please log in.");
        window.location.href = "../Login Page/login_teacher.html";
    }
});

// Wait until the DOM is fully loaded to attach the logout event listener
document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout-btn");

    // Check if the logout button exists in the DOM
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            signOut(auth)
                .then(() => {
                    // Sign-out successful
                    alert("Logged out successfully");
                    window.location.href = "../Login Page/login_teacher.html"; // Redirect to login page
                })
                .catch((error) => {
                    // Handle errors
                    alert("Error logging out: " + error.message);
                });
        });
    } else {
        console.error("Logout button not found in the DOM.");
    }
});



