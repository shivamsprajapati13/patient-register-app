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
    timestamp: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Add timestamp to formData before sending it to parent
    const timestamp = new Date().toISOString();
    const dataWithTimestamp = { ...formData, timestamp };

    // Call onAdd passed from parent
    onAdd(dataWithTimestamp);

    // Reset form after submission
    setFormData({
      first_name: '',
      last_name: '',
      contact_no: '',
      dob: '',
      disease: '',
      patientSearch: '',
      timestamp: '',
    });
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      patientSearch: value,
    }));
    onSearch(value); // Perform search in parent component
  };

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Patient Registration</h2>

      {/* First Name */}
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

      {/* Last Name */}
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

      {/* Contact Number */}
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

      {/* Date of Birth */}
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

      {/* Disease */}
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

      {/* Submit Button */}
      <button className="submit-btn" type="submit">Add Patient</button>
    </form>
  );
}

export default PatientForm;
