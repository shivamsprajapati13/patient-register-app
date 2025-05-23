import React, { useState } from 'react';
import './registerPatient.css'; // External CSS for styling

function PatientForm({ onAdd, onSearch }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    contact_no: '',
    dob: '',
    disease: '',
    patientSearch: '',
  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    const timestamp = new Date().toISOString();

    // Add timestamp to formData
    const dataWithTimestamp = { ...formData, timestamp };
    onAdd(dataWithTimestamp);  
    setFormData({
      first_name: '',
      last_name: '',
      contact_no: '',
      dob: '',
      disease: '',
      patientSearch: '',

    });
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      patientSearch: value,
    }));
    onSearch(value); 
  };

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Patient Registration</h2>
      <div className="input-group">
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-group">
        <label>Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-group">
        <label>Contact No:</label>
        <input
          type="text"
          name="contact_no"
          value={formData.contact_no}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-group">
        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-group">
        <label>Disease:</label>
        <input
          type="text"
          name="disease"
          value={formData.disease}
          onChange={handleChange}
          required
        />
      </div>
      <button className="submit-btn" type="submit">Add Patient</button>

   
    </form>
  );
}

export default PatientForm;
