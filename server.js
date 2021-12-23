import express from 'express';
import mongoose from 'mongoose';

import {
  deleteDino,
  getDinos,
  getDino,
  postDino,
  updateDino,
} from './controllers/dinos.controller.js';

const server = express();

const connectionString = 'mongodb+srv://localhost:27017/flaky-dinosaurs';
mongoose.connect(connectionString);

server.use(express.json());

server.get('/dinos', getDinos);
server.get('/dinos/:dinoId', getDino);
server.post('/dinos', postDino);
server.put('/dinos/:dinoId', updateDino);
server.delete('/dinos/:dinoId', deleteDino);

server.put('/dinos/:dinoId', async (req, res) => {
  const dinoId = req.params.dinoId;
  const dino = req.body;

  const updatedDino = await Dino.findByIdAndUpdate(dinoId, dino, {
    returnDocument: 'after',
  });
  res.json(updatedDino);
});

server.delete('/dinos/:dinoId', async (req, res) => {
  const dinoId = req.params.dinoId;
  try {
    const result = await Dino.findByIdAndDelete(dinoId);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: 'This dino could not be found!' });
    }
  } catch (error) {
    res.json(error);
  }
});

server.listen(4000, () => {
  console.log('Dino-Server is up and running');
});
