window.openSettings = function () {
  document.getElementById("settings-section").style.display = "block";
  document.getElementById("menu-section").style.display = "none";
  document.getElementById("settings-section").innerHTML = `
    <h3>Settings</h3>
    <button onclick="toggleNightMode()">Toggle Night Mode</button><br>
    <button onclick="changePassword()">Change Password</button><br>
    <button onclick="setPassword()">Set Password</button><br>
    <button onclick="toggleGameMode()">Toggle Lizard-Spock Mode</button><br>
    <label for="rounds">Rounds to Win: <span id="rounds-display">${winThreshold}</span></label><br>
    <input type="range" id="rounds" min="1" max="10" value="${winThreshold}" onchange="updateRounds(this.value)" />
    <br><button onclick="backToMenu()">Back</button>
  `;
};

window.toggleNightMode = function () {
  document.body.classList.toggle("night");
};

window.changePassword = function () {
  const oldPass = prompt("Enter old password:");
  const newPass = prompt("Enter new password:");
  const user = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users"));
  if (users[user].password === oldPass) {
    users[user].password = newPass;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password changed");
  } else {
    alert("Incorrect old password");
  }
};

window.setPassword = function () {
  const newPass = prompt("Set your password:");
  const user = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users"));
  users[user].password = newPass;
  localStorage.setItem("users", JSON.stringify(users));
  alert("Password set");
};

window.toggleGameMode = function () {
  lizardSpockMode = !lizardSpockMode;
  alert(`Lizard-Spock mode is now ${lizardSpockMode ? "ON" : "OFF"}`);
};

window.updateRounds = function (value) {
  winThreshold = parseInt(value);
  document.getElementById("rounds-display").textContent = value;
};
window.toggleNightMode = function () {
  const isNight = document.body.classList.toggle("night");
  localStorage.setItem("nightMode", isNight ? "true" : "false");
};

