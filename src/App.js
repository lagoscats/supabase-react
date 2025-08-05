import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSession } from '@supabase/auth-helpers-react';
import { Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Navbar from './components/Navbar'; // ✅ Import Navbar
import Register from './pages/Register';


const PrivateRoute = ({ children }) => {
  const session = useSession();
  return session ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* ✅ Add Navbar here so it shows on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
