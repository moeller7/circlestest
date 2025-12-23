import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
const db = getFirestore(app);


window.signup = async function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value.trim();

    if (!username) {
        document.getElementById("error").textContent = "Username required";
        return;
    }

    try {
        // Check if username already exists
        const usernameDoc = await getDoc(doc(db, "usernames", username));
        if (usernameDoc.exists()) {
            document.getElementById("error").textContent = "Username already taken";
            return;
        }

        // Create Firebase Auth account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        // Create user profile
        await setDoc(doc(db, "users", uid), {
            email: email,
            username: username,
            circles: {}
        });

        // Map username to uid
        await setDoc(doc(db, "usernames", username), { uid: uid });

        // Redirect to circles page
        window.location = "circles.html";

    } catch (err) {
        document.getElementById("error").textContent = err.message;
    }
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
