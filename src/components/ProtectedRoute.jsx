import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, adminOnly, children }) => {
  if (!user && !localStorage.getItem('pas_token')) {
    return <Navigate to="/login" replace />;
  }

  const currentUser = user || JSON.parse(localStorage.getItem('pas_user') || 'null');
  if (adminOnly && currentUser?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
