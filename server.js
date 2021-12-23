import express from 'express';
import mongoose from 'mongoose';
import Dino from './models/dino.model.js';

// Express-Server erstellen
const server = express();

const connectionString = 'mongodb://localhost:27017/flaky-dinosaurs';
mongoose.connect(connectionString);

// Middleware zum JSON parsen (req.body ausstatten)
server.use(express.json());

// Alle Dinos holen
server.get('/dinos', async (req, res) => {
  const dinos = await Dino.find();
  res.json(dinos); //JSON.stringify JSON.parse(Plain JSON text aus dem Datenpaket)
});

server.get('/dinos/:dinoId', async (req, res) => {
  const dinoId = req.params.dinoId; // 61c341db47e84456ca7d44bb
  const foundDino = await Dino.findById(dinoId);
  res.json(foundDino);
});

// Erstelle einen neuen Dino
server.post('/dinos', async (req, res) => {
  // Neues Dino-Objekt aus den Request-Daten erstellen
  const dinosaur = new Dino({
    name: req.body.name, // Monica
    type: req.body.type, // null
    vegan: req.body.vegan, // null
  });

  try {
    const result = await dinosaur.save();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

server.listen(4000, () => {
  console.log('Dino-Server is up and running');
});
