import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKUqKM5ymlj2He3Nuq6q8BvOfxCZ8-Vzw",
  authDomain: "circles-4c684.firebaseapp.com",
  projectId: "circles-4c684",
  storageBucket: "circles-4c684.firebasestorage.app",
  messagingSenderId: "733616859510",
  appId: "1:733616859510:web:0a343fbc6458a44917f257"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.signup = function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => window.location = "circles.html")
        .catch(err => {
            document.getElementById("error").textContent = err.message;
        });
};

window.login = function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => window.location = "circles.html")
        .catch(() => {
            document.getElementById("error").textContent =
                "Incorrect email or password.";
        });
};
