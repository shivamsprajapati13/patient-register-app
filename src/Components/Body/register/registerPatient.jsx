import React, { useState } from "react";
import "./registerPatient.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function PatientForm({ onAdd, onSearch }) {
  const [formData, setFormData] = useState({
    first_name: '',
    email: '',
  gender:'',
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

 
  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    const timestamp = new Date().toISOString();
    const dataWithTimestamp = { ...formData, timestamp };

    onAdd(dataWithTimestamp);

    setFormData({
      first_name: '',
      email: '',
            gender: '', 
                  contact_no: '',
      dob: '',
      disease: '',
      patientSearch: '',
      timestamp: '',
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
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3 col-6" controlId="formFirstName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
          placeholder="Enter Full Name"
        />
      </Form.Group>

      <Form.Group className="mb-3 col-6" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          
          placeholder="Enter Email"
        />
      </Form.Group>

<Form.Group className="mb-3 col-6" controlId="formContactNo">
        <Form.Label>Contact No</Form.Label>
        <Form.Control
          type="text"
          name="contact_no"
          value={formData.contact_no}
          onChange={handleChange}
          required
          placeholder="Enter Contact Number"
        />
      </Form.Group>

      <Form.Group className="mb-3 col-6" controlId="formDOB">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3 col-6" controlId="formDoctorName">
        <Form.Label>Doctor Name</Form.Label>
        <Form.Control
          as="select"
          name="disease"
          value={formData.disease}
          onChange={handleChange}
          required
        >
          <option value="">Select Doctor</option>
          <option value="Dr. Smith">Dr. Smith</option>
          <option value="Dr. Johnson">Dr. Johnson</option>
          <option value="Dr. Brown">Dr. Brown</option>
          <option value="Dr. Williams">Dr. Williams</option>
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3 col-6" controlId="formGender">
        <Form.Label>Gender</Form.Label>
        <Form.Control
          as="select"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Patient
      </Button>
    </Form>
  );
}

export default PatientForm;
