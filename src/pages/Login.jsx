import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await loginUser(credentials);
      const { token, user } = response.data;
      localStorage.setItem('pas_token', token);
      localStorage.setItem('pas_user', JSON.stringify(user));
      onLogin(user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="page-card centered-card">
      <div className="card-header">
        <h2>Login to Passport System</h2>
        <p>Enter your credentials to continue.</p>
      </div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" value={credentials.email} onChange={handleChange} type="email" placeholder="you@domain.com" required />
        </label>
        <label>
          Password
          <input name="password" value={credentials.password} onChange={handleChange} type="password" placeholder="Enter password" required />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="button primary">Login</button>
      </form>
      <p className="form-note">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
};

export default Login;
