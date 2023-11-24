document.addEventListener("DOMContentLoaded", function () {
  updateData();
});

async function updateData() {
  try {
    const players = await fetchPlayers();
    updatePoints(players);
    updateRanking(players);
  } catch (error) {
    console.error(error);
  }
}

async function fetchPlayers() {
  const response = await fetch('/players'); // Assuming the backend is hosted on the same domain
  const data = await response.json();
  return data;
}

function updatePoints(players) {
  const totalPoints = players.reduce((acc, player) => acc + player.points, 0);
  document.getElementById("points").textContent = `Points: ${totalPoints}`;
}

function updateRanking(players) {
  const rankingList = players.map((player, index) => `${index + 1}. ${player.name} - ${player.points} points`);
  document.getElementById("ranking").innerHTML = `Ranking: <br>${rankingList.join("<br>")}`;
}
