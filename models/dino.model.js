import mongoose from 'mongoose';

const dinoSchema = new mongoose.Schema({
  name: String,
  type: String,
  vegan: Boolean,
});

const Dino = mongoose.model('Dino', dinoSchema);

export default Dino;
