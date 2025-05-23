
import { PGlite } from '@electric-sql/pglite';

let db;
let dbReady = false;

export async function initDb() {
  if (!db) {
     db = new PGlite('idb://my-pgdata')
  }

  if (!dbReady) {
  await db.exec(`
        CREATE TABLE IF NOT EXISTS patients (
         id SERIAL PRIMARY KEY,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
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

export async function addPatient({ first_name, last_name, contact_no, dob, disease }) {
  try {
    const dbInstance = await initDb();

    await dbInstance.query(
      'INSERT INTO patients (first_name, last_name, contact_no, dob, disease) VALUES ($1, $2, $3, $4, $5);',
      [first_name, last_name, contact_no, dob, disease]
    );
    console.log('Patient added successfully');
  } catch (error) {
    console.error('Error adding patient:', error);
  }
}

export async function getAllPatients() {
  const dbInstance = await initDb();
  const result = await dbInstance.query('SELECT * FROM patients');
  return result.rows;
}

export async function searchPatient(patientSearch) {
  try {
 
    const searchQuery = `%${patientSearch}%`;  

    console.log("Query: SELECT * FROM PATIENTS WHERE disease LIKE ?");

    console.log("Parameter:", searchQuery);
    
    const result = await db.query(
        'SELECT * FROM PATIENTS WHERE first_name LIKE $1',
        [`%${searchQuery}%`]
      );
      

    console.log('Query Result:', result);

    return result.rows; 
  } catch (error) {
    console.error('Error searching for patient:', error);
    return [];  
  }
}

