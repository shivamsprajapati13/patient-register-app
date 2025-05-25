import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PatientForm from './Components/Body/register/registerPatient';
import SearchForm from './Components/Body/searchPatient/search';
import { initDb, addPatient, getAllPatients, searchPatient,deletePatient } from './model/connection';
import PatientList from './Components/Body/showPatientList/showPatientList';
import Navbar from './Components/Navbar/navbar';
import Loader from './Components/Loader/loader';

function App() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateKey, setUpdateKey] = useState(Date.now());
  const patientsRef = useRef([]);
  const TAB_ID = useRef(Math.random().toString(36).substring(2)).current;

const fetchPatients = useCallback(async (newPatient = null) => {
  try {
    let updatedPatients;

    if (newPatient) {
      updatedPatients = [...patientsRef.current, newPatient];
    } else {
      const data = await getAllPatients();
      updatedPatients = JSON.parse(JSON.stringify(data));
    }

    setPatients(updatedPatients);
    setFilteredPatients(updatedPatients);
    patientsRef.current = updatedPatients;

    setUpdateKey(Date.now()); // Force UI update
    console.log('🔁 Patient list updated', updatedPatients);
  } catch (error) {
    console.error('❌ Error fetching patients:', error);
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

  // Listen to broadcast messages from other tabs
useEffect(() => {
  const channel = new BroadcastChannel('patients-updates');
  channel.onmessage = async (event) => {
    const { type, sender, patient, id } = event.data || {};
    if (sender === TAB_ID) return; // Skip self

    if (type === 'patient-added') {
      await fetchPatients(patient); // Already works ✅
    }

    if (type === 'patient-deleted') {
      console.log('📨 Deletion received from another tab.');
      const updatedList = patientsRef.current.filter(p => p.id !== id);
      patientsRef.current = updatedList;
      setPatients(updatedList);
      setFilteredPatients(updatedList);
      setUpdateKey(Date.now());
    }
  };

  return () => channel.close();
}, [fetchPatients, TAB_ID]);



const handleDeletePatient = async (patientId) => {
  await deletePatient(patientId);

  // Update local tab immediately
  const updatedList = patientsRef.current.filter(p => p.id !== patientId);
  patientsRef.current = updatedList;
  setPatients(updatedList);
  setFilteredPatients(updatedList);
  setUpdateKey(Date.now());

  // Notify other tabs
  const channel = new BroadcastChannel('patients-updates');
  channel.postMessage({ type: 'patient-deleted', sender: TAB_ID, id: patientId });
  channel.close();
};


const handleAddPatient = async (patient) => {
  await addPatient(patient);
  await fetchPatients(patient); // Pass patient directly

  const channel = new BroadcastChannel('patients-updates');
  channel.postMessage({ type: 'patient-added', sender: TAB_ID, patient }); // broadcast the patient too
  channel.close();
  console.log('📤 Broadcast sent to other tabs.');
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
                {loading ? <Loader /> : <PatientList
  key={updateKey}
  patients={filteredPatients}

  onDelete={handleDeletePatient}
/>}
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
