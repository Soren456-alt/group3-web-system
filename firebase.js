// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBh8wIPGCUJ5uGexxpU8tsrNHuc-fmcrUA",
    authDomain: "sia101-activity2-macaben-5fc48.firebaseapp.com",
    projectId: "sia101-activity2-macaben-5fc48",
    storageBucket: "sia101-activity2-macaben-5fc48.appspot.com",
    messagingSenderId: "442999947881",
    appId: "1:442999947881:web:e958f2f9215f9b4ec458f8",
    measurementId: "G-GLET25NKMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Show registration form and hide login form
document.getElementById("show-register").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("registration-form").classList.remove("hidden");
    document.getElementById("login-form").classList.add("hidden");
});

// Show login form and hide registration form
document.getElementById("back-to-login").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("registration-form").classList.add("hidden");
    document.getElementById("login-form").classList.remove("hidden");
});

// Handle registration with Firebase
document.getElementById('btn_reg').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default form submission

    let email = document.getElementById("register-email").value;
    let password = document.getElementById("register-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("User Registered Successfully!");
            const user = userCredential.user;
            console.log(user);
            document.getElementById("registration-form").classList.add("hidden");
            document.getElementById("login-form").classList.remove("hidden");
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage); // Show error message to user
            console.log(errorMessage);
        });
});

// Handle login with Firebase
document.getElementById("loginForm").addEventListener('submit', (e) => {
    e.preventDefault();

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Redirect to location.html after successful login
            window.location.href = "location.html";
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage); // Show error message to user
            console.log(errorMessage);
        });
});
