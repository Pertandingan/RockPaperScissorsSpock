window.showRules = function () {
  document.getElementById("rules-section").style.display = "block";
  document.getElementById("menu-section").style.display = "none";
  document.getElementById("rules-section").innerHTML = `
    <h3>Rules</h3>
    <p>
      ✊ Rock crushes ✌️ Scissors and 🦎 Lizard<br>
      🧻 Paper covers ✊ Rock and disproves 🖖 Spock<br>
      ✌️ Scissors cuts 🧻 Paper and decapitates 🦎 Lizard<br>
      🦎 Lizard eats 🧻 Paper and poisons 🖖 Spock<br>
      🖖 Spock smashes ✌️ Scissors and vaporizes ✊ Rock
    </p>
    <button onclick="backToMenu()">Back</button>
  `;
};

