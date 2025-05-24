import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PatientForm from './Components/Body/register/registerPatient';
import SearchForm from './Components/Body/searchPatient/search';
import { initDb, addPatient, getAllPatients, searchPatient } from './model/connection';
import PatientList from './Components/Body/showPatientList/showPatientList';
import Navbar from './Components/Navbar/navbar';
import Loader from './components/Loader/Loader';

function App() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const patientsRef = useRef(patients); 

  const fetchPatients = useCallback(async () => {
    try {
      const data = await getAllPatients();
      setPatients(data);
      setFilteredPatients(data);
      patientsRef.current = data; 
      console.log('Patient list updated');
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

    const channel = new BroadcastChannel('patients-updates');

    channel.onmessage = async (event) => {
      if (event.data?.type === 'patient-added') {
        console.log('Received broadcast: patient-added');
        await fetchPatients(); // Update local state
        channel.postMessage({ type: 'patients-updated', patients: patientsRef.current });
      }
    };

    return () => {
      channel.close();
    };
  }, [fetchPatients]);

  const handleAddPatient = async (patient) => {
    await addPatient(patient); 
    await fetchPatients();     
    const channel = new BroadcastChannel('patients-updates');
    channel.postMessage({ type: 'patients-updated', patients: patientsRef.current });
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
              <>
                <PatientForm onAdd={handleAddPatient} />
                <h2>Patient List</h2>
                {loading ? <Loader /> : <PatientList patients={filteredPatients} />}
              </>
            }
          />
          <Route
            path="/patients"
            element={
              <>
                <SearchForm onSearch={handleSearch} />
                <h2>Patients List</h2>
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
