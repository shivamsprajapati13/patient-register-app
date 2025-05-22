
import { PGlite } from '@electric-sql/pglite';

let db;
let dbReady = false;

export async function initDb() {
  if (!db) {
     db = new PGlite();
  }

  if (!dbReady) {
 await db.exec(`
  CREATE TABLE IF NOT EXISTS patients (
    id SERIAL PRIMARY KEY,
    name TEXT,
    age INTEGER,
    condition TEXT
  );
`);
    dbReady = true;
  }

  return db;
}

export async function addPatient({ name, age, condition }) {
  const dbInstance = await initDb();
  await dbInstance.query(
    'INSERT INTO patients (name, age, condition) VALUES ($1, $2, $3);',
    [name, age, condition]
  );
}

export async function getAllPatients() {
  const dbInstance = await initDb();
  const result = await dbInstance.query('SELECT * FROM patients');
  return result.rows;
}
