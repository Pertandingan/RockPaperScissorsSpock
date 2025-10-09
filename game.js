let lizardSpockMode = true;
let winThreshold = 5;
let roundStats = { wins: 0, losses: 0, ties: 0 };

const emojiMap = {
  rock: "✊",
  paper: "🧻",
  scissors: "✌️",
  lizard: "🦎",
  spock: "🖖"
};

window.startGame = function () {
  roundStats = { wins: 0, losses: 0, ties: 0 };
  document.getElementById("game-section").style.display = "block";
  document.getElementById("menu-section").style.display = "none";
  renderGameUI();
};

function renderGameUI() {
  document.getElementById("game-section").innerHTML = `
    <h3>Choose your move:</h3>
    ${["rock", "paper", "scissors", ...(lizardSpockMode ? ["lizard", "spock"] : [])]
      .map(move => `<button onclick="play('${move}')">${emojiMap[move]} ${move}</button>`)
      .join("")}
    <div id="result"></div>
    <button onclick="backToMenu()">Back</button>
  `;
}

window.play = function (userMove) {
  const moves = ["rock", "paper", "scissors", ...(lizardSpockMode ? ["lizard", "spock"] : [])];
  const computerMove = moves[Math.floor(Math.random() * moves.length)];
  const result = getResult(userMove, computerMove);
  document.getElementById("result").innerText = `You chose ${emojiMap[userMove]} ${userMove}, computer chose ${emojiMap[computerMove]} ${computerMove}. ${result}`;

  if (result.includes("win")) roundStats.wins++;
  else if (result.includes("lose")) roundStats.losses++;
  else roundStats.ties++;

  if (roundStats.wins >= winThreshold || roundStats.losses >= winThreshold) {
    endMatch();
  }
};

function getResult(user, comp) {
  if (user === comp) return "It's a tie!";
  const winMap = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["spock", "paper"],
    spock: ["scissors", "rock"]
  };
  return winMap[user].includes(comp) ? "You win!" : "You lose!";
}

function endMatch() {
  const user = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users"));
  const stats = users[user].stats;

  stats.wins += roundStats.wins;
  stats.losses += roundStats.losses;
  stats.ties += roundStats.ties;

  const kd = (stats.wins / (stats.losses || 1)).toFixed(2);
  const title = getTitle(kd);
  users[user].title = title;

  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("game-section").innerHTML = `
    <h3>Match Over</h3>
    <p>Wins: ${roundStats.wins}</p>
    <p>Losses: ${roundStats.losses}</p>
    <p>Ties: ${roundStats.ties}</p>
    <p>KD: ${kd}</p>
    <p>Title: ${title}</p>
    <button onclick="backToMenu()">Back to Menu</button>
  `;
}

function getTitle(kd) {
  if (kd >= 3) return "Legend";
  if (kd >= 2) return "Champion";
  if (kd >= 1.5) return "Veteran";
  if (kd >= 1) return "Contender";
  return "Rookie";
}

window.backToMenu = function () {
  document.getElementById("game-section").style.display = "none";
  document.getElementById("rules-section").style.display = "none";
  document.getElementById("settings-section").style.display = "none";
  document.getElementById("leaderboard-section").style.display = "none";
  document.getElementById("menu-section").style.display = "block";
};
