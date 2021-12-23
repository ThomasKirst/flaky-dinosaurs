import { MongoClient } from 'mongodb';

// Der Verbindungs-String, mit dem wir auf die DB connecten
const connectionString = 'mongodb://localhost:27017/';

const client = new MongoClient(connectionString);

export default client;
