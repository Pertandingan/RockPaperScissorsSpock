window.showLeaderboard = function () {
  document.getElementById("leaderboard-section").style.display = "block";
  document.getElementById("menu-section").style.display = "none";

  const users = JSON.parse(localStorage.getItem("users")) || {};

  // Convert users object to array with KD calculation
  const userArray = Object.entries(users).map(([username, data]) => {
    const { wins, ties, losses } = data.stats;
    const kd = (wins / (losses || 1));
    return {
      username,
      title: data.title || "Rookie",
      wins,
      ties,
      losses,
      kd: kd.toFixed(2),
      rawKD: kd // for sorting
    };
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
};
