import Dino from '../models/dino.model.js';

const getDinos = async (req, res) => {
  const dinos = await Dino.find();
  res.json(dinos); //JSON.stringify JSON.parse(Plain JSON text aus dem Datenpaket)
};

const getDino = async (req, res) => {
  const dinoId = req.params.dinoId;
  const foundDino = await Dino.findById(dinoId);
  res.json(foundDino);
};

const postDino = async (req, res) => {
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
};

const updateDino = async (req, res) => {
  const dinoId = req.params.dinoId;
  const dino = req.body;

  const result = await Dino.findByIdAndUpdate(dinoId, dino, {
    returnDocument: 'after', // new: true // deprecated
  });
  res.json(result);
};

const deleteDino = async (req, res) => {
  const dinoId = req.params.dinoId;

  try {
    const result = await Dino.findByIdAndDelete(dinoId);

    if (result) {
      res.json({ success: true, message: 'Successfully deleted Dino.' });
    } else {
      res.json({
        success: false,
        message: 'Could not delete Dino from database.',
      });
    }
  } catch (error) {
    res.json({ status: 'Something else happened.' });
  }
};

export { deleteDino, getDinos, getDino, postDino, updateDino };
