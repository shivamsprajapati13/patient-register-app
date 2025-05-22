// Components/Body/registerPatient.jsx
import React, { useState } from 'react';

function PatientForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    condition: '',
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
    const { name, age, condition } = formData;

    onAdd({ name, age: Number(age), condition });

    setFormData({ name: '', age: '', condition: '' });
  };

  return (
     
    <form onSubmit={handleSubmit}>
      <div >
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Age: </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Condition: </label>
        <input
          type="text"
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Add Patient</button>
    </form>
  );
}

export default PatientForm;
