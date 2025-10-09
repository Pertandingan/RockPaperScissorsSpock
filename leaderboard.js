window.showLeaderboard = function () {
    document.getElementById("leaderboard-section").style.display = "block";
    document.getElementById("menu-section").style.display = "none";

    // Fetch all users from Firestore
    db.collection("users").get().then(snapshot => {
        const userArray = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            const stats = data.stats || { wins: 0, ties: 0, losses: 0 };
            const kd = (stats.wins / (stats.losses || 1));
            userArray.push({
                username: data.username || "Unknown",
                title: data.title || "Rookie",
                wins: stats.wins,
                ties: stats.ties,
                losses: stats.losses,
                kd: kd.toFixed(2),
                rawKD: kd
            });
        });

        // Sort by KD descending
        userArray.sort((a, b) => b.rawKD - a.rawKD);

        // Build HTML
        let html = `<h3>Leaderboard</h3>
      <table>
        <tr><th>User</th><th>Title</th><th>Wins</th><th>Ties</th><th>Losses</th><th>All-Time KD</th></tr>`;

        for (let user of userArray) {
            html += `<tr>
        <td>${user.username}</td>
        <td>${user.title}</td>
        <td>${user.wins}</td>
        <td>${user.ties}</td>
        <td>${user.losses}</td>
        <td>${user.kd}</td>
      </tr>`;
        }

        html += `</table>
      <button onclick="backToMenu()">Back</button>`;

        document.getElementById("leaderboard-section").innerHTML = html;
    }).catch(error => {
        console.error("Error fetching leaderboard:", error);
        document.getElementById("leaderboard-section").innerHTML = "<p>Failed to load leaderboard.</p><button onclick='backToMenu()'>Back</button>";
    });
};
