// connection.js
import { PGlite } from '@electric-sql/pglite';

let db = null;
let dbReady = false;

export async function initDb() {
  if (!db) {
    db = new PGlite('idb://my-pgdata');
  }

  if (!dbReady) {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        email TEXT NOT NULL,
        gender TEXT NOT NULL,
        contact_no TEXT,
        dob TEXT,
        disease TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    dbReady = true;
  }

  return db;
}

export async function addPatient(patient) {
  const db = await initDb();
  const { first_name, email, gender, contact_no, dob, disease } = patient;

  await db.query(
    'INSERT INTO patients (first_name, email, gender, contact_no, dob, disease) VALUES ($1, $2, $3, $4, $5, $6);',
    [first_name, email, gender, contact_no, dob, disease]
  );

//  const channel = new BroadcastChannel('patients-updates');
//   channel.postMessage({ type: 'patient-added' });
//   channel.close();  
  
}

export async function UpdatePatientList(patient){
 await addPatient(patient);
 console.log("Here in updating");
 alert("hello");
}


export async function getAllPatients() {
  const db = await initDb();
  const result = await db.query('SELECT * FROM patients ORDER BY id DESC');
  return result.rows;
}

export async function searchPatient(term) {
  const db = await initDb();
  if (!term) return [];

  const searchTerm = `%${term}%`;
  const result = await db.query(
    `SELECT * FROM patients WHERE first_name LIKE $1 OR email LIKE $1 OR disease LIKE $1`,
    [searchTerm]
  );
  return result.rows;
}
