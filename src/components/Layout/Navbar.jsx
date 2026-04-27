import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  return (
    <header className="nav-bar">
      <div className="nav-brand">
        <span className="brand-text">Passport Automation System</span>
      </div>
      <nav className="nav-menu">
        <Link to="/">Home</Link>
        <Link to="/apply">Apply</Link>
        <Link to="/track">Track</Link>
        {user?.role === 'admin' && <Link to="/admin">Dashboard</Link>}
        {user ? <button className="nav-action" onClick={onLogout}>Logout</button> : <Link to="/login">Login</Link>}
      </nav>
    </header>
  );
};

export default Navbar;
