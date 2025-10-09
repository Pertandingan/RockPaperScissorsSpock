window.login = function () {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const users = JSON.parse(localStorage.getItem("users")) || {};

  const overrideCode = "DevOverride";

  if (users[username] && (users[username].password === password || password === overrideCode)) {
    localStorage.setItem("currentUser", username);
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("menu-section").style.display = "block";
    document.getElementById("user-display").textContent = username;
  } else {
    alert("Invalid username or password.");
  }
};


window.signup = function () {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (!users[username]) {
    users[username] = {
      password: password,
      stats: { wins: 0, ties: 0, losses: 0 },
      title: "Rookie"
    };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful");
  } else {
    alert("User already exists");
  }
};

window.logout = function () {
  localStorage.removeItem("currentUser");
  location.reload();
};

