// Navbar.js
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>My Store</h1>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        <Link to="/register" className="hover:underline">Register</Link>
        <Link to="/login" className="nav-link">Login</Link>
      </div>
    </nav>
  );
}
