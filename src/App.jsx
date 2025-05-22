// App.jsx
import React, { useEffect, useState } from 'react';
import PatientForm from './Components/Body/registerPatient';
import PatientList from './Components/Body/showPatientList';
import { initDb, addPatient, getAllPatients } from './model/connection';

function App() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    (async () => {
      await initDb();
      const rows = await getAllPatients();
      setPatients(rows);
    })();
  }, []);

  const handleAddPatient = async (patient) => {
    await addPatient(patient);
    const rows = await getAllPatients();
    setPatients(rows);
  };
const [loading, setLoading] = useState(true);

useEffect(() => {
  (async () => {
    await initDb();
    const rows = await getAllPatients();
    setPatients(rows);
    setLoading(false);
  })();
}, []);


  return (
    <div style={{ padding: '2rem' }}>
      <h1>Patient Registration</h1>
      <PatientForm onAdd={handleAddPatient} />
      <h2>Patients List</h2>
      <PatientList patients={patients} />
    </div>
  );
}

export default App;
