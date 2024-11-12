import { auth, onAuthStateChanged, signOut } from './database.js';
auth.languageCode = "en";

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, set profile link text
        const profileLink = document.getElementById('profileLink');
        if (profileLink) {
            profileLink.textContent = `👤 Profile`;
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
// Logout functionality with Snackbar
document.getElementById("logout-btn").addEventListener("click", () => {
    signOut(auth).then(() => {
        showSnackbar("Logged out successfully!");
        window.location.href = "../../Login_page/login.html"; // Redirect after showing snackbar
    }).catch((error) => {
        showSnackbar("Error logging out: " + error.message, true);
    });
});

// Function to show the snackbar
function showSnackbar(message, isError = false) {
    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;

    // Change background color if it's an error
    snackbar.style.backgroundColor = isError ? '#dc3545' : '#4caf50';

    // Show the snackbar
    snackbar.classList.add("show");

    // Hide the snackbar after 3 seconds
    setTimeout(() => {
        snackbar.classList.remove("show");
    }, 3000);
}





