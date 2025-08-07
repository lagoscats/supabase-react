// App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSessionContext } from '@supabase/auth-helpers-react';

import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import ProductPage from './pages/ProductPage';
import ManageProducts from './pages/ManageProducts';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import VendorProfile from './pages/VendorProfile';
import BecomeVendor from './pages/BecomeVendor';
import VendorDashboard from './pages/VendorDashboard';
import { CartProvider } from './context/CartContext';

const PrivateRoute = ({ children }) => {
  const { session } = useSessionContext();
  return session ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/dashboard/manage-products" element={<ManageProducts />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/vendor/:vendorId" element={<VendorProfile />} />
          <Route path="/become-vendor" element={<BecomeVendor />} />

          {/* ✅ Keep this route INSIDE the Routes block */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/vendor"
            element={
              <PrivateRoute>
                <VendorDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;