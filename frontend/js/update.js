import { auth, onAuthStateChanged, signOut } from './database.js';
auth.languageCode = "en";

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, set profile link text
        const profileLink = document.getElementById('profileLink');
        if (profileLink) {
            profileLink.textContent = `${user.displayName || "Your"} Profile`;
        }
    } else {
        // User is not signed in; ensure profile link redirects to login
        document.getElementById('profileLink').addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default action
            window.location.href = "../Login Page/login_teacher.html"; // Redirect to login
        });
    }
});

// Logout functionality
document.getElementById("logout-btn").addEventListener("click", () => {
    signOut(auth).then(() => {
        alert("Logged out successfully");
        window.location.href = "../Login_Page_Teacher/login_teacher.html";
    }).catch((error) => {
        alert("Error logging out: " + error.message);
    });
});

// Redirect to login if user is not authenticated
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // If the user is not logged in, redirect to login page
        window.location.href = "../Login_Page_Teacher/login_teacher.html";
    } else {
        // If user is logged in, display user's profile name on profile link
        const profileLink = document.getElementById('profileLink');
        if (profileLink) {
            profileLink.textContent = `${user.displayName || "Your"} Profile`;
        }
    }
});

// // Logout functionality
// const logoutBtn = document.getElementById("logout-btn");
// if (logoutBtn) {
//     logoutBtn.addEventListener("click", () => {
//         signOut(auth)
//             .then(() => {
//                 alert("Logged out successfully");
//                 window.location.href = "../Login Page/login_teacher.html";
//             })
//             .catch((error) => {
//                 alert("Error logging out: " + error.message);
//             });
//     });
// }

// linking user to account type
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         const email = user.email;
//         if (email == "ryxnng02@gmail.com"){
//             document.getElementById("account_type").innerText = "Student Account";
//         }
//         if (email == "jamietan888@gmail.com"){
//             document.getElementById("account_type").innerText = "Teacher Account";
//         }
//         if (email == "jamie.tan.2023@scis.smu.edu.sg"){
//             document.getElementById("account_type").innerText = "Parent Account";
//         }
//     }
// });



