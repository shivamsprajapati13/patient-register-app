// App.jsx
import React from 'react';
import PatientForm from './Components/Body/registerPatient';

function App() {
  return (
    <div >
      <h1>Patient Registration</h1>
      <PatientForm onAdd={(data) => console.log('Submitted:', data)} />
    </div>
  );
}

export default App;
