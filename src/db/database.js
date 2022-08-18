// MongoDB Connection
import MongoDB from 'mongodb';
import { config } from '../config.js';

let db;
export async function connectDB() {
  const DATABASE_URL = config.mongo.host;
  return MongoDB.MongoClient.connect(DATABASE_URL)
    .then((client) => {
      db = client.db(config.mongo.db);
    });
};

export function getCollections(name) {
  return db.listCollections(name, { listCollections: 1, nameOnly: true });
};

export async function removeCollection(name) {
  return db.dropCollection(name);
}
