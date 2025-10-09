let lizardSpockMode = true;
let winThreshold = 5;
let roundStats = { wins: 0, losses: 0, ties: 0 };
let cheatMode = false; // Cheat toggle

const emojiMap = {
    rock: "✊",
    paper: "🧻",
    scissors: "✌️",
    lizard: "🦎",
    spock: "🖖"
};

// Toggle cheat mode with "=" key
document.addEventListener("keydown", (e) => {
    if (e.key === "=") {
        cheatMode = !cheatMode;
        console.log("Cheat mode:", cheatMode ? "ON" : "OFF");
        const banner = document.getElementById("cheat-banner");
        if (cheatMode) {
            if (!banner) {
                const div = document.createElement("div");
                div.id = "cheat-banner";
                div.style.position = "fixed";
                div.style.top = "0";
                div.style.left = "0";
                div.style.width = "100%";
                div.style.background = "red";
                div.style.color = "white";
                div.style.textAlign = "center";
                div.style.padding = "5px";
                div.style.fontWeight = "bold";
                div.innerText = "CHEAT MODE ACTIVE";
                document.body.appendChild(div);
            }
        } else if (banner) {
            banner.remove();
        }
    }
});

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

    let computerMove;
    if (cheatMode) {
        const loseMap = {
            rock: ["scissors", "lizard"],
            paper: ["rock", "spock"],
            scissors: ["paper", "lizard"],
            lizard: ["spock", "paper"],
            spock: ["scissors", "rock"]
        };
        const losingOptions = loseMap[userMove];
        computerMove = losingOptions[Math.floor(Math.random() * losingOptions.length)];
    } else {
        computerMove = moves[Math.floor(Math.random() * moves.length)];
    }

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
    const user = auth.currentUser;
    if (!user) return alert("No user logged in!");

    const userRef = db.collection("users").doc(user.uid);

    userRef.get().then(doc => {
        if (!doc.exists) return;

        const stats = doc.data().stats;

        // Update stats
        stats.wins += roundStats.wins;
        stats.losses += roundStats.losses;
        stats.ties += roundStats.ties;

        const kd = (stats.wins / (stats.losses || 1)).toFixed(2);
        const title = getTitle(kd);

        // Save back to Firestore
        userRef.update({
            stats: stats,
            title: title
        });

        document.getElementById("game-section").innerHTML = `
      <h3>Match Over</h3>
      <p>Wins: ${roundStats.wins}</p>
      <p>Losses: ${roundStats.losses}</p>
      <p>Ties: ${roundStats.ties}</p>
      <p>KD: ${kd}</p>
      <p>Title: ${title}</p>
      <button onclick="backToMenu()">Back to Menu</button>
    `;
    });
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
