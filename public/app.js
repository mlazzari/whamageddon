document.addEventListener("DOMContentLoaded", function () {
  updateData();

  document.getElementById("addUserForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const userName = document.getElementById("userNameInput").value;
    addPlayer(userName);
  });
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
  const response = await fetch('/players');
  const data = await response.json();
  return data;
}

async function addPlayer(userName) {
  try {
    const response = await fetch('/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: userName }),
    });
    const newPlayer = await response.json();
    updateData();
    console.log(`User ${newPlayer.name} added successfully!`);
  } catch (error) {
    console.error(error);
  }
}
