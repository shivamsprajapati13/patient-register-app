import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PatientForm from './Components/Body/register/registerPatient';
import SearchForm from './Components/Body/searchPatient/search';
import { initDb, addPatient, getAllPatients, searchPatient } from './model/connection';
import PatientList from './Components/Body/showPatientList/showPatientList';
import Navbar from './Components/Navbar/navbar';
import Loader from './Components/Loader/loader';

function App() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateKey, setUpdateKey] = useState(Date.now());  // To force re-render
  const patientsRef = useRef([]);

  const fetchPatients = useCallback(async () => {
    try {
      const data = await getAllPatients();

      // Deep clone to ensure React detects change
      const clonedData = JSON.parse(JSON.stringify(data));

      setPatients(clonedData);
      setFilteredPatients(clonedData);
      patientsRef.current = clonedData;

      // Update key to force remount PatientList component
      setUpdateKey(Date.now());

      console.log('Patient list updated', clonedData);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initDb();
      await fetchPatients();
      setLoading(false);
    };

    init();

   
  }, [fetchPatients]);


 const channel = new BroadcastChannel('patients-updates');
    channel.onmessage = async (event) => {
  if (event.data?.type === 'patient-added') {
    // alert("helo");
     console.log('↪ Broadcast received in another tab:');
    // Wait a bit before fetching to allow IndexedDB to sync
    await  fetchPatients();
    console.log("here.................");
  }
};

  const handleAddPatient = async (patient) => {
    await addPatient(patient);
    await fetchPatients();

    const channel = new BroadcastChannel('patients-updates');
    channel.postMessage({ type: 'patient-added' });
    channel.close();
    console.log('✅ Broadcast sent to other tabs.');
  };

  const handleSearch = async (term) => {
    if (!term) {
      setFilteredPatients(patients);
    } else {
      const results = await searchPatient(term);
      setFilteredPatients(results);
    }
  };

  return (
    <Router>
      <div style={{ padding: '2rem' }}>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              
              <PatientForm patientCount={patients.length} onAdd={handleAddPatient} />
                
            }
          />
          <Route
            path="/patients"
            element={
              <>
                <SearchForm onSearch={handleSearch} />
           
                {loading ? <Loader /> : <PatientList patients={filteredPatients} />}
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
