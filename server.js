const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas (replace 'your-mongodb-uri' with your actual MongoDB Atlas connection string)
mongoose.connect('your-mongodb-uri', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a simple Player model
const Player = mongoose.model('Player', {
  name: String,
  points: Number,
});

// Get all players
app.get('/players', async (req, res) => {
  try {
    const players = await Player.find().sort({ points: -1 });
    res.json(players);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Add a new player
app.post('/players', async (req, res) => {
  try {
    const { name } = req.body;
    const player = new Player({ name, points: 0 });
    await player.save();
    res.status(201).json(player);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
