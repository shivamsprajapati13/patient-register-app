import React, { useState } from 'react';

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
    e.preventDefault();
    onAdd(formData);  
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
    <form onSubmit={handleSubmit}>

      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Contact No:</label>
        <input
          type="text"
          name="contact_no"
          value={formData.contact_no}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Disease:</label>
        <input
          type="text"
          name="disease"
          value={formData.disease}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Patient</button>

 
      <div>
        <label>Search by Disease:</label>
        <input
          type="text"
          name="patientSearch"
          value={formData.patientSearch}
          onChange={handleSearchChange} 
        />
      </div>
    </form>
  );
}

export default PatientForm;
