import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Apply from './pages/Apply';
import Track from './pages/Track';
import AdminDashboard from './pages/AdminDashboard';
import { getProfile } from './api/api';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('pas_token');
    if (token) {
      getProfile()
        .then((response) => setUser(response.data.user))
        .catch(() => {
          localStorage.removeItem('pas_token');
          localStorage.removeItem('pas_user');
          setUser(null);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('pas_token');
    localStorage.removeItem('pas_user');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="app-shell">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/register" element={<Register onRegister={setUser} />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute user={user}><Dashboard user={user} /></ProtectedRoute>}
          />
          <Route
            path="/apply"
            element={<ProtectedRoute user={user}><Apply /></ProtectedRoute>}
          />
          <Route
            path="/track"
            element={<ProtectedRoute user={user}><Track /></ProtectedRoute>}
          />
          <Route
            path="/admin"
            element={<ProtectedRoute user={user} adminOnly><AdminDashboard /></ProtectedRoute>}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
