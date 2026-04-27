import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api';

const Register = ({ onRegister }) => {
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await registerUser(values);
      const { token, user } = response.data;
      localStorage.setItem('pas_token', token);
      localStorage.setItem('pas_user', JSON.stringify(user));
      onRegister(user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="page-card centered-card">
      <div className="card-header">
        <h2>Create your account</h2>
        <p>Register now to submit your passport application securely.</p>
      </div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input name="name" value={values.name} onChange={handleChange} placeholder="Your full name" required />
        </label>
        <label>
          Email
          <input name="email" value={values.email} onChange={handleChange} type="email" placeholder="you@domain.com" required />
        </label>
        <label>
          Password
          <input name="password" value={values.password} onChange={handleChange} type="password" placeholder="Strong password" required />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="button primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
