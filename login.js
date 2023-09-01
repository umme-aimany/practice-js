// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDxLfphXH363O2mD2Exo6NL9lsJezv1mx0",
    authDomain: "blogging-app-hakathon.firebaseapp.com",
    databaseURL: "https://blogging-app-hakathon-default-rtdb.firebaseio.com",
    projectId: "blogging-app-hakathon",
    storageBucket: "blogging-app-hakathon.appspot.com",
    messagingSenderId: "410730877490",
    appId: "1:410730877490:web:792bc1cfb06dc23d5d222b",
    measurementId: "G-LV5L0H156D"
  };

// initialize firebase
firebase.initializeApp(firebaseConfig);

// logout automatically
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location.href = "./all.html";
    }
});

// show Password
function showPassword(event) {
    event.target.className = "eye bi bi-eye-slash";
    event.target.previousElementSibling.type = "text";
    event.target.removeEventListener('click', showPassword);
    event.target.addEventListener('click', hidePassword);
}

// hide password
function hidePassword(event) {
    event.target.className = "eye bi bi-eye";
    event.target.previousElementSibling.type = "password";
    event.target.removeEventListener('click', hidePassword);
    event.target.addEventListener('click', showPassword);
}

function login(event) {
    event.preventDefault()
    let email = document.getElementById("email-login").value
    let password = document.getElementById("password-login").value
    let message = document.querySelector(".validationMessage");

    if (!(email.endsWith("@gmail.com"))) {
        message.innerText = `Invalid email address`;
        message.style.display = "block";
        message.style.color = "#e55865";
        return;
    }

    if (
        email.trim() === '' ||
        password.trim() === ''
        // || password.length > 8 || password.length < 4
    ) {
        message.innerText = `Please fill required fields`;
        message.style.display = "block";
        message.style.color = "#e55865";
        return;
    }

    // firebase

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // console.log("Login successful");
            Swal.fire({
                icon: 'success',
                title: 'Logged In',
                text: 'Login Successfull',
                confirmButtonColor: "#0079ff"
            })
            window.location.href = "./index.html";
        })
        .catch((error) => {
            console.log("Login error:", error);
            Swal.fire({
                    icon: 'error',
                    title: 'Access Denied',
                    text: 'Invalid email or password. Please enter correct credentials',
                    confirmButtonColor: "#0079ff"
                })
                // alert("Invalid email or password. Please enter correct credentials.");
        });

    document.getElementById("email-login").value
    document.getElementById("password-login").value
}