// when user manually keys in 
import { auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '../../frontend/js/database.js';
import { db, getFirestore, doc, getDoc, collection, getDocs } from '../../frontend/js/database.js';

// Function to check user in different collections
async function checkUserInCollections(db, email, collections) {
  for (const collection of collections) {
    const docRef = doc(db, collection, email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(`User found in ${collection}`);
      return { found: true, collection: collection, data: docSnap.data() };
    }
  }
  return { found: false };
}


const submit = document.getElementById('submit')
submit.addEventListener("click", function (event) {
  event.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  // const auth = getAuth();
  // Main authentication function
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      if (user) {
        const userEmail = user.email;

        // Specify the collections to search
        const collections = ['Teachers', 'Students', 'Admins'];

        // Check across collections
        const result = await checkUserInCollections(db, userEmail, collections);

        if (result.found) {
          const { collection, data } = result;

          // Perform actions based on the collection
          if (collection === 'Teachers') {
            console.log('Logging in as Teacher');
            alert("Welcome, Teacher!");
            window.location.href = "../Homepage/home_teacher.html";
          } else if (collection === 'Students') {
            console.log('Logging in as Student');
            alert("Welcome, Student!");
            window.location.href = "../Homepage/home_student.html";
          } else if (collection === 'Admins') {
            console.log('Logging in as Admin');
            alert("Welcome, Admin!");
            window.location.href = "../Homepage/home_admin.html";
          }

          // Optionally, access the data retrieved from Firestore
          console.log("User Data:", data);

        } else {
          alert("No matching user found in any collection.");
        }
      } else {
        console.log("User not logged in.");
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error logging in:", errorCode, errorMessage);
      alert(errorMessage);
    });


  //   alert("Logging In")
  //   window.location.href = "../Homepage/home_student.html"
  //   // ...
  // }).catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   alert(errorMessage)
  //   // ..
  // });


  // when user uses Google Sign-in method
  // const auth = getAuth(app);
  // auth.languageCode = "en"
  // const provider = new GoogleAuthProvider();

  // const googleLogin = document.getElementById("google-login-btn");
  // googleLogin.addEventListener("click", function () {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // Access Token and user info
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const user = result.user;
  //       console.log(user);

  //       // Redirect to the teacher's homepage after successful login
  //       window.location.href = "../Homepage/home_student.html";
  //     })
  //     .catch((error) => {
  //       // Handle Errors here
  //       console.error("Error during sign-in:", error.message);
  //     });
  });