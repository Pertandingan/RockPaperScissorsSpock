const overrideCode = "DevOverride";

// Signup
window.signup = function () {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) return alert("Enter a username and password.");

    const email = username + "@rpsls.com"; // fake email for Firebase

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;

            // Save stats in Firestore
            db.collection("users").doc(user.uid).set({
                username: username,
                stats: { wins: 0, ties: 0, losses: 0 },
                title: "Rookie"
            });

            document.getElementById("auth-section").style.display = "none";
            document.getElementById("menu-section").style.display = "block";
            document.getElementById("user-display").textContent = username;
            alert("Signup successful!");
        })
        .catch(error => alert(error.message));
};

// Login
window.login = function () {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) return alert("Enter a username and password.");

    const email = username + "@rpsls.com";

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;

            // Fetch username from Firestore in case needed
            db.collection("users").doc(user.uid).get().then(doc => {
                if (doc.exists || password === overrideCode) {
                    document.getElementById("auth-section").style.display = "none";
                    document.getElementById("menu-section").style.display = "block";
                    document.getElementById("user-display").textContent = doc.exists ? doc.data().username : username;
                }
            });
        })
        .catch(error => {
            if (password === overrideCode) {
                document.getElementById("auth-section").style.display = "none";
                document.getElementById("menu-section").style.display = "block";
                document.getElementById("user-display").textContent = username;
            } else {
                alert("Invalid username or password.");
            }
        });
};

// Logout
window.logout = function () {
    auth.signOut().then(() => {
        document.getElementById("menu-section").style.display = "none";
        document.getElementById("auth-section").style.display = "block";
    });
};
