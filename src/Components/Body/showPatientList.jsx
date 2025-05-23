import React from 'react';

function PatientList({ patients }) {
  if (!patients || patients.length === 0) return <p>No patients yet.</p>;


  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
      age--; 
    }

    return age;
  };



  return (
    <ul>
      {patients.map((p) => (
        <li key={p.id}>
          {p.first_name} – Age: {calculateAge(p.dob)} – Condition: {p.disease}
        </li>
      ))}
    </ul>
  );
}

export default PatientList;
