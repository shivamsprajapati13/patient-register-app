import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './showPatientList.css';

function PatientList({ patients, onEdit, onDelete }) {
  if (!patients || patients.length === 0) return <p className="no-patients">No patients yet.</p>;

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <div className="patient-list-container">
      <p className="patient-count">Total Patients: {patients.length}</p>

      <Table striped bordered hover responsive >
        <thead style={{ position: 'sticky', top: -1 }}>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Doctor</th>
            <th>Contact No</th>
            <th>Registration Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p, index) => (
            <tr key={p.id}>
              <td>{index + 1}</td>
              <td>{p.first_name}</td>
              <td>{calculateAge(p.dob)}</td>
              <td>{p.email}</td>
              <td>{p.gender}</td>
              <td>{p.disease}</td>
              <td>{p.contact_no}</td>
              <td>{formatDate(p.timestamp)}</td>
              <td>
             <Button
  variant="outline-danger"
  size="sm"
  onClick={() => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${p.first_name}?`);
    if (confirmDelete) {
      onDelete(p.id);
    }
  }}
>
  Delete
</Button>

              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PatientList;
