
import React from 'react';

function PatientList({ patients }) {
  if (!patients.length) return <p>No patients yet.</p>;

  return (
    <ul>
      {patients.map((p) => (
        <li key={p.id}>
          {p.name} – Age: {p.age} – Condition: {p.condition}
        </li>
      ))}
    </ul>
  );
}

export default PatientList;
