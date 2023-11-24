const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://whamageddon:ixGl5N8pnqOt2xSZ@whamageddon.javuuc0.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

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
// Update the POST endpoint for adding a new player
app.post('/players', async (req, res) => {
  try {
    const { name } = req.body;
    const existingPlayer = await Player.findOne({ name });
    
    if (existingPlayer) {
      return res.status(400).json({ error: 'User with that name already exists' });
    }

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
