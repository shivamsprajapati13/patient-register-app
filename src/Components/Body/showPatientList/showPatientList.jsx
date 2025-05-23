import React from 'react';
import './showPatientList.css';  
function PatientList({ patients }) {
  if (!patients || patients.length === 0) return <p className="no-patients">No patients yet.</p>;

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

 
 const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();  // This formats it according to the user's locale
  };

  return (
    <div className="patient-list-container">
      <h2 className="patient-list-title">Patient List</h2>
      <ul className="patient-list">
        {patients.map((p) => (
          <li key={p.id} className="patient-item">
            <div className="patient-info">
              <h3 className="patient-name">{p.first_name} {p.last_name}</h3>
              <p className="patient-age">Age: {calculateAge(p.dob)}</p>
              <p className="patient-condition">Condition: {p.disease}</p>
              <p className="patient-time">Time: {formatDate(p.timestamp)}</p>  
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientList;
