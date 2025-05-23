import React, { useState, useEffect } from 'react';
import PatientForm from './Components/Body/register/registerPatient';
import SearchForm from './Components/Body/searchPatient/search';
import { initDb, addPatient, getAllPatients, searchPatient } from './model/connection';
import PatientList from './Components/Body/showPatientList/showPatientList'; 
import Navbar from './Components/Navbar/navbar'


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
const handleAddPatient = async (patient) => {
  await addPatient(patient);
  const updatedPatients = await getAllPatients();
  setPatients(updatedPatients);
  setFilteredPatients(updatedPatients);
};

const handleSearch = async (searchTerm) => {
  if (!searchTerm) {
    setFilteredPatients(patients);  
  } else {
    const results = await searchPatient(searchTerm);
    setFilteredPatients(results);  
  }
};

  return (
    <div style={{ padding: '2rem' }}>
          <Navbar />
      <PatientForm onAdd={handleAddPatient} />
      <SearchForm onSearch={handleSearch} />

      <h2>Patients List</h2>
      {loading ? <p>Loading...</p> : <PatientList patients={filteredPatients} />}

    
    </div>
  );
}



export default App;
