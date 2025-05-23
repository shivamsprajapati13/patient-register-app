import React, { useEffect, useState } from 'react';
import PatientForm from './Components/Body/registerPatient';
import PatientList from './Components/Body/showPatientList';
import { initDb, addPatient, getAllPatients, searchPatient } from './model/connection';

function App() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      await initDb();
      const patientRows = await getAllPatients();  
      setPatients(patientRows);
      setFilteredPatients(patientRows);  
      setLoading(false);
    };
    fetchData();
  }, []);

  // Handle adding a new patient
  const handleAddPatient = async (patient) => {
    await addPatient(patient);
    const updatedPatients = await getAllPatients();
    setPatients(updatedPatients);
    setFilteredPatients(updatedPatients);  
  };

  // Handle searching for a patient
  const handleSearch = async (searchTerm) => {
    const results = await searchPatient(searchTerm);  
    setFilteredPatients(results);  
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Patient Registration</h1>
      <PatientForm onAdd={handleAddPatient} onSearch={handleSearch} />

      <div style={{ marginTop: '2rem' }}>
        <h2>All Patients</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <PatientList patients={patients} />  
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Filtered Patients (Search Results)</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <PatientList patients={filteredPatients} />  
        )}
      </div>
    </div>
  );
}

export default App;
