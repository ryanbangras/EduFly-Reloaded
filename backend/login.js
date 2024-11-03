import { } from "https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js"

import { } from "https://www.gstatic.com/firebasejs/8.8.1/firebase-database.js"

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js'
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
	//apiKey: ,
	authDomain: "edufly-61bfe.firebaseapp.com",
	projectId: "edufly-61bfe",
	storageBucket: "edufly-61bfe.appspot.com",
	messagingSenderId: "467191151194",
	appId: "1:467191151194:web:cac30fd47ebff5a7233663",
	measurementId: "G-NQN411353D"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Add Firebase products that you want to use
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js'
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

document.getElementById('login-btn').addEventListener('click', function () {
	// Get the form data
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	// Simple validation (add more complex checks as needed)
	if (email === '' || password === '') {
		alert('Please fill in both fields');
	} else {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in 
				const user = userCredential.user;
				//window.location.href =;
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				alert(errorCode);
			});

	}
});

