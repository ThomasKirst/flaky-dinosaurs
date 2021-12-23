import express from 'express';

// MongoDB Datenbank-Treiber (die Schnittstelle zwischen unserem Server und der DB)
import { ObjectId } from 'mongodb';

import databaseClient from './lib/db.client.js';

// Express-Server erstellen
const server = express();

// Middleware zum JSON parsen (req.body ausstatten)
server.use(express.json());

server.get('/dinos/:dinoId', async (req, res) => {
  const dinoId = req.params.dinoId;

  await databaseClient.connect();
  const db = databaseClient.db('flaky-dinosaurs');
  const collection = db.collection('dinosaurs');

  const foundDino = await collection.findOne({ _id: ObjectId(dinoId) });
  res.json(foundDino);
});

server.get('/dinos', async (req, res) => {
  await databaseClient.connect();
  const db = databaseClient.db('flaky-dinosaurs');
  const collection = db.collection('dinosaurs');

  const dinos = await collection.find().toArray();
  res.json(dinos); //JSON.stringify JSON.parse(Plain JSON text aus dem Datenpaket)
});

// Erstelle einen neuen Dino
server.post('/dinos', async (req, res) => {
  // Neues Dino-Objekt aus den Request-Daten erstellen
  const dinosaur = {
    name: req.body.name, // Monica
    type: req.body.type, // null
    vegan: req.body.vegan, // null
  };

  // Verbindung herstellen (asynchron)
  await databaseClient.connect();
  // Datenbank auswählen
  const db = databaseClient.db('flaky-dinosaurs');

  // Sammlung aller Dokumente (Dinos)
  const collection = db.collection('dinosaurs');

  // Füge ein neues Dokument in die Sammlung ein und warte auf das Ergebnis
  const result = await collection.insertOne(dinosaur);

  // Ergebnis auswerten und die erzeugte Id an den databaseClient / Nutzer zurücksenden
  res.json({
    message:
      'You successfully inserted a new dino with the id: ' + result.insertedId,
  });
});

server.listen(4000, () => {
  console.log('Dino-Server is up and running');
});
