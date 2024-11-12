import { auth, onAuthStateChanged, signOut } from './database.js';
auth.languageCode = "en";

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, set profile link text
        const profileLink = document.getElementById('profileLink');
        if (profileLink) {
            profileLink.textContent =  `&#128100;` `Profile`;
        }
    } else {
        // User is not signed in; ensure profile link redirects to login
        document.getElementById('profileLink').addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default action
            window.location.href = "../../Login_Page/login.html"; // Redirect to login
        });
    }
});

// Logout functionality
document.getElementById("logout-btn").addEventListener("click", () => {
    signOut(auth).then(() => {
        alert("Logged out successfully");
        window.location.href = "../../Login_page/login.html";
    }).catch((error) => {
        alert("Error logging out: " + error.message);
    });
});




