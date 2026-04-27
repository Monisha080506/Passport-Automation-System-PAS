import { useState } from 'react';
import { submitApplication } from '../api/api';

const Apply = () => {
  const [form, setForm] = useState({
    fullName: '',
    dob: '',
    address: '',
    phone: '',
    email: '',
    idProofType: 'Passport',
    idProofNumber: '',
    nationality: '',
  });
  const [photo, setPhoto] = useState(null);
  const [idProof, setIdProof] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();

    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    if (photo) payload.append('photo', photo);
    if (idProof) payload.append('idProof', idProof);

    try {
      await submitApplication(payload);
      setMessage('Application submitted successfully. Check dashboard for status.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Submission failed.');
    }
  };

  return (
    <div className="page-card form-card">
      <div className="card-header">
        <h2>Passport Application</h2>
        <p>Submit your passport details and upload your documents securely.</p>
      </div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input name="fullName" value={form.fullName} onChange={handleChange} required />
        </label>
        <label>
          Date of Birth
          <input name="dob" type="date" value={form.dob} onChange={handleChange} required />
        </label>
        <label>
          Address
          <textarea name="address" value={form.address} onChange={handleChange} rows="3" required />
        </label>
        <label>
          Phone
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          ID Proof Type
          <select name="idProofType" value={form.idProofType} onChange={handleChange}>
            <option>Passport</option>
            <option>Driver License</option>
            <option>National ID</option>
          </select>
        </label>
        <label>
          ID Proof Number
          <input name="idProofNumber" value={form.idProofNumber} onChange={handleChange} required />
        </label>
        <label>
          Nationality
          <input name="nationality" value={form.nationality} onChange={handleChange} required />
        </label>
        <label>
          Passport Photo
          <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} required />
        </label>
        <label>
          ID Proof Document
          <input type="file" accept="image/*,.pdf" onChange={(e) => setIdProof(e.target.files[0])} required />
        </label>
        {message && <p className="form-success">{message}</p>}
        <button type="submit" className="button primary">Submit Application</button>
      </form>
      <p className="form-note">Your application will move to the approval queue after submission.</p>
    </div>
  );
};

export default Apply;
